// API 응답 공통 타입 정의

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryExampleResponse {
  title: string;
  description: string;
  code: string;
  sqlCode?: string; // Native 쿼리의 경우 SQL 코드
  result: unknown;
  explanation: string;
  whenToUse: string;
}
