import { NextRequest, NextResponse } from 'next/server';
import { categoryService } from '@/services/category.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/categories
 * 모든 카테고리 조회 (게시글 개수 포함)
 */
export async function GET() {
  try {
    const categories = await categoryService.findAll();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/prisma/categories
 * 새 카테고리 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Category name is required',
        },
        { status: 400 }
      );
    }

    const category = await categoryService.create(body);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: category,
        message: 'Category created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to create category',
      },
      { status: 500 }
    );
  }
}
