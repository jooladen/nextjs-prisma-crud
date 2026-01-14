import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/services/comment.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/comments?postId=1
 * 댓글 조회
 * - postId가 있으면: 특정 게시글의 댓글 조회 (대댓글 포함)
 * - postId가 없으면: 모든 댓글 조회
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');

    // postId가 없으면 모든 댓글 반환
    if (!postId) {
      const comments = await commentService.findAll();
      return NextResponse.json<ApiResponse>({
        success: true,
        data: comments,
        message: 'All comments retrieved successfully',
      });
    }

    // postId가 있으면 해당 게시글의 댓글만 반환
    const postIdNum = parseInt(postId);

    if (isNaN(postIdNum)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid postId format',
        },
        { status: 400 }
      );
    }

    const comments = await commentService.findByPostId(postIdNum);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: comments,
      message: 'Comments retrieved successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch comments',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/prisma/comments
 * 새 댓글 또는 대댓글 작성
 *
 * Request body:
 * {
 *   content: string,
 *   postId: number,
 *   authorId: number,
 *   parentId?: number  // 대댓글인 경우
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.content || !body.postId || !body.authorId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'content, postId, and authorId are required',
        },
        { status: 400 }
      );
    }

    const comment = await commentService.create(body);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: comment,
        message: 'Comment created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to create comment',
      },
      { status: 500 }
    );
  }
}
