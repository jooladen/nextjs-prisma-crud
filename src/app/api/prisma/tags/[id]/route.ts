import { NextRequest, NextResponse } from 'next/server';
import { tagService } from '@/services/tag.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/tags/[id]
 * 특정 태그 조회 (연결된 게시글 목록 포함)
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
          error: 'Invalid tag ID format',
        },
        { status: 400 }
      );
    }

    const tag = await tagService.findById(id);

    if (!tag) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Tag not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: tag,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch tag',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/prisma/tags/[id]
 * 태그 이름 수정
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
          error: 'Invalid tag ID format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Tag name is required',
        },
        { status: 400 }
      );
    }

    const tag = await tagService.update(id, body.name);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: tag,
      message: 'Tag updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update tag',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/prisma/tags/[id]
 * 태그 삭제 (PostTag 레코드는 삭제되지만 Post는 유지됨)
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
          error: 'Invalid tag ID format',
        },
        { status: 400 }
      );
    }

    await tagService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Tag deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to delete tag',
      },
      { status: 500 }
    );
  }
}
