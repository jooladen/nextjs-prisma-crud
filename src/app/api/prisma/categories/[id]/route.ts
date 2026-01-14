import { NextRequest, NextResponse } from 'next/server';
import { categoryService } from '@/services/category.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/categories/[id]
 * 특정 카테고리 조회 (게시글 목록 포함)
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
          error: 'Invalid category ID format',
        },
        { status: 400 }
      );
    }

    const category = await categoryService.findById(id);

    if (!category) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: category,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch category',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/prisma/categories/[id]
 * 카테고리 정보 수정
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
          error: 'Invalid category ID format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const category = await categoryService.update(id, body);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: category,
      message: 'Category updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update category',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/prisma/categories/[id]
 * 카테고리 삭제 (Cascade로 관련 Post도 삭제됨)
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
          error: 'Invalid category ID format',
        },
        { status: 400 }
      );
    }

    await categoryService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to delete category',
      },
      { status: 500 }
    );
  }
}
