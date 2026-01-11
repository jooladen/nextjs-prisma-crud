import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const nativeQueryService = {
  // JOIN 예제: 게시글 + 작성자 + 카테고리 + 댓글 수
  async getPostsWithDetails() {
    return await prisma.$queryRaw<any[]>`
      SELECT
        p.id,
        p.title,
        p.content,
        p.published,
        p."viewCount" as view_count,
        p."createdAt" as created_at,
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
      LIMIT 10
    `;
  },

  // GROUP BY 예제: 카테고리별 게시글 통계
  async getPostsPerCategory() {
    return await prisma.$queryRaw<any[]>`
      SELECT
        c.id as category_id,
        c.name as category_name,
        COUNT(p.id)::INTEGER as post_count,
        COALESCE(SUM(p."viewCount"), 0)::INTEGER as total_views,
        COALESCE(AVG(p."viewCount"), 0)::INTEGER as avg_views
      FROM "Category" c
      LEFT JOIN "Post" p ON c.id = p."categoryId"
      GROUP BY c.id, c.name
      HAVING COUNT(p.id) > 0
      ORDER BY post_count DESC
    `;
  },

  // Window 함수 예제: 게시글 조회수 순위
  async getPostRankings() {
    return await prisma.$queryRaw<any[]>`
      SELECT
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
      WHERE p.published = true
      LIMIT 20
    `;
  },

  // Window 함수 예제: 카테고리별 순위
  async getCategoryPostRankings() {
    return await prisma.$queryRaw<any[]>`
      SELECT
        p.id,
        p.title,
        c.name as category_name,
        p."viewCount" as view_count,
        p."createdAt" as created_at,
        RANK() OVER (PARTITION BY c.id ORDER BY p."viewCount" DESC)::INTEGER as rank_in_category
      FROM "Post" p
      INNER JOIN "Category" c ON p."categoryId" = c.id
      WHERE p.published = true
      ORDER BY c.name, rank_in_category
      LIMIT 50
    `;
  },

  // LAG/LEAD 예제: 이전/다음 게시글
  async getPostsWithPreviousNext() {
    return await prisma.$queryRaw<any[]>`
      SELECT
        p.id,
        p.title,
        p."createdAt" as created_at,
        LAG(p.id) OVER (ORDER BY p."createdAt") as previous_post_id,
        LAG(p.title) OVER (ORDER BY p."createdAt") as previous_post_title,
        LEAD(p.id) OVER (ORDER BY p."createdAt") as next_post_id,
        LEAD(p.title) OVER (ORDER BY p."createdAt") as next_post_title
      FROM "Post" p
      WHERE p.published = true
      ORDER BY p."createdAt" DESC
      LIMIT 10
    `;
  },

  // JSONB 쿼리 예제: 메타데이터 조회
  async getPostsWithMetadata() {
    return await prisma.$queryRaw<any[]>`
      SELECT
        p.id,
        p.title,
        pm.metadata->>'readingTime' as reading_time,
        (pm.metadata->'featured')::boolean as featured,
        pm.metadata->'seo'->>'title' as seo_title,
        pm.keywords
      FROM "Post" p
      INNER JOIN "PostMetadata" pm ON p.id = pm."postId"
      WHERE pm.metadata->>'featured' = 'true'
      LIMIT 10
    `;
  },

  // 배열 쿼리 예제: 키워드 검색
  async searchPostsByKeyword(keyword: string) {
    return await prisma.$queryRaw<any[]>`
      SELECT
        p.id,
        p.title,
        pm.keywords
      FROM "Post" p
      INNER JOIN "PostMetadata" pm ON p.id = pm."postId"
      WHERE ${keyword} = ANY(pm.keywords)
      LIMIT 10
    `;
  },

  // 트랜잭션 예제: 사용자와 게시글 동시 생성
  async createUserWithPost(userEmail: string, userName: string, postTitle: string, postContent: string, categoryId: number) {
    return await prisma.$transaction(async (tx) => {
      // 1. 사용자 생성
      const user = await tx.user.create({
        data: {
          email: userEmail,
          name: userName,
        },
      });

      // 2. 게시글 생성
      const post = await tx.post.create({
        data: {
          title: postTitle,
          content: postContent,
          published: false,
          authorId: user.id,
          categoryId: categoryId,
        },
      });

      return { user, post };
    });
  },

  // 복잡한 통계 쿼리: 대시보드 통계
  async getDashboardStats() {
    return await prisma.$queryRaw<any[]>`
      WITH stats AS (
        SELECT
          (SELECT COUNT(*)::INTEGER FROM "User") as total_users,
          (SELECT COUNT(*)::INTEGER FROM "Post") as total_posts,
          (SELECT COUNT(*)::INTEGER FROM "Comment") as total_comments,
          (SELECT COUNT(*)::INTEGER FROM "Post" WHERE published = true) as published_posts
      )
      SELECT
        stats.*,
        (SELECT AVG(comment_count)::NUMERIC(10,2)
         FROM (
           SELECT COUNT(c.id)::INTEGER as comment_count
           FROM "Post" p
           LEFT JOIN "Comment" c ON p.id = c."postId"
           GROUP BY p.id
         ) sub
        ) as avg_comments_per_post,
        (SELECT c.name
         FROM "Category" c
         INNER JOIN "Post" p ON c.id = p."categoryId"
         GROUP BY c.id, c.name
         ORDER BY COUNT(p.id) DESC
         LIMIT 1
        ) as most_active_category,
        (SELECT p.title
         FROM "Post" p
         ORDER BY p."viewCount" DESC
         LIMIT 1
        ) as most_viewed_post_title
      FROM stats
    `;
  },
};
