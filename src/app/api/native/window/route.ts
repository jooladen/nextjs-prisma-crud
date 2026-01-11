import { NextResponse } from 'next/server';
import { nativeQueryService } from '@/services/native-query.service';
import { ApiResponse } from '@/types/api-responses';

// GET: Window 함수 예제
export async function GET() {
  try {
    const rankings = await nativeQueryService.getPostRankings();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: rankings,
      message: 'Window 함수 쿼리 실행 성공',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Window 함수 쿼리 실행 실패',
      },
      { status: 500 }
    );
  }
}
