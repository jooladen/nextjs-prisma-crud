'use client';

import Link from 'next/link';

export default function AdvancedQueriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Prisma 고급 쿼리 패턴
          </h1>
          <p className="text-xl text-gray-600">
            Transaction, Upsert, Aggregate 등 실전에서 자주 사용하는 고급 패턴을 마스터하세요.
          </p>
        </div>

        {/* Pattern 1: Transaction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold mr-4">1</span>
            <h2 className="text-2xl font-bold text-gray-800">Transaction (트랜잭션)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            여러 데이터베이스 작업을 하나의 단위로 묶어서 실행합니다.
            모두 성공하거나 모두 실패하므로 데이터 일관성을 보장합니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: 사용자와 첫 게시글 동시 생성</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// Transaction: 모두 성공하거나 모두 실패
const result = await prisma.$transaction(async (tx) => {
  // 1. 사용자 생성
  const user = await tx.user.create({
    data: {
      email: 'newuser@example.com',
      name: 'New User'
    }
  });

  // 2. 해당 사용자의 첫 게시글 생성
  const post = await tx.post.create({
    data: {
      title: '첫 번째 게시글',
      content: '안녕하세요!',
      authorId: user.id,      // 위에서 생성한 user의 ID 사용
      categoryId: 1,
      published: true
    }
  });

  // 3. 둘 다 반환
  return { user, post };
});

// 결과:
// {
//   user: { id: 10, email: "newuser@example.com", name: "New User" },
//   post: { id: 50, title: "첫 번째 게시글", authorId: 10, ... }
// }

// ⚡ 만약 post 생성 중 에러가 발생하면?
// → user 생성도 함께 취소됨 (Rollback)`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: 게시글 이동 (카테고리 통계 업데이트)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 게시글을 다른 카테고리로 이동하면서 통계도 업데이트
const result = await prisma.$transaction(async (tx) => {
  // 1. 게시글 카테고리 변경
  const post = await tx.post.update({
    where: { id: 1 },
    data: { categoryId: 3 }  // 카테고리 2 → 3으로 변경
  });

  // 2. 이전 카테고리 통계 감소
  await tx.category.update({
    where: { id: 2 },
    data: {
      // 커스텀 필드가 있다면 업데이트
      // postCount: { decrement: 1 }
    }
  });

  // 3. 새 카테고리 통계 증가
  await tx.category.update({
    where: { id: 3 },
    data: {
      // postCount: { increment: 1 }
    }
  });

  return post;
});`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">✅ 언제 사용하나요?</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>여러 테이블을 동시에 수정할 때</li>
                <li>데이터 일관성이 중요할 때</li>
                <li>결제 처리, 재고 관리 등</li>
                <li>한 작업 실패 시 전체 취소가 필요할 때</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">💡 주의사항</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Transaction 내부는 빨리 실행되어야 함</li>
                <li>외부 API 호출은 Transaction 밖에서</li>
                <li>너무 많은 작업은 성능 저하</li>
                <li>Deadlock 가능성 고려</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pattern 2: Upsert */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold mr-4">2</span>
            <h2 className="text-2xl font-bold text-gray-800">Upsert (있으면 수정, 없으면 생성)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            레코드가 존재하면 업데이트하고, 없으면 새로 생성합니다.
            <strong> "Update or Insert"</strong>의 줄임말입니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: 태그 중복 방지</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// "TypeScript" 태그가 있으면 그대로 사용, 없으면 생성
const tag = await prisma.tag.upsert({
  where: {
    name: 'TypeScript'  // 이 이름으로 검색
  },
  update: {},  // 이미 있으면 아무것도 안 함
  create: {
    name: 'TypeScript'  // 없으면 새로 생성
  }
});

// 결과:
// - "TypeScript" 태그가 이미 있었다면 → 기존 태그 반환
// - 없었다면 → 새로 생성 후 반환`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: 사용자 프로필 업데이트</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 사용자 ID 1의 메타데이터: 있으면 업데이트, 없으면 생성
const metadata = await prisma.postMetadata.upsert({
  where: {
    postId: 1
  },
  update: {
    description: '업데이트된 설명',
    keywords: ['prisma', 'typescript', 'database']
  },
  create: {
    postId: 1,
    description: '새로운 설명',
    keywords: ['prisma', 'typescript']
  }
});

// 💡 유용한 패턴:
// - 중복 검사 + 생성을 한 번에
// - 에러 처리 간소화
// - 코드 가독성 향상`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 3: 조회수 증가 (있으면 +1, 없으면 1로 초기화)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 실제로는 Post 모델에 viewCount 필드가 있지만, 예시를 위해:
const viewRecord = await prisma.postMetadata.upsert({
  where: { postId: 1 },
  update: {
    // 이미 있으면 특정 필드 업데이트
    description: '조회됨'
  },
  create: {
    // 없으면 새로 생성
    postId: 1,
    description: '첫 조회'
  }
});`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">✅ 언제 사용하나요?</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>태그, 카테고리 등 중복 방지가 필요할 때</li>
              <li>설정 값 저장/업데이트 (있으면 수정, 없으면 생성)</li>
              <li>캐시 데이터 관리</li>
              <li>동기화 작업 (외부 데이터 가져올 때)</li>
            </ul>
          </div>
        </section>

        {/* Pattern 3: Aggregate */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold mr-4">3</span>
            <h2 className="text-2xl font-bold text-gray-800">Aggregate (집계 함수)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            데이터의 통계를 계산합니다. 개수, 평균, 최대값, 최소값, 합계 등을 한 번에 조회할 수 있습니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: 게시글 통계</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`const stats = await prisma.post.aggregate({
  _count: {
    id: true,        // 전체 게시글 개수
  },
  _avg: {
    viewCount: true, // 평균 조회수
  },
  _max: {
    viewCount: true, // 최대 조회수
  },
  _min: {
    createdAt: true, // 가장 오래된 게시글 날짜
  },
  _sum: {
    viewCount: true, // 총 조회수
  },
});

// 결과:
// {
//   _count: { id: 150 },           // 게시글 150개
//   _avg: { viewCount: 234.5 },    // 평균 조회수 234.5
//   _max: { viewCount: 5000 },     // 최고 조회수 5000
//   _min: { createdAt: "2024-01-01T..." }, // 최초 게시글 날짜
//   _sum: { viewCount: 35175 }     // 총 조회수 35,175
// }`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: 조건부 집계</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 발행된 게시글만 집계
const publishedStats = await prisma.post.aggregate({
  where: {
    published: true  // 조건: 발행된 것만
  },
  _count: { id: true },
  _avg: { viewCount: true },
});

// 특정 카테고리의 통계
const categoryStats = await prisma.post.aggregate({
  where: {
    categoryId: 1,
    published: true
  },
  _count: { id: true },
  _sum: { viewCount: true },
});`}</code>
            </pre>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 실전 활용</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>대시보드</strong>: 총 사용자 수, 평균 게시글 조회수</li>
              <li><strong>분석 페이지</strong>: 최고/최저 성과 지표</li>
              <li><strong>통계 리포트</strong>: 월별, 연도별 합계</li>
              <li><strong>알림 시스템</strong>: 특정 값 초과 시 알림</li>
            </ul>
          </div>
        </section>

        {/* Pattern 4: GroupBy */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold mr-4">4</span>
            <h2 className="text-2xl font-bold text-gray-800">GroupBy (그룹별 집계)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            특정 필드로 그룹화하여 각 그룹별 통계를 계산합니다. SQL의 <code className="bg-gray-100 px-2 py-1 rounded">GROUP BY</code>와 동일합니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: 카테고리별 게시글 통계</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`const byCategory = await prisma.post.groupBy({
  by: ['categoryId'],  // 카테고리별로 그룹화
  _count: {
    id: true,          // 각 카테고리의 게시글 개수
  },
  _sum: {
    viewCount: true,   // 각 카테고리의 총 조회수
  },
  _avg: {
    viewCount: true,   // 각 카테고리의 평균 조회수
  },
});

// 결과:
// [
//   { categoryId: 1, _count: { id: 45 }, _sum: { viewCount: 12500 }, _avg: { viewCount: 277.7 } },
//   { categoryId: 2, _count: { id: 30 }, _sum: { viewCount: 8900 }, _avg: { viewCount: 296.6 } },
//   { categoryId: 3, _count: { id: 75 }, _sum: { viewCount: 25000 }, _avg: { viewCount: 333.3 } }
// ]`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: 조건부 그룹화 (HAVING)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 총 조회수가 1000 이상인 카테고리만 조회
const popularCategories = await prisma.post.groupBy({
  by: ['categoryId'],
  _sum: {
    viewCount: true,
  },
  _count: {
    id: true,
  },
  having: {
    viewCount: {
      _sum: {
        gt: 1000  // 합계가 1000 초과
      }
    }
  },
  orderBy: {
    _sum: {
      viewCount: 'desc'  // 조회수 많은 순
    }
  }
});

// 결과: 인기 카테고리만 반환 (조회수 높은 순)`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 3: 여러 필드로 그룹화</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 카테고리 + 발행 상태별로 그룹화
const byMultiple = await prisma.post.groupBy({
  by: ['categoryId', 'published'],  // 2개 필드로 그룹화
  _count: {
    id: true,
  },
});

// 결과:
// [
//   { categoryId: 1, published: true, _count: { id: 40 } },
//   { categoryId: 1, published: false, _count: { id: 5 } },
//   { categoryId: 2, published: true, _count: { id: 28 } },
//   { categoryId: 2, published: false, _count: { id: 2 } },
//   ...
// ]`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">✅ 언제 사용하나요?</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>카테고리별, 사용자별 통계</li>
              <li>월별, 연도별 집계</li>
              <li>지역별, 타입별 분석</li>
              <li>차트 데이터 생성</li>
            </ul>
          </div>
        </section>

        {/* Pattern 5: Complex Filtering */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold mr-4">5</span>
            <h2 className="text-2xl font-bold text-gray-800">복잡한 필터링 (AND, OR, NOT)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            여러 조건을 조합하여 정교한 검색을 수행합니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: AND 조건</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 발행되었고 + 조회수 100 이상인 게시글
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      { viewCount: { gte: 100 } }
    ]
  }
});

