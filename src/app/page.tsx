import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Prisma & PostgreSQL 레퍼런스
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Next.js, Prisma, PostgreSQL을 활용한 CRUD 학습 및 참조용 레퍼런스 애플리케이션
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/prisma-queries"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Prisma 쿼리 시작하기
          </Link>
          <Link
            href="/native-queries"
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Native 쿼리 시작하기
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Prisma Queries Card */}
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold ml-4 text-gray-900">Prisma 일반 쿼리</h2>
          </div>
          <p className="text-gray-600 mb-6">
            TypeScript 타입 안전성을 제공하는 Prisma Client를 사용한 데이터베이스 작업
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-gray-700">기본 CRUD (Create, Read, Update, Delete)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-gray-700">관계형 쿼리 (include, select)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-gray-700">필터링, 정렬, 페이지네이션</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-gray-700">집계 및 groupBy</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-gray-700">트랜잭션 처리</span>
            </li>
          </ul>
          <Link
            href="/prisma-queries"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            예제 보기 →
          </Link>
        </div>

        {/* Native Queries Card */}
        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold ml-4 text-gray-900">Native 쿼리 (SQL)</h2>
          </div>
          <p className="text-gray-600 mb-6">
            PostgreSQL의 강력한 기능을 활용한 고급 SQL 쿼리 및 최적화
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">✓</span>
              <span className="text-gray-700">복잡한 JOIN 쿼리</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">✓</span>
              <span className="text-gray-700">Window 함수 (ROW_NUMBER, RANK, LAG, LEAD)</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">✓</span>
              <span className="text-gray-700">GROUP BY, HAVING, 고급 집계</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">✓</span>
              <span className="text-gray-700">JSONB 연산 및 배열 처리</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">✓</span>
              <span className="text-gray-700">CTE 및 복잡한 통계 쿼리</span>
            </li>
          </ul>
          <Link
            href="/native-queries"
            className="inline-flex items-center text-gray-800 hover:text-gray-900 font-semibold"
          >
            예제 보기 →
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">이 애플리케이션의 목표</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">📚 학습 참조</h3>
            <p className="text-gray-600">
              Prisma 일반 쿼리와 Native 쿼리의 사용법을 실제 예제와 함께 학습하고 참조할 수 있습니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">🎯 선택 기준</h3>
            <p className="text-gray-600">
              상황에 따라 어떤 쿼리 방식을 선택해야 하는지 명확한 가이드라인을 제공합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">💡 실무 팁</h3>
            <p className="text-gray-600">
              SQL 인젝션 방어, 성능 최적화, 트랜잭션 처리 등 실무에서 필요한 핵심 팁을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">사용 기술</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold">Next.js 16</span>
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold">TypeScript</span>
          <span className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold">Prisma ORM</span>
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold">PostgreSQL</span>
          <span className="bg-cyan-500 text-white px-6 py-2 rounded-full font-semibold">Tailwind CSS</span>
          <span className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold">Docker</span>
        </div>
      </section>
    </div>
  );
}
