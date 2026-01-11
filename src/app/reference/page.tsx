export default function ReferencePage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">참조 가이드</h1>

      {/* Prisma vs Native 쿼리 비교 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Prisma vs Native SQL 쿼리</h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">구분</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">
                  Prisma Client
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">
                  Native SQL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">타입 안전성</td>
                <td className="px-6 py-4 text-green-600">✓ 완벽한 타입 추론</td>
                <td className="px-6 py-4 text-yellow-600">△ 수동 타입 정의 필요</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">개발 속도</td>
                <td className="px-6 py-4 text-green-600">✓ 빠름 (자동완성)</td>
                <td className="px-6 py-4 text-yellow-600">△ 보통 (SQL 작성)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">복잡한 쿼리</td>
                <td className="px-6 py-4 text-yellow-600">△ 제한적</td>
                <td className="px-6 py-4 text-green-600">✓ 모든 기능 사용 가능</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">성능 최적화</td>
                <td className="px-6 py-4 text-yellow-600">△ 자동 최적화</td>
                <td className="px-6 py-4 text-green-600">✓ 수동 최적화 가능</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">유지보수</td>
                <td className="px-6 py-4 text-green-600">✓ 쉬움</td>
                <td className="px-6 py-4 text-yellow-600">△ SQL 지식 필요</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">마이그레이션</td>
                <td className="px-6 py-4 text-green-600">✓ 자동 생성</td>
                <td className="px-6 py-4 text-red-600">✗ 수동 작성</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 언제 무엇을 사용할까? */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">언제 무엇을 사용할까?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Prisma를 사용해야 할 때 */}
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-blue-900">
              ✓ Prisma Client를 사용하세요
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>기본적인 CRUD 작업</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>간단한 필터링, 정렬, 페이지네이션</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>관계형 데이터 조회 (include, select)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>타입 안전성이 중요한 경우</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>빠른 프로토타이핑</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>팀에 SQL 초보자가 많은 경우</span>
              </li>
            </ul>
          </div>

          {/* Native SQL을 사용해야 할 때 */}
          <div className="bg-gray-100 rounded-lg p-6 border-2 border-gray-300">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              ✓ Native SQL을 사용하세요
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>복잡한 JOIN 쿼리</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>Window 함수 (ROW_NUMBER, RANK, LAG, LEAD)</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>고급 집계 및 통계 쿼리</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>CTE (Common Table Expressions)</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>성능 최적화가 중요한 경우</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>PostgreSQL 특화 기능 (JSONB, 배열 등)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* API 엔드포인트 문서 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">API 엔드포인트</h2>

        {/* Prisma API */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Prisma API</h3>

          <div className="space-y-4">
            {/* Users API */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  GET
                </span>
                <code className="text-gray-800 font-mono">/api/prisma/users</code>
              </div>
              <p className="text-gray-600 mb-2">전체 사용자 목록 조회</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700">
                  <strong>응답:</strong> 사용자 배열
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  POST
                </span>
                <code className="text-gray-800 font-mono">/api/prisma/users</code>
              </div>
              <p className="text-gray-600 mb-2">새 사용자 생성</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>요청 Body:</strong>
                </p>
                <pre className="text-xs bg-gray-800 text-gray-100 p-2 rounded">
                  {`{
  "email": "user@example.com",
  "name": "홍길동"
}`}
                </pre>
              </div>
            </div>

            {/* Posts API */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  GET
                </span>
                <code className="text-gray-800 font-mono">/api/prisma/posts</code>
              </div>
              <p className="text-gray-600 mb-2">게시글 목록 조회 (필터링, 페이지네이션)</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Query Parameters:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• page: 페이지 번호 (기본값: 1)</li>
                  <li>• limit: 페이지당 개수 (기본값: 10)</li>
                  <li>• published: true/false (게시 여부)</li>
                  <li>• authorId: 작성자 ID</li>
                  <li>• categoryId: 카테고리 ID</li>
                  <li>• search: 검색어 (제목/내용)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  POST
                </span>
                <code className="text-gray-800 font-mono">/api/prisma/posts</code>
              </div>
              <p className="text-gray-600 mb-2">새 게시글 생성</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>요청 Body:</strong>
                </p>
                <pre className="text-xs bg-gray-800 text-gray-100 p-2 rounded">
                  {`{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "published": true,
  "authorId": 1,
  "categoryId": 1
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Native SQL API */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Native SQL API</h3>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  GET
                </span>
                <code className="text-gray-800 font-mono">/api/native/aggregations</code>
              </div>
              <p className="text-gray-600 mb-2">카테고리별 게시글 통계 (GROUP BY 집계)</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  GET
                </span>
                <code className="text-gray-800 font-mono">/api/native/joins</code>
              </div>
              <p className="text-gray-600 mb-2">
                게시글 + 작성자 + 카테고리 + 댓글 수 조회 (JOIN)
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-mono text-sm mr-3">
                  GET
                </span>
                <code className="text-gray-800 font-mono">/api/native/window</code>
              </div>
              <p className="text-gray-600 mb-2">
                조회수 기준 게시글 순위 (Window 함수)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 코드 예제 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">코드 예제</h2>

        <div className="space-y-6">
          {/* Prisma 예제 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Prisma Client 예제</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto">
              {`// 관계형 데이터 조회
const posts = await prisma.post.findMany({
  where: {
    published: true,
    categoryId: 1,
  },
  include: {
    author: true,
    category: true,
    comments: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 10,
  skip: 0,
});`}
            </pre>
          </div>

          {/* Native SQL 예제 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Native SQL 예제</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto">
              {`// Window 함수를 사용한 순위
const result = await prisma.$queryRaw\`
  SELECT
    p.id,
    p.title,
    p.view_count,
    RANK() OVER (ORDER BY p.view_count DESC) as rank
  FROM "Post" p
  ORDER BY p.view_count DESC
  LIMIT 10
\`;`}
            </pre>
          </div>
        </div>
      </section>

      {/* 보안 팁 */}
      <section className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
        <h2 className="text-2xl font-bold mb-4 text-red-900">🔒 보안 주의사항</h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-bold text-red-800 mb-1">SQL Injection 방어</h3>
            <p className="text-sm">
              Native SQL 사용 시 반드시 파라미터화된 쿼리나 Prisma의{' '}
              <code className="bg-red-100 px-1 rounded">$queryRaw</code> 사용
            </p>
            <pre className="bg-red-100 p-2 rounded text-xs mt-2">
              {`// ❌ 위험: SQL Injection 가능
await prisma.$queryRawUnsafe(\`SELECT * FROM User WHERE id = \${userId}\`);

// ✓ 안전: 파라미터화된 쿼리
await prisma.$queryRaw\`SELECT * FROM User WHERE id = \${userId}\`;`}
            </pre>
          </div>
          <div>
            <h3 className="font-bold text-red-800 mb-1">민감한 데이터 노출 방지</h3>
            <p className="text-sm">
              API 응답에서 비밀번호, 토큰 등 민감한 필드는 반드시 제외하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 성능 최적화 팁 */}
      <section className="bg-green-50 rounded-lg p-6 border-2 border-green-200 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-green-900">⚡ 성능 최적화 팁</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>
              <strong>인덱스 활용:</strong> WHERE, ORDER BY, JOIN에 사용되는 컬럼에 인덱스
              생성
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>
              <strong>SELECT 최소화:</strong> 필요한 컬럼만 조회 (Prisma select 사용)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>
              <strong>N+1 쿼리 방지:</strong> include 대신 관계형 쿼리 최적화
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>
              <strong>페이지네이션:</strong> 대량 데이터 조회 시 반드시 페이지네이션 적용
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>
              <strong>트랜잭션:</strong> 여러 쿼리를 하나의 트랜잭션으로 묶어 성능 향상
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
