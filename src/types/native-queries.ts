// Native 쿼리 결과 타입 정의

// JOIN 쿼리 결과 타입
export interface PostWithAuthorResult {
  id: number;
  title: string;
  content: string;
  published: boolean;
  view_count: number;
  author_id: number;
  author_name: string;
  author_email: string;
  category_id: number;
  category_name: string;
  created_at: Date;
}

export interface PostWithCommentCountResult {
  id: number;
  title: string;
  author_name: string;
  category_name: string;
  comment_count: bigint;
  view_count: number;
  created_at: Date;
}

// 집계 쿼리 결과 타입
export interface PostsPerCategoryResult {
  category_id: number;
  category_name: string;
  post_count: bigint;
  total_views: bigint;
  avg_views: number;
}

export interface UserActivityResult {
  user_id: number;
  user_name: string;
  post_count: bigint;
  comment_count: bigint;
  total_post_views: bigint;
}

// 윈도우 함수 결과 타입
export interface PostRankingResult {
  id: number;
  title: string;
  view_count: number;
  author_name: string;
  rank: bigint;
  dense_rank: bigint;
  row_number: bigint;
}

export interface PostWithPreviousNextResult {
  id: number;
  title: string;
  created_at: Date;
  previous_post_id: number | null;
  previous_post_title: string | null;
  next_post_id: number | null;
  next_post_title: string | null;
}

export interface CategoryPostRankingResult {
  id: number;
  title: string;
  category_name: string;
  view_count: number;
  rank_in_category: bigint;
  created_at: Date;
}

// JSONB 쿼리 결과 타입
export interface PostWithMetadataResult {
  id: number;
  title: string;
  reading_time: number;
  featured: boolean;
  seo_title: string;
  keywords: string[];
}

// 트랜잭션 결과 타입
export interface TransactionResult {
  success: boolean;
  created_user_id?: number;
  created_post_id?: number;
  message: string;
}

// 복잡한 통계 쿼리 결과 타입
export interface DashboardStatsResult {
  total_users: bigint;
  total_posts: bigint;
  total_comments: bigint;
  published_posts: bigint;
  avg_comments_per_post: number;
  most_active_category: string;
  most_viewed_post_title: string;
}
