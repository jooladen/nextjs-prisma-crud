'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrismaIncludesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Prisma Include 완벽 가이드
          </h1>
          <p className="text-xl text-gray-600">
            Prisma의 `include` 기능을 6단계로 마스터하세요. 각 예제는 복사-붙여넣기가 가능합니다.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Include란 무엇인가요?</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <code className="bg-gray-100 px-2 py-1 rounded">include</code>는 Prisma에서 관련된 데이터를 함께 가져올 때 사용하는 기능입니다.
              데이터베이스의 JOIN 연산을 간단하게 만들어주며, 복잡한 SQL 쿼리 없이도 관계된 데이터를 한 번에 조회할 수 있습니다.
            </p>
            <p>
              예를 들어, <strong>User</strong>를 조회할 때 그 사용자가 작성한 <strong>Post</strong>들도 함께 가져오고 싶다면
              <code className="bg-gray-100 px-2 py-1 rounded">include</code>를 사용합니다.
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-800 mb-2">include vs select의 차이점</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">include</code>:
                원래 모델의 <strong>모든 필드</strong> + 관계 데이터를 함께 가져옴
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">select</code>:
                원하는 <strong>특정 필드만</strong> 선택해서 가져옴 (관계 데이터 포함 가능)
              </li>
              <li>
                <strong>성능 최적화</strong>: 필요한 필드만 가져오려면 select를, 모든 필드가 필요하면 include를 사용하세요
              </li>
            </ul>
          </div>
        </section>

        {/* Pattern 1: Basic Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">1단계</span>
            <h2 className="text-2xl font-bold text-gray-800">기본 Include</h2>
          </div>

          <p className="text-gray-600 mb-6">
            가장 기본적인 형태입니다. User를 조회할 때 관련된 모든 Post를 함께 가져옵니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// User의 모든 Post 함께 가져오기
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true  // User가 작성한 모든 게시글 포함
  }
});

// 결과 구조:
// {
//   id: 1,
//   email: "user@example.com",
//   name: "홍길동",
//   createdAt: "2024-01-01T00:00:00.000Z",
//   posts: [
//     { id: 1, title: "첫 번째 글", content: "...", ... },
//     { id: 2, title: "두 번째 글", content: "...", ... }
//   ]
// }`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">언제 사용하나요?</h4>
            <p className="text-gray-700">
              사용자 정보와 그 사용자의 모든 게시글을 함께 표시해야 할 때 사용합니다.
              예: 사용자 프로필 페이지, 마이페이지
            </p>
          </div>
        </section>

        {/* Pattern 2: Selective Fields */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">2단계</span>
            <h2 className="text-2xl font-bold text-gray-800">Selective Fields (성능 최적화)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Include 내에서 <code className="bg-gray-100 px-2 py-1 rounded">select</code>를 사용하여
            필요한 필드만 선택합니다. 불필요한 데이터를 가져오지 않아 성능이 향상됩니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// Post의 특정 필드만 선택하여 성능 최적화
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      select: {
        id: true,
        title: true,
        published: true
        // content, createdAt 등 불필요한 필드는 제외
      }
    }
  }
});

