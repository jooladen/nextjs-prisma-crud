'use client';

import { useState } from 'react';
import { ApiResponse } from '@/types/api-responses';

export default function NativeQueriesPage() {
  const [aggregationsData, setAggregationsData] = useState<any>(null);
  const [joinsData, setJoinsData] = useState<any>(null);
  const [windowData, setWindowData] = useState<any>(null);
  const [loading, setLoading] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Aggregations 쿼리
  const fetchAggregations = async () => {
    setLoading('aggregations');
    setError('');
    try {
      const response = await fetch('/api/native/aggregations');
      const data: ApiResponse = await response.json();
      setAggregationsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  // Joins 쿼리
  const fetchJoins = async () => {
    setLoading('joins');
    setError('');
    try {
      const response = await fetch('/api/native/joins');
      const data: ApiResponse = await response.json();
      setJoinsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  // Window 함수 쿼리
  const fetchWindow = async () => {
    setLoading('window');
    setError('');
    try {
      const response = await fetch('/api/native/window');
      const data: ApiResponse = await response.json();
      setWindowData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Native SQL 쿼리 예제</h1>
      <p className="text-gray-600 mb-8">
        PostgreSQL의 강력한 기능을 활용한 고급 SQL 쿼리 예제입니다.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Aggregations 섹션 */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            1. 집계 쿼리 (Aggregations)
          </h2>
          <p className="text-gray-600 mb-4">
            GROUP BY와 집계 함수를 사용하여 카테고리별 게시글 통계를 조회합니다.
          </p>

          {/* SQL 코드 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">SQL 쿼리:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto">
{`SELECT
  c.id as category_id,
  c.name as category_name,
  COUNT(p.id)::INTEGER as post_count,
  COALESCE(SUM(p."viewCount"), 0)::INTEGER as total_views,
  COALESCE(AVG(p."viewCount"), 0)::INTEGER as avg_views
FROM "Category" c
LEFT JOIN "Post" p ON c.id = p."categoryId"
GROUP BY c.id, c.name
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC`}
            </pre>
          </div>

          <button
            onClick={fetchAggregations}
            disabled={loading === 'aggregations'}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition"
          >
            {loading === 'aggregations' ? '조회 중...' : '집계 쿼리 실행'}
          </button>

          {aggregationsData && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                결과: {aggregationsData.success ? '성공' : '실패'}
              </p>
              {aggregationsData.success && aggregationsData.data ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">카테고리 ID</th>
                        <th className="px-4 py-2 border">카테고리 이름</th>
                        <th className="px-4 py-2 border">게시글 수</th>
                        <th className="px-4 py-2 border">총 조회수</th>
                        <th className="px-4 py-2 border">평균 조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aggregationsData.data.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border text-center">{row.category_id}</td>
                          <td className="px-4 py-2 border">{row.category_name}</td>
                          <td className="px-4 py-2 border text-center">{row.post_count}</td>
                          <td className="px-4 py-2 border text-center">{row.total_views}</td>
                          <td className="px-4 py-2 border text-center">{row.avg_views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(aggregationsData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Joins 섹션 */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">2. JOIN 쿼리</h2>
          <p className="text-gray-600 mb-4">
            여러 테이블을 조인하여 게시글, 작성자, 카테고리, 댓글 수를 함께 조회합니다.
          </p>

          {/* SQL 코드 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">SQL 쿼리:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto">
{`SELECT
  p.id, p.title, p.content, p.published,
  p."viewCount" as view_count, p."createdAt" as created_at,
  u.name as author_name,
  u.email as author_email,
  c.name as category_name,
  COUNT(cm.id)::INTEGER as comment_count
FROM "Post" p
INNER JOIN "User" u ON p."authorId" = u.id
INNER JOIN "Category" c ON p."categoryId" = c.id
LEFT JOIN "Comment" cm ON p.id = cm."postId"
GROUP BY p.id, u.name, u.email, c.name
ORDER BY p."createdAt" DESC
LIMIT 10`}
            </pre>
          </div>

          <button
            onClick={fetchJoins}
            disabled={loading === 'joins'}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition"
          >
            {loading === 'joins' ? '조회 중...' : 'JOIN 쿼리 실행'}
          </button>

          {joinsData && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                결과: {joinsData.success ? '성공' : '실패'}
              </p>
              {joinsData.success && joinsData.data ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 border">ID</th>
                        <th className="px-3 py-2 border">제목</th>
                        <th className="px-3 py-2 border">작성자</th>
                        <th className="px-3 py-2 border">카테고리</th>
                        <th className="px-3 py-2 border">조회수</th>
                        <th className="px-3 py-2 border">댓글수</th>
                        <th className="px-3 py-2 border">게시여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      {joinsData.data.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 border text-center">{row.id}</td>
                          <td className="px-3 py-2 border">{row.title}</td>
                          <td className="px-3 py-2 border">{row.author_name}</td>
                          <td className="px-3 py-2 border">{row.category_name}</td>
                          <td className="px-3 py-2 border text-center">{row.view_count}</td>
                          <td className="px-3 py-2 border text-center">{row.comment_count}</td>
                          <td className="px-3 py-2 border text-center">
                            {row.published ? '✓' : '✗'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(joinsData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Window 함수 섹션 */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            3. Window 함수 (ROW_NUMBER, RANK, DENSE_RANK)
          </h2>
          <p className="text-gray-600 mb-4">
            Window 함수를 사용하여 조회수 기준 게시글 순위를 매깁니다.
          </p>

          {/* SQL 코드 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">SQL 쿼리:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto">
{`SELECT
  p.id,
  p.title,
  p."viewCount" as view_count,
  u.name as author_name,
  c.name as category_name,
  ROW_NUMBER() OVER (ORDER BY p."viewCount" DESC)::INTEGER as row_number,
  RANK() OVER (ORDER BY p."viewCount" DESC)::INTEGER as rank,
  DENSE_RANK() OVER (ORDER BY p."viewCount" DESC)::INTEGER as dense_rank
FROM "Post" p
INNER JOIN "User" u ON p."authorId" = u.id
INNER JOIN "Category" c ON p."categoryId" = c.id
ORDER BY p."viewCount" DESC
LIMIT 20`}
            </pre>
          </div>

          <button
            onClick={fetchWindow}
            disabled={loading === 'window'}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition"
          >
            {loading === 'window' ? '조회 중...' : 'Window 함수 실행'}
          </button>

          {windowData && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                결과: {windowData.success ? '성공' : '실패'}
              </p>
              {windowData.success && windowData.data ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 border">ID</th>
                        <th className="px-3 py-2 border">제목</th>
                        <th className="px-3 py-2 border">작성자</th>
                        <th className="px-3 py-2 border">카테고리</th>
                        <th className="px-3 py-2 border">조회수</th>
                        <th className="px-3 py-2 border">ROW_NUMBER</th>
                        <th className="px-3 py-2 border">RANK</th>
                        <th className="px-3 py-2 border">DENSE_RANK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {windowData.data.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 border text-center">{row.id}</td>
                          <td className="px-3 py-2 border">{row.title}</td>
                          <td className="px-3 py-2 border">{row.author_name}</td>
                          <td className="px-3 py-2 border">{row.category_name}</td>
                          <td className="px-3 py-2 border text-center">{row.view_count}</td>
                          <td className="px-3 py-2 border text-center">{row.row_number}</td>
                          <td className="px-3 py-2 border text-center">{row.rank}</td>
                          <td className="px-3 py-2 border text-center">{row.dense_rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(windowData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 설명 섹션 */}
      <section className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">💡 Window 함수 차이점</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong className="text-blue-800">ROW_NUMBER():</strong> 중복 값이 있어도 고유한
            순번을 부여 (1, 2, 3, 4...)
          </p>
          <p>
            <strong className="text-blue-800">RANK():</strong> 중복 값에 동일 순위 부여 후
            건너뜀 (1, 2, 2, 4...)
          </p>
          <p>
            <strong className="text-blue-800">DENSE_RANK():</strong> 중복 값에 동일 순위
            부여, 건너뛰지 않음 (1, 2, 2, 3...)
          </p>
        </div>
      </section>
    </div>
  );
}