// 간단한 AND는 이렇게도 가능:
const posts2 = await prisma.post.findMany({
  where: {
    published: true,
    viewCount: { gte: 100 }
  }
});`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: OR 조건</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 제목 또는 내용에 "Prisma"가 포함된 게시글
const posts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'Prisma' } },
      { content: { contains: 'Prisma' } }
    ]
  }
});`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 3: 복합 조건 (AND + OR)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 발행되었고 + (제목 또는 내용에 "Prisma") + 2024년 게시글
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      {
        OR: [
          { title: { contains: 'Prisma' } },
          { content: { contains: 'Prisma' } }
        ]
      },
      {
        createdAt: {
          gte: new Date('2024-01-01'),
          lte: new Date('2024-12-31')
        }
      }
    ]
  },
  orderBy: { createdAt: 'desc' }
});`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 4: NOT 조건</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 특정 카테고리가 아닌 게시글
const posts = await prisma.post.findMany({
  where: {
    NOT: {
      categoryId: 1
    }
  }
});

// 이메일 도메인 제외
const users = await prisma.user.findMany({
  where: {
    NOT: {
      email: { endsWith: '@spam.com' }
    }
  }
});`}</code>
            </pre>
          </div>
        </section>

        {/* Pattern 6: Batch Operations */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-yellow-600 text-white px-4 py-2 rounded-full font-bold mr-4">6</span>
            <h2 className="text-2xl font-bold text-gray-800">배치 작업 (createMany, updateMany, deleteMany)</h2>
          </div>

          <p className="text-gray-600 mb-6">
            여러 레코드를 한 번에 처리하여 성능을 향상시킵니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 1: 여러 레코드 한 번에 생성</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 태그 10개를 한 번에 생성
const result = await prisma.tag.createMany({
  data: [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'Prisma' },
    { name: 'Database' },
    { name: 'SQL' },
    { name: 'NoSQL' },
    { name: 'GraphQL' }
  ],
  skipDuplicates: true  // 중복은 건너뛰기
});