// 결과 구조:
// {
//   id: 1,
//   email: "user@example.com",
//   name: "홍길동",
//   createdAt: "2024-01-01T00:00:00.000Z",
//   posts: [
//     { id: 1, title: "첫 번째 글", published: true },
//     { id: 2, title: "두 번째 글", published: false }
//   ]
// }`}</code>
            </pre>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">성능 개선 효과</h4>
            <p className="text-gray-700">
              ✅ 네트워크 트래픽 감소: 필요한 데이터만 전송<br/>
              ✅ 메모리 사용량 감소: 불필요한 데이터를 메모리에 로드하지 않음<br/>
              ✅ 응답 속도 향상: 데이터 크기가 작아져 더 빠르게 처리
            </p>
          </div>
        </section>

        {/* Pattern 3: Nested Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">3단계</span>
            <h2 className="text-2xl font-bold text-gray-800">Nested Include (중첩된 관계)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            여러 단계의 관계를 한 번에 가져올 수 있습니다.
            Post → Comments → Replies처럼 3단계 이상의 깊은 관계도 조회 가능합니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// Post → Comments → Replies (3단계 중첩)
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    author: true,              // 1단계: 게시글 작성자
    category: true,            // 1단계: 게시글 카테고리
    comments: {                // 2단계: 댓글들
      include: {
        author: true,          // 3단계: 댓글 작성자
        replies: {             // 3단계: 대댓글들
          include: {
            author: true       // 4단계: 대댓글 작성자
          }
        }
      }
    }
  }
});

// 결과 구조:
// {
//   id: 1,
//   title: "Prisma 튜토리얼",
//   author: { id: 1, name: "홍길동" },
//   category: { id: 1, name: "개발" },
//   comments: [
//     {
//       id: 1,
//       content: "좋은 글이네요!",
//       author: { id: 2, name: "김철수" },
//       replies: [
//         {
//           id: 10,
//           content: "감사합니다!",
//           author: { id: 1, name: "홍길동" }
//         }
//       ]
//     }
//   ]
// }`}</code>
            </pre>
          </div>

          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <h4 className="font-bold text-red-800 mb-2">⚠️ 주의사항</h4>
            <p className="text-gray-700">
              너무 깊은 중첩(4단계 이상)은 성능 문제를 일으킬 수 있습니다.
              필요한 만큼만 include하고, 불필요한 중첩은 피하세요.
            </p>
          </div>
        </section>

        {/* Pattern 4: _count */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">4단계</span>
            <h2 className="text-2xl font-bold text-gray-800">_count (관계 데이터 개수만 세기)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            관계 데이터를 모두 가져오지 않고 <strong>개수만</strong> 알고 싶을 때 사용합니다.
            매우 효율적이며 성능이 뛰어납니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// 관계 데이터를 로드하지 않고 개수만 세기
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    _count: {
      select: {
        posts: true,      // 게시글 개수
        comments: true    // 댓글 개수
      }
    }
  }
});

// 결과 구조:
// {
//   id: 1,
//   email: "user@example.com",
//   name: "홍길동",
//   createdAt: "2024-01-01T00:00:00.000Z",
//   _count: {
//     posts: 15,      // 작성한 게시글 15개
//     comments: 48    // 작성한 댓글 48개
//   }
// }

