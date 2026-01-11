// Data Transfer Objects (DTO) 타입 정의

// User DTO
export interface CreateUserDto {
  email: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Post DTO
export interface CreatePostDto {
  title: string;
  content: string;
  published?: boolean;
  authorId: number;
  categoryId: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
  categoryId?: number;
}

export interface PostDto {
  id: number;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  authorId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Category DTO
export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
}

// Comment DTO
export interface CreateCommentDto {
  content: string;
  postId: number;
  authorId: number;
  parentId?: number;
}

export interface CommentDto {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Tag DTO
export interface CreateTagDto {
  name: string;
}

export interface TagDto {
  id: number;
  name: string;
  createdAt: Date;
}

// Pagination DTO
export interface PaginationDto {
  page?: number;
  limit?: number;
}

// Filter DTO
export interface PostFilterDto {
  published?: boolean;
  authorId?: number;
  categoryId?: number;
  search?: string;
}