console.log(\`\${result.count}개 생성됨\`);  // "10개 생성됨"`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 2: 조건에 맞는 여러 레코드 수정</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 조회수 1000 이상인 모든 게시글을 "인기" 표시
const result = await prisma.post.updateMany({
  where: {
    viewCount: { gte: 1000 }
  },
  data: {
    // popular: true  // 만약 이런 필드가 있다면
  }
});

console.log(\`\${result.count}개 업데이트됨\`);`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">예제 3: 조건에 맞는 여러 레코드 삭제</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{`// 1년 이상 된 미발행 게시글 삭제
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const result = await prisma.post.deleteMany({
  where: {
    AND: [
      { published: false },
      { createdAt: { lt: oneYearAgo } }
    ]
  }
});

console.log(\`\${result.count}개 삭제됨\`);`}</code>
            </pre>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">⚡ 성능 비교</h4>
            <p className="text-gray-700 mb-2">
              <strong>개별 작업 (느림):</strong> 10개 태그 생성 = 10번의 DB 쿼리<br/>
              <strong>배치 작업 (빠름):</strong> 10개 태그 생성 = 1번의 DB 쿼리<br/>
              → <strong className="text-yellow-800">10배 빠름!</strong>
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">고급 패턴 요약</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">데이터 작업</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Transaction</strong>: 여러 작업을 하나로</li>
                <li>• <strong>Upsert</strong>: 있으면 수정, 없으면 생성</li>
                <li>• <strong>Batch</strong>: 여러 레코드 한 번에</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">데이터 분석</h3>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Aggregate</strong>: 전체 통계</li>
                <li>• <strong>GroupBy</strong>: 그룹별 통계</li>
                <li>• <strong>Complex Filtering</strong>: 정교한 검색</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            고급 쿼리를 배웠다면 이제 자주하는 실수를 피하는 방법을 알아보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/prisma-includes"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← Include 다시 보기
            </Link>
            <Link
              href="/common-pitfalls"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              자주하는 실수 학습하기 →
            </Link>
            <Link
              href="/performance-tips"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              성능 최적화 팁 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
