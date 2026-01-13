'use client';

import Link from 'next/link';

export default function CommonPitfallsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Prisma 자주하는 실수와 해결 방법
          </h1>
          <p className="text-xl text-gray-600">
            초보자가 자주 하는 실수를 미리 파악하고, 올바른 패턴으로 작성하세요.
          </p>
        </div>

        {/* Pitfall 1: N+1 Query Problem */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 1</span>
            <h2 className="text-2xl font-bold text-gray-800">N+1 쿼리 문제</h2>
          </div>

          <p className="text-gray-600 mb-6">
            가장 흔하고 치명적인 성능 문제입니다. 루프 안에서 쿼리를 실행하면 데이터가 많을수록 엄청나게 느려집니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
                ❌ 나쁜 예 (N+1 쿼리)
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 1번의 쿼리로 users 조회
const users = await prisma.user.findMany();

// 각 user마다 N번의 쿼리 실행!
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { authorId: user.id }
  });
  console.log(\`\${user.name}: \${posts.length}개 게시글\`);
}

// 🔥 문제:
// - User 100명 = 1 + 100 = 101번의 쿼리!
// - User 1000명 = 1 + 1000 = 1001번의 쿼리!
// - 매우 느림!`}</code>
              </pre>
            </div>

            <div>
              <div className="bg-green-100 border-2 border-green-400 px-4 py-2 rounded-t font-bold text-green-800">
                ✅ 좋은 예 (단일 쿼리)
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 1번의 쿼리로 모두 조회
const users = await prisma.user.findMany({
  include: {
    posts: true  // posts도 함께 가져옴
  }
});

// posts는 이미 포함되어 있음!
users.forEach(user => {
  console.log(\`\${user.name}: \${user.posts.length}개 게시글\`);
});

// ✅ 해결:
// - User 몇 명이든 단 1번의 쿼리!
// - 매우 빠름!`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">📊 성능 비교</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">사용자 수</th>
                  <th className="text-left py-2">N+1 (쿼리 수)</th>
                  <th className="text-left py-2">Include (쿼리 수)</th>
                  <th className="text-left py-2">차이</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">10명</td>
                  <td className="text-red-600">11번</td>
                  <td className="text-green-600">1번</td>
                  <td><strong>11배 빠름</strong></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">100명</td>
                  <td className="text-red-600">101번</td>
                  <td className="text-green-600">1번</td>
                  <td><strong>101배 빠름</strong></td>
                </tr>
                <tr>
                  <td className="py-2">1000명</td>
                  <td className="text-red-600">1001번</td>
                  <td className="text-green-600">1번</td>
                  <td><strong>1001배 빠름</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pitfall 2: Over-fetching */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 2</span>
            <h2 className="text-2xl font-bold text-gray-800">과도한 데이터 페칭 (Over-fetching)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            필요하지 않은 데이터까지 모두 가져와서 메모리와 네트워크를 낭비합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
                ❌ 나쁜 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 사용자 목록 페이지에서 이름만 필요한데...
const users = await prisma.user.findMany({
  include: {
    posts: {
      include: {
        comments: {
          include: {
            author: true,
            replies: true
          }
        },
        category: true,
        postTags: {
          include: { tag: true }
        }
      }
    },
    comments: true
  }
});

// 🔥 문제:
// - 수십 MB의 데이터를 가져옴
// - 실제로는 이름만 필요한데!
// - 메모리 낭비, 느린 응답`}</code>
              </pre>
            </div>

            <div>
              <div className="bg-green-100 border-2 border-green-400 px-4 py-2 rounded-t font-bold text-green-800">
                ✅ 좋은 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 필요한 필드만 선택
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    _count: {
      select: {
        posts: true,
        comments: true
      }
    }
  }
});

