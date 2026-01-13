'use client';

import Link from 'next/link';

export default function PerformanceTipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Prisma 성능 최적화 가이드
          </h1>
          <p className="text-xl text-gray-600">
            빠르고 효율적인 애플리케이션을 만들기 위한 실전 최적화 팁
          </p>
        </div>

        {/* Tip 1: Use Select Over Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 1</span>
            <h2 className="text-2xl font-bold text-gray-800">가능한 Select 사용하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Include는 모든 필드를 가져오지만, Select는 필요한 필드만 가져와 성능이 좋습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">❌ Include (더 많은 데이터)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const users = await prisma.user.findMany({
  include: {
    posts: true  // 모든 필드
  }
});
// → 더 큰 응답 크기`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">✅ Select (필요한 것만)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    posts: {
      select: {
        id: true,
        title: true
      }
    }
  }
});
// → 더 작은 응답 크기`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <p className="text-gray-700">
              <strong>효과:</strong> 네트워크 전송량 30-70% 감소, 메모리 사용량 감소, 응답 속도 향상
            </p>
          </div>
        </section>

        {/* Tip 2: Add Indexes */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 2</span>
            <h2 className="text-2xl font-bold text-gray-800">인덱스 전략적으로 추가하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            자주 조회하고 필터링하는 필드에 인덱스를 추가하면 쿼리 속도가 극적으로 향상됩니다.
          </p>

          <div className="mb-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`model Post {
  id         Int      @id @default(autoincrement())
  title      String
  content    String
  authorId   Int
  categoryId Int
  published  Boolean  @default(false)
  createdAt  DateTime @default(now())
  viewCount  Int      @default(0)

  // 📌 인덱스 추가
  @@index([authorId])        // User로 검색
  @@index([categoryId])      // Category로 검색
  @@index([published])       // 발행 상태로 필터
  @@index([createdAt])       // 날짜 정렬
  @@index([categoryId, published])  // 복합 인덱스
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-bold text-blue-800 mb-2">외래키</h4>
              <p className="text-sm text-gray-700">authorId, categoryId 등</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-bold text-blue-800 mb-2">필터 필드</h4>
              <p className="text-sm text-gray-700">published, status 등</p>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-bold text-blue-800 mb-2">정렬 필드</h4>
              <p className="text-sm text-gray-700">createdAt, viewCount 등</p>
            </div>
          </div>
        </section>

        {/* Tip 3: Use Pagination */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 3</span>
            <h2 className="text-2xl font-bold text-gray-800">페이지네이션 적용하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            대용량 데이터는 페이지네이션으로 나눠서 가져오세요.
          </p>

          <div className="mb-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 페이지네이션 구현
const page = 1;      // 현재 페이지
const limit = 20;    // 페이지당 개수

const posts = await prisma.post.findMany({
  skip: (page - 1) * limit,  // 건너뛸 개수
  take: limit,               // 가져올 개수
  orderBy: { createdAt: 'desc' }
});

// 총 개수
const total = await prisma.post.count();

// 총 페이지 수
const totalPages = Math.ceil(total / limit);`}</code>
            </pre>
          </div>

          <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
            <p className="text-gray-700">
              <strong>권장 페이지 크기:</strong> 10-50개 (용도에 따라 조정)
            </p>
          </div>
        </section>

        {/* Tip 4: Use _count Instead of Include */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 4</span>
            <h2 className="text-2xl font-bold text-gray-800">개수만 필요하면 _count 사용하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            관계 데이터의 개수만 필요한 경우 _count를 사용하면 훨씬 빠릅니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">❌ 느림 (모든 데이터 로드)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    comments: true
  }
});

const postCount = user.posts.length;
// → 모든 posts를 메모리에 로드`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">✅ 빠름 (개수만 조회)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    _count: {
      select: {
        posts: true,
        comments: true
      }
    }
  }
});

const postCount = user._count.posts;
// → COUNT 쿼리만 실행`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Tip 5: Batch Operations */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 5</span>
            <h2 className="text-2xl font-bold text-gray-800">배치 작업 활용하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            여러 레코드를 처리할 때는 createMany, updateMany, deleteMany를 사용하세요.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">❌ 느림 (개별 처리)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`// 10번의 쿼리
for (const tagName of tags) {
  await prisma.tag.create({
    data: { name: tagName }
  });
}`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">✅ 빠름 (배치 처리)</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`// 1번의 쿼리
await prisma.tag.createMany({
  data: tags.map(name => ({ name })),
  skipDuplicates: true
});`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-gray-700">
              <strong>성능 향상:</strong> 10-100배 빠름 (레코드 수에 따라)
            </p>
          </div>
        </section>

        {/* Tip 6: Connection Pooling */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-yellow-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 6</span>
            <h2 className="text-2xl font-bold text-gray-800">커넥션 풀링 설정하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            데이터베이스 연결을 재사용하여 오버헤드를 줄입니다.
          </p>

          <div className="mb-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// .env 파일
DATABASE_URL="postgresql://user:password@localhost:5432/db?connection_limit=10&pool_timeout=20"

// connection_limit: 최대 동시 연결 수 (기본: 무제한)
// pool_timeout: 연결 대기 시간 (초)

// 권장 설정:
// - 개발: connection_limit=5
// - 프로덕션: connection_limit=20-100 (서버 스펙에 따라)`}</code>
            </pre>
          </div>
        </section>

        {/* Tip 7: Use findUnique Over findFirst */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold mr-4">팁 7</span>
            <h2 className="text-2xl font-bold text-gray-800">findUnique 우선 사용하기</h2>
          </div>

          <p className="text-gray-600 mb-6">
            고유 필드(id, unique 제약)로 조회할 때는 findUnique가 더 빠릅니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">❌ 느림</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const user = await prisma.user.findFirst({
  where: { id: 1 }
});`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">✅ 빠름</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{`const user = await prisma.user.findUnique({
  where: { id: 1 }
});`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500">
            <p className="text-gray-700">
              <strong>이유:</strong> findUnique는 인덱스를 직접 사용하여 더 빠릅니다
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">빠른 참조 체크리스트</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-600 mb-3">✅ 해야 할 것</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>필요한 필드만 select</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>자주 조회하는 필드에 인덱스</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>페이지네이션 적용</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>개수만 필요하면 _count</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>배치 작업 활용 (createMany 등)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>고유 필드는 findUnique 사용</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-red-600 mb-3">❌ 피해야 할 것</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>N+1 쿼리 (루프 안에서 쿼리)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>과도한 include (필요 없는 데이터)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>인덱스 없이 대용량 테이블 조회</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>전체 데이터 한 번에 조회</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>너무 깊은 include 중첩 (4단계 이상)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>findFirst를 findUnique 대신 사용</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            성능 최적화를 마스터했다면 이제 실전 쿼리를 연습해보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/common-pitfalls"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← 자주하는 실수 다시 보기
            </Link>
            <Link
              href="/prisma-queries"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              실전 쿼리 연습하기 →
            </Link>
            <Link
              href="/"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
