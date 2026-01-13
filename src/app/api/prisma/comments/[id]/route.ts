import { NextRequest, NextResponse } from 'next/server';
import { commentService } from '@/services/comment.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/comments/[id]
 * 특정 댓글 조회 (대댓글 포함)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid comment ID format',
        },
        { status: 400 }
      );
    }

    const comment = await commentService.findById(id);

    if (!comment) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Comment not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: comment,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch comment',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/prisma/comments/[id]
 * 댓글 내용 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid comment ID format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.content) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'content is required',
        },
        { status: 400 }
      );
    }

    const comment = await commentService.update(id, body.content);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: comment,
      message: 'Comment updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update comment',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/prisma/comments/[id]
 * 댓글 삭제 (Cascade로 모든 대댓글도 삭제됨)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid comment ID format',
        },
        { status: 400 }
      );
    }

    await commentService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to delete comment',
      },
      { status: 500 }
    );
  }
}