// 💡 posts 배열이나 comments 배열은 없고, 개수만 반환됨!`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">언제 사용하나요?</h4>
            <p className="text-gray-700">
              ✅ 사용자 프로필에 "게시글 15개, 댓글 48개" 표시<br/>
              ✅ 카테고리별 게시글 개수 표시<br/>
              ✅ 대시보드 통계 표시<br/>
              <strong>개수만 필요하고 실제 데이터는 필요 없을 때 사용하면 매우 효율적!</strong>
            </p>
          </div>
        </section>

        {/* Pattern 5: Filtering Within Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">5단계</span>
            <h2 className="text-2xl font-bold text-gray-800">Filtering Within Include (조건부 조회)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Include 내에서 <code className="bg-gray-100 px-2 py-1 rounded">where</code>,
            <code className="bg-gray-100 px-2 py-1 rounded mx-1">orderBy</code>,
            <code className="bg-gray-100 px-2 py-1 rounded">take</code> 등을 사용하여
            관계 데이터를 필터링하고 정렬할 수 있습니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// Include 내에서 필터링, 정렬, 제한
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      where: {
        published: true  // 발행된 게시글만
      },
      orderBy: {
        createdAt: 'desc'  // 최신순 정렬
      },
      take: 5  // 최대 5개만
    }
  }
});

// 결과: User와 그 사용자가 작성한 발행된 게시글 중 최신 5개만 반환

// 복합 조건 예제
const category = await prisma.category.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      where: {
        AND: [
          { published: true },
          { viewCount: { gte: 100 } }  // 조회수 100 이상
        ]
      },
      orderBy: [
        { viewCount: 'desc' },  // 조회수 높은 순
        { createdAt: 'desc' }   // 같으면 최신순
      ],
      take: 10
    }
  }
});`}</code>
            </pre>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">실전 활용 예시</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>사용자의 <strong>최근 5개 게시글</strong>만 표시</li>
              <li>카테고리의 <strong>인기 게시글 상위 10개</strong> 표시</li>
              <li>게시글의 <strong>최상위 댓글만</strong> 가져오기 (parentId가 null인 것만)</li>
            </ul>
          </div>
        </section>

        {/* Pattern 6: Many-to-Many Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">6단계</span>
            <h2 className="text-2xl font-bold text-gray-800">Many-to-Many Include (다대다 관계)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            조인 테이블을 통한 다대다 관계를 조회합니다.
            Post ↔ Tag 관계처럼 중간 테이블(PostTag)을 거쳐야 하는 경우에 사용합니다.
          </p>

          <div className="mb-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
              TypeScript 코드
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
              <code>{`// 조인 테이블을 통한 다대다 관계 조회
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    postTags: {        // 중간 테이블 PostTag
      include: {
        tag: true      // Tag 정보
      }
    }
  }
});

// 결과 구조:
// {
//   id: 1,
//   title: "Prisma 가이드",
//   postTags: [
//     { tag: { id: 1, name: "TypeScript" } },
//     { tag: { id: 2, name: "Database" } },
//     { tag: { id: 3, name: "Prisma" } }
//   ]
// }

// 더 간단하게 태그만 가져오기
const post2 = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    postTags: {
      select: {
        tag: {
          select: {
            id: true,
            name: true
          }
        }
      }
    }
  }
});

// 결과:
// {
//   id: 1,
//   title: "Prisma 가이드",
//   postTags: [
//     { tag: { id: 1, name: "TypeScript" } },
//     { tag: { id: 2, name: "Database" } }
//   ]
// }`}</code>
            </pre>
          </div>

          <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800 mb-2">스키마 구조 이해하기</h4>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto mt-2">
              <code>{`model Post {
  id       Int       @id
  postTags PostTag[] // 중간 테이블 참조
}

model Tag {
  id       Int       @id
  name     String
  postTags PostTag[] // 중간 테이블 참조
}

model PostTag {
  postId Int
  tagId  Int
  post   Post @relation(fields: [postId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([postId, tagId]) // 복합 기본키
}`}</code>
            </pre>
          </div>
        </section>

        {/* Performance Comparison */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">성능 비교 & Best Practices</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">패턴</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">쿼리 수</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">데이터 크기</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">권장 사용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1단계: 기본 Include</td>
                  <td className="border border-gray-300 px-4 py-2">1-2개</td>
                  <td className="border border-gray-300 px-4 py-2 text-yellow-600">중간</td>
                  <td className="border border-gray-300 px-4 py-2">모든 필드가 필요할 때</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">2단계: Selective Fields</td>
                  <td className="border border-gray-300 px-4 py-2">1-2개</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">작음 ✓</td>
                  <td className="border border-gray-300 px-4 py-2">특정 필드만 필요할 때</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">3단계: Nested Include</td>
                  <td className="border border-gray-300 px-4 py-2">3-5개</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600">큼</td>
                  <td className="border border-gray-300 px-4 py-2">복잡한 관계 표시</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">4단계: _count</td>
                  <td className="border border-gray-300 px-4 py-2">1개</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">매우 작음 ✓✓</td>
                  <td className="border border-gray-300 px-4 py-2">개수만 필요할 때</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5단계: Filtering</td>
                  <td className="border border-gray-300 px-4 py-2">1-2개</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">작음 ✓</td>
                  <td className="border border-gray-300 px-4 py-2">조건부 데이터 조회</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">6단계: Many-to-Many</td>
                  <td className="border border-gray-300 px-4 py-2">2-3개</td>
                  <td className="border border-gray-300 px-4 py-2 text-yellow-600">중간</td>
                  <td className="border border-gray-300 px-4 py-2">태그, 카테고리 등</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-green-800 mb-2">✅ 권장사항 (Good)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>필요한 필드만 select로 선택</li>
                <li>개수만 필요하면 _count 사용</li>
                <li>include 깊이는 2-3단계까지만</li>
                <li>where, take로 데이터 제한</li>
                <li>페이지네이션 활용</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h4 className="font-bold text-red-800 mb-2">❌ 피해야 할 것 (Bad)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>4단계 이상의 깊은 중첩</li>
                <li>불필요한 모든 필드 가져오기</li>
                <li>순환 참조 (A → B → A)</li>
                <li>필터링 없는 대용량 데이터</li>
                <li>루프 안에서 include 사용 (N+1)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">자주하는 실수</h2>

          {/* N+1 Problem */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-red-600 mb-3">1. N+1 쿼리 문제</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="bg-red-100 border border-red-300 px-3 py-2 rounded-t font-semibold text-red-800">
                  ❌ 나쁜 예 (N+1 쿼리)
                </div>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-b text-sm overflow-x-auto">
                  <code>{`// 1개 쿼리로 users 조회
const users = await prisma.user.findMany();

// N개 쿼리로 각 user의 posts 조회
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { authorId: user.id }
  });
  // 총 1 + N개의 쿼리 실행!
}`}</code>
                </pre>
              </div>
              <div>
                <div className="bg-green-100 border border-green-300 px-3 py-2 rounded-t font-semibold text-green-800">
                  ✅ 좋은 예 (단일 쿼리)
                </div>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-b text-sm overflow-x-auto">
                  <code>{`// 1개의 쿼리로 모두 조회
const users = await prisma.user.findMany({
  include: {
    posts: true
  }
});

// posts는 이미 포함되어 있음!
// 총 1개의 쿼리만 실행`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Over-fetching */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-red-600 mb-3">2. 과도한 데이터 페칭</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="bg-red-100 border border-red-300 px-3 py-2 rounded-t font-semibold text-red-800">
                  ❌ 나쁜 예
                </div>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-b text-sm overflow-x-auto">
                  <code>{`// 모든 필드와 관계 데이터 가져옴
const users = await prisma.user.findMany({
  include: {
    posts: {
      include: {
        comments: {
          include: {
            author: true
          }
        }
      }
    }
  }
});
// 실제로는 이름만 필요한데
// 수 MB의 데이터를 가져옴!`}</code>
                </pre>
              </div>
              <div>
                <div className="bg-green-100 border border-green-300 px-3 py-2 rounded-t font-semibold text-green-800">
                  ✅ 좋은 예
                </div>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-b text-sm overflow-x-auto">
                  <code>{`// 필요한 필드만 선택
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    _count: {
      select: { posts: true }
    }
  }
});
// 필요한 데이터만 가져와서
// 빠르고 효율적!`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Circular Reference */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-3">3. 순환 참조</h3>
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto mb-2">
                <code>{`// ❌ 순환 참조 - 무한 루프 발생!
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    author: {
      include: {
        posts: {
          include: {
            author: {
              include: {
                posts: true // 다시 posts로 돌아옴!
              }
            }
          }
        }
      }
    }
  }
});`}</code>
              </pre>
              <p className="text-gray-700">
                <strong>해결 방법:</strong> Include 깊이를 제한하고, 필요한 관계만 선택하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            Include를 마스터했다면 이제 데이터베이스 관계를 더 깊이 이해해보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/database-relationships"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              테이블 관계 학습하기 →
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
