import { NextRequest, NextResponse } from 'next/server';
import { postService } from '@/services/post.service';
import { ApiResponse, PaginatedResponse } from '@/types/api-responses';

// GET: 게시글 목록 조회 (필터링, 페이지네이션)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published');
    const authorId = searchParams.get('authorId');
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const filter: any = {};

    if (published !== null) {
      filter.published = published === 'true';
    }

    if (authorId) {
      filter.authorId = parseInt(authorId);
    }

    if (categoryId) {
      filter.categoryId = parseInt(categoryId);
    }

    if (search) {
      filter.search = search;
    }

    const result = await postService.findAll(filter, page, limit);

    return NextResponse.json<PaginatedResponse<any>>({
      success: true,
      data: result.posts,
      pagination: result.pagination,
      message: '게시글 목록 조회 성공',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '게시글 조회 실패',
      },
      { status: 500 }
    );
  }
}

// POST: 게시글 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const post = await postService.create({
      title: body.title,
      content: body.content,
      published: body.published || false,
      authorId: body.authorId,
      categoryId: body.categoryId,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: post,
        message: '게시글 생성 성공',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || '게시글 생성 실패',
      },
      { status: 500 }
    );
  }
}
