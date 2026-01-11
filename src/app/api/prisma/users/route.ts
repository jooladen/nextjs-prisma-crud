import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import { ApiResponse } from '@/types/api-responses';

// GET: 전체 사용자 조회
export async function GET() {
  try {
    const users = await userService.findAll();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: users,
      message: '사용자 목록 조회 성공',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '사용자 조회 실패',
      },
      { status: 500 }
    );
  }
}

// POST: 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await userService.create({
      email: body.email,
      name: body.name,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: user,
        message: '사용자 생성 성공',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '사용자 생성 실패',
      },
      { status: 500 }
    );
  }
}
