'use client';

import Link from 'next/link';

export default function ApiPatternsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Next.js API 라우팅 패턴 가이드
          </h1>
          <p className="text-xl text-gray-600">
            Next.js App Router의 API 라우팅 관행과 RESTful API 설계 패턴을 배워보세요.
          </p>
        </div>

        {/* Question Answer */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            ❓ GET, POST 이렇게 하는 게 일반적인 관행인가요?
          </h2>
          <div className="space-y-3 text-lg">
            <p className="font-bold text-yellow-300">✅ 네! 완전히 맞습니다!</p>
            <p>
              <code className="bg-green-900 px-2 py-1 rounded">route.ts</code> 파일에서
              <code className="bg-green-900 px-2 py-1 rounded mx-1">export async function GET()</code>,
              <code className="bg-green-900 px-2 py-1 rounded">POST()</code> 형태로 작성하는 것은
              <strong> Next.js 13+ App Router의 표준 방식</strong>입니다.
            </p>
            <p>
              이것은 실무에서도 널리 사용되는 <strong>권장 패턴</strong>이며,
              Next.js 공식 문서에서도 이 방법을 소개하고 있습니다.
            </p>
          </div>
        </section>

        {/* App Router Basics */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Next.js App Router 기본 개념</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">route.ts 파일이란?</h3>
              <p className="text-gray-600 mb-4">
                <code className="bg-gray-100 px-2 py-1 rounded">route.ts</code>는 Next.js App Router에서
                API 엔드포인트를 정의하는 특수 파일입니다. 폴더 구조가 곧 URL 경로가 됩니다.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
                  <p className="font-bold text-gray-700 mb-2">파일 위치:</p>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                    <code>{`src/app/api/users/route.ts`}</code>
                  </pre>
                </div>
                <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
                  <p className="font-bold text-gray-700 mb-2">URL 경로:</p>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                    <code>{`/api/users`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">Named Exports가 표준인 이유</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2">✅ 장점</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>명확함:</strong> 함수 이름이 곧 HTTP 메서드</li>
                    <li><strong>타입 안전:</strong> TypeScript 완벽 지원</li>
                    <li><strong>자동 완성:</strong> IDE에서 자동 완성 제공</li>
                    <li><strong>표준화:</strong> Next.js 공식 권장 방식</li>
                    <li><strong>유지보수:</strong> 코드 가독성 향상</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-2">📚 지원되는 HTTP 메서드</h4>
                  <ul className="list-none space-y-1 text-sm text-gray-700">
                    <li><code className="bg-gray-100 px-2 py-1 rounded">GET</code> - 조회</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">POST</code> - 생성</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">PUT</code> - 전체 수정</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">PATCH</code> - 부분 수정</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">DELETE</code> - 삭제</li>
                    <li><code className="bg-gray-100 px-2 py-1 rounded">OPTIONS</code> - CORS 등</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">App Router vs Pages Router</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">App Router (최신) ✅</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Pages Router (구버전)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-bold">파일 위치</td>
                      <td className="border border-gray-300 px-4 py-2"><code className="text-sm">src/app/api/</code></td>
                      <td className="border border-gray-300 px-4 py-2"><code className="text-sm">src/pages/api/</code></td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold">파일명</td>
                      <td className="border border-gray-300 px-4 py-2"><code className="text-sm">route.ts</code></td>
                      <td className="border border-gray-300 px-4 py-2">아무 이름.ts</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-bold">메서드 정의</td>
                      <td className="border border-gray-300 px-4 py-2">Named exports (GET, POST 등)</td>
                      <td className="border border-gray-300 px-4 py-2">if/switch 문으로 분기</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold">권장 여부</td>
                      <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">✅ 권장</td>
                      <td className="border border-gray-300 px-4 py-2 text-yellow-600">레거시</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* RESTful API Design */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">RESTful API 설계 원칙</h2>

          <p className="text-gray-600 mb-6">
            REST는 <strong>Representational State Transfer</strong>의 약자로,
            웹 API를 설계하는 표준 방식입니다. 다음 규칙을 따르면 일관되고 직관적인 API를 만들 수 있습니다.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">HTTP 메서드</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">URL 패턴</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">동작</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-green-100 px-2 py-1 rounded">GET</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users</code></td>
                  <td className="border border-gray-300 px-4 py-2">목록 조회</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">모든 사용자 조회</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-green-100 px-2 py-1 rounded">GET</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users/[id]</code></td>
                  <td className="border border-gray-300 px-4 py-2">단일 조회</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">ID 1번 사용자 조회</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-blue-100 px-2 py-1 rounded">POST</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users</code></td>
                  <td className="border border-gray-300 px-4 py-2">생성</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">새 사용자 생성</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-yellow-100 px-2 py-1 rounded">PUT</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users/[id]</code></td>
                  <td className="border border-gray-300 px-4 py-2">전체 수정</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">사용자 정보 전체 수정</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-yellow-100 px-2 py-1 rounded">PATCH</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users/[id]</code></td>
                  <td className="border border-gray-300 px-4 py-2">부분 수정</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">이름만 수정</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><code className="bg-red-100 px-2 py-1 rounded">DELETE</code></td>
                  <td className="border border-gray-300 px-4 py-2"><code>/api/users/[id]</code></td>
                  <td className="border border-gray-300 px-4 py-2">삭제</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">ID 1번 사용자 삭제</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 RESTful 네이밍 규칙</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>복수형 사용: <code className="bg-gray-100 px-1">/users</code> (O), <code className="bg-gray-100 px-1">/user</code> (X)</li>
              <li>소문자 사용: <code className="bg-gray-100 px-1">/api/users</code> (O), <code className="bg-gray-100 px-1">/api/Users</code> (X)</li>
              <li>하이픈 사용: <code className="bg-gray-100 px-1">/user-profiles</code> (O), <code className="bg-gray-100 px-1">/user_profiles</code> (X)</li>
              <li>동사 지양: <code className="bg-gray-100 px-1">/api/users</code> (O), <code className="bg-gray-100 px-1">/api/getUsers</code> (X)</li>
            </ul>
          </div>
        </section>

        {/* Pattern 1: Static Route */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">패턴 1</span>
            <h2 className="text-2xl font-bold text-gray-800">Static Route (현재 사용 중)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            폴더명이 곧 URL이 되며, 목록 조회와 생성에 적합합니다. 현재 프로젝트에서 사용하는 방식입니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">파일 구조:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`src/app/api/prisma/users/route.ts`}</code>
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              → 이 파일은 <code className="bg-gray-100 px-1">/api/prisma/users</code> URL에 매핑됩니다
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">코드 예제:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import { ApiResponse } from '@/types/api-responses';

// GET /api/prisma/users - 모든 사용자 조회
export async function GET() {
  try {
    const users = await userService.findAll();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch users'
      },
      { status: 500 }
    );
  }
}

// POST /api/prisma/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await userService.create(body);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: user,
        message: 'User created successfully'
      },
      { status: 201 }  // 201 Created 상태 코드
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to create user'
      },
      { status: 500 }
    );
  }
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-green-800 mb-2">✅ 장점</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>코드가 간단하고 명확함</li>
                <li>목록 조회/생성에 최적화</li>
                <li>빠르게 구현 가능</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h4 className="font-bold text-red-800 mb-2">❌ 단점</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>개별 리소스 접근 불가</li>
                <li>PUT, DELETE 추가 어려움</li>
                <li>RESTful하지 않음</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">언제 사용하나요?</h4>
            <p className="text-gray-700">
              간단한 CRUD 중 목록 조회와 생성만 필요한 경우. 예: 관리자 페이지의 간단한 데이터 관리
            </p>
          </div>
        </section>

        {/* Pattern 2: Dynamic Route */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold mr-4">패턴 2</span>
            <h2 className="text-2xl font-bold text-gray-800">Dynamic Route (권장 패턴) ⭐</h2>
          </div>

          <p className="text-gray-600 mb-6">
            URL에 ID를 포함하여 개별 리소스를 관리합니다. 완전한 RESTful API를 구현할 수 있습니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">파일 구조:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`src/app/api/prisma/users/[id]/route.ts`}</code>
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              → <code className="bg-gray-100 px-1">[id]</code>는 동적 세그먼트로,
              <code className="bg-gray-100 px-1 mx-1">/api/prisma/users/1</code>,
              <code className="bg-gray-100 px-1">/api/prisma/users/2</code> 등의 URL에 매핑됩니다
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">코드 예제:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import { ApiResponse } from '@/types/api-responses';

// GET /api/prisma/users/[id] - 특정 사용자 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }  // ← params에서 id 추출
) {
  try {
    const id = parseInt(params.id);
    const user = await userService.findById(id);

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'User not found' },
        { status: 404 }  // 404 Not Found
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/prisma/users/[id] - 사용자 전체 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const user = await userService.update(id, body);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/prisma/users/[id] - 사용자 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await userService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-green-800 mb-2">✅ 장점</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>완전한 RESTful API 구현</li>
                <li>개별 리소스 관리 가능</li>
                <li>모든 HTTP 메서드 지원</li>
                <li>업계 표준 패턴</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-bold text-blue-800 mb-2">📚 실제 사용 예시</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>사용자 관리 시스템</li>
                <li>블로그 게시글 관리</li>
                <li>상품 관리 시스템</li>
                <li>대부분의 CRUD 기능</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">✅ 권장: 이 패턴을 기본으로 사용하세요!</h4>
            <p className="text-gray-700">
              완전한 CRUD가 필요한 대부분의 경우에 이 패턴을 사용하는 것이 좋습니다.
              Static Route와 Dynamic Route를 함께 사용하면 완벽한 API를 만들 수 있습니다.
            </p>
          </div>
        </section>

        {/* Query Parameters vs Path Parameters */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Query Parameters vs Path Parameters</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-purple-600 mb-3">Path Parameters (경로 매개변수)</h3>
              <p className="text-gray-600 mb-3 text-sm">
                URL 경로의 일부로, 필수적인 리소스 식별자
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto mb-3">
                <code>{`// URL: /api/posts/123
const { id } = params;  // "123"

// 사용 예:
/api/users/1        // User ID 1
/api/posts/5/comments/10  // Post 5의 Comment 10`}</code>
              </pre>
              <div className="p-3 bg-purple-50 rounded text-sm">
                <strong>언제 사용:</strong> 리소스를 특정하는 필수 ID
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-orange-600 mb-3">Query Parameters (쿼리 매개변수)</h3>
              <p className="text-gray-600 mb-3 text-sm">
                URL 뒤에 <code>?</code>로 시작하는 선택적 필터/옵션
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto mb-3">
                <code>{`// URL: /api/posts?page=1&limit=10&published=true
const searchParams = request.nextUrl.searchParams;
const page = searchParams.get('page');      // "1"
const limit = searchParams.get('limit');    // "10"
const published = searchParams.get('published'); // "true"

// 사용 예:
/api/posts?search=prisma      // 검색
/api/users?role=admin&active=true  // 필터링
/api/products?sort=price&order=desc  // 정렬`}</code>
              </pre>
              <div className="p-3 bg-orange-50 rounded text-sm">
                <strong>언제 사용:</strong> 필터링, 정렬, 페이지네이션, 검색
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 실전 예시</h4>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>{`// ✅ 좋은 예: Path + Query 조합
GET /api/categories/1/posts?published=true&limit=10
    ↑ Path Parameter   ↑ Query Parameters
    (카테고리 ID)      (필터링, 제한)

// ❌ 나쁜 예: 모든 것을 Query로
GET /api/posts?categoryId=1&published=true&limit=10
    (categoryId는 Path Parameter로 하는 것이 더 RESTful)`}</code>
            </pre>
          </div>
        </section>

        {/* Error Handling */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">에러 처리 패턴</h2>

          <p className="text-gray-600 mb-6">
            올바른 HTTP 상태 코드와 명확한 에러 메시지로 API를 사용하기 쉽게 만드세요.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">기본 에러 처리 패턴:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`import { Prisma } from '@prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // 입력 검증
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }  // 400 Bad Request
      );
    }

    const user = await userService.findById(id);

    // 리소스 없음
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }  // 404 Not Found
      );
    }

    return NextResponse.json({ success: true, data: user });

  } catch (error) {
    // Prisma 에러 처리
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2025: Record not found
      if (error.code === 'P2025') {
        return NextResponse.json(
          { success: false, error: 'Record not found' },
          { status: 404 }
        );
      }
      // P2002: Unique constraint failed
      if (error.code === 'P2002') {
        return NextResponse.json(
          { success: false, error: 'This record already exists' },
          { status: 409 }  // 409 Conflict
        );
      }
    }

    // 일반 에러
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">HTTP 상태 코드 가이드:</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">코드</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">의미</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">사용 시기</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>200</strong> OK</td>
                    <td className="border border-gray-300 px-4 py-2">성공</td>
                    <td className="border border-gray-300 px-4 py-2">GET, PUT, PATCH 성공</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>201</strong> Created</td>
                    <td className="border border-gray-300 px-4 py-2">생성 성공</td>
                    <td className="border border-gray-300 px-4 py-2">POST로 리소스 생성</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>204</strong> No Content</td>
                    <td className="border border-gray-300 px-4 py-2">성공, 내용 없음</td>
                    <td className="border border-gray-300 px-4 py-2">DELETE 성공</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>400</strong> Bad Request</td>
                    <td className="border border-gray-300 px-4 py-2">잘못된 요청</td>
                    <td className="border border-gray-300 px-4 py-2">입력 검증 실패</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>401</strong> Unauthorized</td>
                    <td className="border border-gray-300 px-4 py-2">인증 필요</td>
                    <td className="border border-gray-300 px-4 py-2">로그인 필요</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>403</strong> Forbidden</td>
                    <td className="border border-gray-300 px-4 py-2">권한 없음</td>
                    <td className="border border-gray-300 px-4 py-2">접근 권한 부족</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>404</strong> Not Found</td>
                    <td className="border border-gray-300 px-4 py-2">리소스 없음</td>
                    <td className="border border-gray-300 px-4 py-2">ID로 찾을 수 없음</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>409</strong> Conflict</td>
                    <td className="border border-gray-300 px-4 py-2">충돌</td>
                    <td className="border border-gray-300 px-4 py-2">중복 데이터</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-4 py-2"><strong>500</strong> Internal Server Error</td>
                    <td className="border border-gray-300 px-4 py-2">서버 에러</td>
                    <td className="border border-gray-300 px-4 py-2">예상치 못한 에러</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">실무 권장사항 (Best Practices)</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <h3 className="font-bold text-green-800 mb-3">✅ 권장 (Good Practices)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span><strong>Service Layer 패턴</strong>: 비즈니스 로직을 별도 파일로 분리 (현재 프로젝트처럼)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span><strong>일관된 응답 형식</strong>: ApiResponse 타입 사용</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span><strong>적절한 HTTP 상태 코드</strong>: 200, 201, 404, 500 등</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span><strong>에러 처리</strong>: try-catch로 모든 에러 처리</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">5.</span>
                  <span><strong>TypeScript 타입 정의</strong>: DTO, Response 타입</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">6.</span>
                  <span><strong>입력 검증</strong>: Zod 등으로 요청 데이터 검증</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <h3 className="font-bold text-red-800 mb-3">❌ 피해야 할 것 (Anti-Patterns)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span><strong>라우트에 비즈니스 로직</strong>: DB 쿼리를 route.ts에 직접 작성</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span><strong>에러 무시</strong>: try-catch 없이 에러 방치</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span><strong>잘못된 상태 코드</strong>: 모든 응답에 200만 사용</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span><strong>입력 검증 생략</strong>: 사용자 입력 그대로 DB에 저장</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">5.</span>
                  <span><strong>민감 정보 노출</strong>: 비밀번호 등을 응답에 포함</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">6.</span>
                  <span><strong>RESTful 규칙 무시</strong>: /getUserById 같은 URL 사용</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">현재 프로젝트 평가</h4>
            <p className="text-gray-700 mb-2">
              이 프로젝트는 이미 많은 Best Practices를 따르고 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>✅ Service Layer 패턴 사용</li>
              <li>✅ TypeScript 타입 정의 (ApiResponse, DTO)</li>
              <li>✅ 일관된 응답 형식</li>
              <li>✅ 에러 처리 (try-catch)</li>
              <li>⚠️ 추가하면 좋음: Dynamic Routes, 입력 검증 (Zod)</li>
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">핵심 요약</h2>
          <div className="space-y-3">
            <p className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span><code className="bg-purple-900 px-2 py-1 rounded">route.ts</code>에서 GET, POST 등을 Named Export로 작성하는 것은 <strong>Next.js의 표준이자 권장 방식</strong>입니다.</span>
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>실무에서는 <strong>Static Route + Dynamic Route</strong>를 함께 사용하여 완전한 RESTful API를 만듭니다.</span>
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span><strong>Service Layer 패턴</strong>으로 비즈니스 로직을 분리하면 유지보수가 쉬워집니다.</span>
            </p>
            <p className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span><strong>적절한 HTTP 상태 코드</strong>와 <strong>명확한 에러 메시지</strong>는 필수입니다.</span>
            </p>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            API 패턴을 이해했다면 이제 실전 쿼리 예제를 연습해보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/database-relationships"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← 테이블 관계 다시 보기
            </Link>
            <Link
              href="/prisma-queries"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              실전 쿼리 연습하기 →
            </Link>
            <Link
              href="/advanced-queries"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              고급 쿼리 학습하기 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
