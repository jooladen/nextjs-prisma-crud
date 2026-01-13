import { NextRequest, NextResponse } from 'next/server';
import { tagService } from '@/services/tag.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/tags
 * 모든 태그 조회 (사용 횟수 포함)
 */
export async function GET() {
  try {
    const tags = await tagService.findAll();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: tags,
      message: 'Tags retrieved successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch tags',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/prisma/tags
 * 새 태그 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Tag name is required',
        },
        { status: 400 }
      );
    }

    const tag = await tagService.create(body);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: tag,
        message: 'Tag created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to create tag',
      },
      { status: 500 }
    );
  }
}
