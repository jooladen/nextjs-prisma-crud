import { NextRequest, NextResponse } from 'next/server';
import { postService } from '@/services/post.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/posts/[id]
 * 특정 게시글 조회 (작성자, 카테고리, 댓글, 태그 포함)
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid post ID format',
        },
        { status: 400 }
      );
    }

    const post = await postService.findById(id);

    if (!post) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: post,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch post',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/prisma/posts/[id]
 * 게시글 수정
 */
export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid post ID format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const post = await postService.update(id, body);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: post,
      message: 'Post updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update post',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/prisma/posts/[id]
 * 게시글 삭제 (Cascade로 관련 Comment, PostTag, PostMetadata도 삭제됨)
 */
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid post ID format',
        },
        { status: 400 }
      );
    }

    await postService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to delete post',
      },
      { status: 500 }
    );
  }
}
