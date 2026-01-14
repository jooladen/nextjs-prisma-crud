import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import { ApiResponse } from '@/types/api-responses';

/**
 * GET /api/prisma/users/[id]
 * 특정 사용자 조회 (게시글 및 댓글 개수 포함)
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);

    // ID 유효성 검사
    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid user ID format',
        },
        { status: 400 }
      );
    }

    const user = await userService.findById(id);

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch user',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/prisma/users/[id]
 * 사용자 정보 수정
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
          error: 'Invalid user ID format',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const user = await userService.update(id, body);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update user',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/prisma/users/[id]
 * 사용자 삭제 (Cascade로 관련 Post, Comment도 삭제됨)
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
          error: 'Invalid user ID format',
        },
        { status: 400 }
      );
    }

    await userService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to delete user',
      },
      { status: 500 }
    );
  }
}