// ✅ 해결:
// - 필요한 데이터만 가져옴
// - 빠른 응답
// - 메모리 절약`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 선택 가이드</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>목록 페이지:</strong> select로 최소 필드만</li>
              <li><strong>상세 페이지:</strong> include로 관련 데이터 포함</li>
              <li><strong>통계만 필요:</strong> _count 사용</li>
              <li><strong>원칙:</strong> 필요한 만큼만!</li>
            </ul>
          </div>
        </section>

        {/* Pitfall 3: Missing Transaction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-yellow-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 3</span>
            <h2 className="text-2xl font-bold text-gray-800">트랜잭션 미사용</h2>
          </div>

          <p className="text-gray-600 mb-6">
            관련된 여러 작업을 트랜잭션 없이 실행하면 데이터 불일치가 발생할 수 있습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
                ❌ 나쁜 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 사용자 생성
const user = await prisma.user.create({
  data: { email: 'user@example.com', name: 'User' }
});

// 게시글 생성 (만약 여기서 에러 발생하면?)
const post = await prisma.post.create({
  data: {
    title: 'First Post',
    content: 'Hello',
    authorId: user.id,
    categoryId: 1
  }
});

// 🔥 문제:
// - post 생성 실패 시 user만 남음
// - 데이터 불일치!`}</code>
              </pre>
            </div>

            <div>
              <div className="bg-green-100 border-2 border-green-400 px-4 py-2 rounded-t font-bold text-green-800">
                ✅ 좋은 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// Transaction 사용
const result = await prisma.$transaction(async (tx) => {
  // 사용자 생성
  const user = await tx.user.create({
    data: { email: 'user@example.com', name: 'User' }
  });

  // 게시글 생성
  const post = await tx.post.create({
    data: {
      title: 'First Post',
      content: 'Hello',
      authorId: user.id,
      categoryId: 1
    }
  });

  return { user, post };
});

// ✅ 해결:
// - 둘 다 성공하거나 둘 다 실패
// - 데이터 일관성 보장!`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Pitfall 4: Missing Indexes */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 4</span>
            <h2 className="text-2xl font-bold text-gray-800">인덱스 누락</h2>
          </div>

          <p className="text-gray-600 mb-6">
            자주 조회하는 필드에 인덱스가 없으면 데이터가 많을 때 매우 느려집니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
                ❌ 나쁜 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 스키마에 인덱스 없음
model Post {
  id         Int      @id
  title      String
  authorId   Int
  categoryId Int
  // @@index([authorId])  ← 없음!
  // @@index([categoryId]) ← 없음!
}

// 쿼리 실행
const posts = await prisma.post.findMany({
  where: { authorId: 1 }
});

// 🔥 문제:
// - 10만 개 Post를 전부 스캔
// - 매우 느림 (수 초)`}</code>
              </pre>
            </div>

            <div>
              <div className="bg-green-100 border-2 border-green-400 px-4 py-2 rounded-t font-bold text-green-800">
                ✅ 좋은 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 스키마에 인덱스 추가
model Post {
  id         Int      @id
  title      String
  authorId   Int
  categoryId Int

  @@index([authorId])  // ← 추가!
  @@index([categoryId]) // ← 추가!
}

// 같은 쿼리
const posts = await prisma.post.findMany({
  where: { authorId: 1 }
});

// ✅ 해결:
// - 인덱스를 사용하여 빠르게 검색
// - 매우 빠름 (수 ms)`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800 mb-2">📌 인덱스가 필요한 경우</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>외래키:</strong> authorId, categoryId, postId 등</li>
              <li><strong>자주 검색하는 필드:</strong> email, username 등</li>
              <li><strong>정렬 필드:</strong> createdAt, viewCount 등</li>
              <li><strong>복합 조건:</strong> [categoryId, published] 등</li>
            </ul>
          </div>
        </section>

        {/* Pitfall 5: Circular References */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 5</span>
            <h2 className="text-2xl font-bold text-gray-800">순환 참조</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Include를 너무 깊게 중첩하면 같은 데이터를 무한히 조회하게 됩니다.
          </p>

          <div className="mb-6">
            <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
              ❌ 나쁜 예 (순환 참조)
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
              <code>{`// Post → Author → Posts → Author → Posts ... 무한 반복!
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    author: {
      include: {
        posts: {
          include: {
            author: {
              include: {
                posts: true  // 다시 posts로!
              }
            }
          }
        }
      }
    }
  }
});

// 🔥 문제:
// - 무한 루프 또는 매우 깊은 중첩
// - 엄청난 데이터 양
// - 메모리 부족 에러`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">✅ 해결 방법</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Include 깊이를 2-3단계로 제한</li>
              <li>필요한 관계만 선택적으로 include</li>
              <li>무한 반복되는 include는 피하기</li>
              <li>대신 _count나 별도 쿼리 사용</li>
            </ul>
          </div>
        </section>

        {/* Pitfall 6: Not Using Pagination */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold mr-4">실수 6</span>
            <h2 className="text-2xl font-bold text-gray-800">페이지네이션 미사용</h2>
          </div>

          <p className="text-gray-600 mb-6">
            데이터가 많은데 전체를 한 번에 가져오면 서버와 클라이언트 모두 부담이 됩니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="bg-red-100 border-2 border-red-400 px-4 py-2 rounded-t font-bold text-red-800">
                ❌ 나쁜 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 전체 게시글 조회 (10만 개!)
const posts = await prisma.post.findMany({
  include: {
    author: true,
    category: true,
    comments: true
  }
});

// 🔥 문제:
// - 10만 개 전부 메모리에 로드
// - 수십 MB의 응답
// - 브라우저 멈춤`}</code>
              </pre>
            </div>

            <div>
              <div className="bg-green-100 border-2 border-green-400 px-4 py-2 rounded-t font-bold text-green-800">
                ✅ 좋은 예
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b text-sm overflow-x-auto">
                <code>{`// 페이지네이션 적용
const page = 1;
const limit = 20;

const posts = await prisma.post.findMany({
  include: {
    author: true,
    category: true
  },
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' }
});

const total = await prisma.post.count();

// ✅ 해결:
// - 한 번에 20개만
// - 빠른 응답
// - 사용자 경험 향상`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">실수 요약 & 체크리스트</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">쿼리 패턴</h3>
              <ul className="space-y-1 text-sm">
                <li>✅ Include 사용 (N+1 방지)</li>
                <li>✅ Select로 필요한 필드만</li>
                <li>✅ Transaction으로 일관성 보장</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">스키마 & 성능</h3>
              <ul className="space-y-1 text-sm">
                <li>✅ 외래키에 인덱스 추가</li>
                <li>✅ Include 깊이 제한</li>
                <li>✅ 페이지네이션 적용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            실수를 피하는 방법을 배웠다면 이제 성능 최적화 팁을 알아보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/advanced-queries"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← 고급 쿼리 다시 보기
            </Link>
            <Link
              href="/performance-tips"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              성능 최적화 팁 →
            </Link>
            <Link
              href="/prisma-queries"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              실전 쿼리 연습하기 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
