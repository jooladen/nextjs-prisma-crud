import { NextResponse } from 'next/server';
import { nativeQueryService } from '@/services/native-query.service';
import { ApiResponse } from '@/types/api-responses';

// GET: JOIN 쿼리 예제
export async function GET() {
  try {
    const posts = await nativeQueryService.getPostsWithDetails();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: posts,
      message: 'JOIN 쿼리 실행 성공',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'JOIN 쿼리 실행 실패',
      },
      { status: 500 }
    );
  }
}
