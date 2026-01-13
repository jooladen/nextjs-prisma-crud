import { prisma } from '@/lib/prisma';
import { CreateCategoryDto } from '@/types/dto';

/**
 * Category Service
 *
 * 카테고리 관리를 위한 서비스 레이어
 * - 카테고리 CRUD 작업
 * - 카테고리별 게시글 조회
 * - 1:N 관계 (Category → Post) 처리
 */
export const categoryService = {
  /**
   * 모든 카테고리 조회 (게시글 개수 포함)
   *
   * @returns 카테고리 목록 (알파벳 순 정렬)
   *
   * @example
   * const categories = await categoryService.findAll();
   * // 결과: [
   * //   { id: 1, name: "개발", description: "...", _count: { posts: 15 } },
   * //   { id: 2, name: "디자인", description: "...", _count: { posts: 8 } }
   * // ]
   */
  async findAll() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            posts: true, // 각 카테고리의 게시글 개수
          },
        },
      },
    });
  },

  /**
   * 특정 카테고리 상세 조회 (게시글 목록 포함)
   *
   * @param id - 카테고리 ID
   * @returns 카테고리 정보 + 게시글 목록
   *
   * @example
   * const category = await categoryService.findById(1);
   * // 결과: {
   * //   id: 1,
   * //   name: "개발",
   * //   posts: [
   * //     { id: 1, title: "Prisma 가이드", published: true, viewCount: 150 },
   * //     { id: 2, title: "Next.js 튜토리얼", published: true, viewCount: 200 }
   * //   ]
   * // }
   */
  async findById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
            viewCount: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  /**
   * 새 카테고리 생성
   *
   * @param data - 카테고리 생성 데이터 (name, description)
   * @returns 생성된 카테고리
   *
   * @example
   * const newCategory = await categoryService.create({
   *   name: "라이프스타일",
   *   description: "일상과 취미 관련 글"
   * });
   */
  async create(data: CreateCategoryDto) {
    return await prisma.category.create({
      data,
    });
  },

  /**
   * 카테고리 정보 수정
   *
   * @param id - 카테고리 ID
   * @param data - 수정할 데이터 (name, description)
   * @returns 수정된 카테고리
   *
   * @example
   * const updated = await categoryService.update(1, {
   *   description: "업데이트된 설명"
   * });
   */
  async update(id: number, data: Partial<CreateCategoryDto>) {
    return await prisma.category.update({
      where: { id },
      data,
    });
  },

  /**
   * 카테고리 삭제
   *
   * ⚠️ 주의: onDelete: Cascade로 인해 이 카테고리의 모든 게시글도 삭제됩니다!
   *
   * @param id - 카테고리 ID
   * @returns 삭제된 카테고리
   *
   * @example
   * await categoryService.delete(1);
   * // 카테고리 ID 1과 그 카테고리의 모든 Post가 삭제됨
   */
  async delete(id: number) {
    return await prisma.category.delete({
      where: { id },
    });
  },
};
