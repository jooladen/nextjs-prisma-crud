'use client';

import { useState } from 'react';
import { ApiResponse } from '@/types/api-responses';

export default function PrismaQueriesPage() {
  const [usersData, setUsersData] = useState<any>(null);
  const [postsData, setPostsData] = useState<any>(null);
  const [loading, setLoading] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 사용자 폼 상태
  const [newUser, setNewUser] = useState({ email: '', name: '' });

  // 게시글 폼 상태
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    published: true,
    authorId: '',
    categoryId: '',
  });

  // 게시글 필터 상태
  const [postFilters, setPostFilters] = useState({
    page: '1',
    limit: '10',
    published: '',
    authorId: '',
    categoryId: '',
    search: '',
  });

  // 사용자 전체 조회
  const fetchUsers = async () => {
    setLoading('users');
    setError('');
    try {
      const response = await fetch('/api/prisma/users');
      const data: ApiResponse = await response.json();
      setUsersData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  // 사용자 생성
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('create-user');
    setError('');
    try {
      const response = await fetch('/api/prisma/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data: ApiResponse = await response.json();
      if (data.success) {
        alert('사용자가 생성되었습니다!');
        setNewUser({ email: '', name: '' });
        fetchUsers(); // 목록 새로고침
      } else {
        setError(data.error || '사용자 생성 실패');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  // 게시글 조회 (필터 적용)
  const fetchPosts = async () => {
    setLoading('posts');
    setError('');
    try {
      const params = new URLSearchParams();
      Object.entries(postFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`/api/prisma/posts?${params.toString()}`);
      const data: ApiResponse = await response.json();
      setPostsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  // 게시글 생성
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('create-post');
    setError('');
    try {
      const response = await fetch('/api/prisma/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPost,
          authorId: parseInt(newPost.authorId),
          categoryId: parseInt(newPost.categoryId),
        }),
      });
      const data: ApiResponse = await response.json();
      if (data.success) {
        alert('게시글이 생성되었습니다!');
        setNewPost({
          title: '',
          content: '',
          published: true,
          authorId: '',
          categoryId: '',
        });
        fetchPosts(); // 목록 새로고침
      } else {
        setError(data.error || '게시글 생성 실패');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Prisma 쿼리 예제</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* 사용자(Users) 섹션 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">사용자 관리 (Users)</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 사용자 조회 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">사용자 전체 조회</h3>
            <button
              onClick={fetchUsers}
              disabled={loading === 'users'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading === 'users' ? '조회 중...' : '사용자 조회'}
            </button>

            {usersData && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  결과: {usersData.success ? '성공' : '실패'}
                </p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(usersData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* 사용자 생성 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">사용자 생성</h3>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="홍길동"
                />
              </div>
              <button
                type="submit"
                disabled={loading === 'create-user'}
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                {loading === 'create-user' ? '생성 중...' : '사용자 생성'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 게시글(Posts) 섹션 */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">게시글 관리 (Posts)</h2>

        {/* 게시글 조회 및 필터링 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">게시글 조회 (필터링)</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">페이지</label>
              <input
                type="number"
                value={postFilters.page}
                onChange={(e) => setPostFilters({ ...postFilters, page: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">페이지당 개수</label>
              <input
                type="number"
                value={postFilters.limit}
                onChange={(e) => setPostFilters({ ...postFilters, limit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">게시 여부</label>
              <select
                value={postFilters.published}
                onChange={(e) => setPostFilters({ ...postFilters, published: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">전체</option>
                <option value="true">게시됨</option>
                <option value="false">미게시</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">작성자 ID</label>
              <input
                type="number"
                value={postFilters.authorId}
                onChange={(e) => setPostFilters({ ...postFilters, authorId: e.target.value })}
                placeholder="전체"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 ID</label>
              <input
                type="number"
                value={postFilters.categoryId}
                onChange={(e) => setPostFilters({ ...postFilters, categoryId: e.target.value })}
                placeholder="전체"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색어</label>
              <input
                type="text"
                value={postFilters.search}
                onChange={(e) => setPostFilters({ ...postFilters, search: e.target.value })}
                placeholder="제목/내용 검색"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            onClick={fetchPosts}
            disabled={loading === 'posts'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading === 'posts' ? '조회 중...' : '게시글 조회'}
          </button>

          {postsData && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                결과: {postsData.success ? '성공' : '실패'}
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(postsData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 게시글 생성 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">게시글 생성</h3>
          <form onSubmit={createPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="게시글 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="게시글 내용"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">작성자 ID</label>
                <input
                  type="number"
                  value={newPost.authorId}
                  onChange={(e) => setNewPost({ ...newPost, authorId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 ID</label>
                <input
                  type="number"
                  value={newPost.categoryId}
                  onChange={(e) => setNewPost({ ...newPost, categoryId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">게시 여부</label>
                <select
                  value={newPost.published.toString()}
                  onChange={(e) =>
                    setNewPost({ ...newPost, published: e.target.value === 'true' })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="true">게시</option>
                  <option value="false">미게시</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading === 'create-post'}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {loading === 'create-post' ? '생성 중...' : '게시글 생성'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
