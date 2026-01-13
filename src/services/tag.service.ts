import { prisma } from '@/lib/prisma';
import { CreateTagDto } from '@/types/dto';

/**
 * Tag Service
 *
 * 태그 관리를 위한 서비스 레이어
 * - N:M (Many-to-Many) 관계 처리
 * - 조인 테이블 (PostTag) 관리
 * - 태그 연결/해제 작업
 */
export const tagService = {
  /**
   * 모든 태그 조회 (사용 횟수 포함)
   *
   * @returns 태그 목록 (알파벳 순 정렬)
   *
   * @example
   * const tags = await tagService.findAll();
   * // 결과: [
   * //   { id: 1, name: "TypeScript", _count: { postTags: 15 } },
   * //   { id: 2, name: "Database", _count: { postTags: 8 } }
   * // ]
   */
  async findAll() {
    return await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            postTags: true, // 이 태그가 사용된 횟수
          },
        },
      },
    });
  },

  /**
   * 특정 태그 상세 조회 (연결된 게시글 목록 포함)
   *
   * @param id - 태그 ID
   * @returns 태그 정보 + 이 태그를 사용하는 게시글 목록
   *
   * @example
   * const tag = await tagService.findById(1);
   * // 결과: {
   * //   id: 1,
   * //   name: "TypeScript",
   * //   postTags: [
   * //     {
   * //       postId: 1,
   * //       tagId: 1,
   * //       post: {
   * //         id: 1,
   * //         title: "Prisma 가이드",
   * //         author: { name: "홍길동" }
   * //       }
   * //     },
   * //     {
   * //       postId: 5,
   * //       tagId: 1,
   * //       post: {
   * //         id: 5,
   * //         title: "Next.js 튜토리얼",
   * //         author: { name: "김철수" }
   * //       }
   * //     }
   * //   ]
   * // }
   */
  async findById(id: number) {
    return await prisma.tag.findUnique({
      where: { id },
      include: {
        postTags: {
          include: {
            post: {
              select: {
                id: true,
                title: true,
                published: true,
                author: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  /**
   * 태그 이름으로 검색
   *
   * @param name - 태그 이름
   * @returns 일치하는 태그
   *
   * @example
   * const tag = await tagService.findByName("TypeScript");
   * // 결과: { id: 1, name: "TypeScript" }
   */
  async findByName(name: string) {
    return await prisma.tag.findUnique({
      where: { name },
      include: {
        _count: {
          select: {
            postTags: true,
          },
        },
      },
    });
  },

  /**
   * 새 태그 생성
   *
   * @param data - 태그 데이터 (name)
   * @returns 생성된 태그
   *
   * @example
   * const newTag = await tagService.create({ name: "React" });
   */
  async create(data: CreateTagDto) {
    return await prisma.tag.create({
      data,
    });
  },

  /**
   * 태그 이름 수정
   *
   * @param id - 태그 ID
   * @param name - 새 이름
   * @returns 수정된 태그
   *
   * @example
   * const updated = await tagService.update(1, "TypeScript v5");
   */
  async update(id: number, name: string) {
    return await prisma.tag.update({
      where: { id },
      data: { name },
    });
  },

  /**
   * 태그 삭제
   *
   * ⚠️ 주의: onDelete: Cascade로 인해 PostTag 레코드도 자동 삭제됩니다.
   * (게시글 자체는 삭제되지 않고, 연결만 끊어짐)
   *
   * @param id - 태그 ID
   * @returns 삭제된 태그
   *
   * @example
   * await tagService.delete(1);
   * // Tag ID 1 삭제 → PostTag의 tagId=1인 레코드들 자동 삭제
   * // Post는 삭제되지 않음!
   */
  async delete(id: number) {
    return await prisma.tag.delete({
      where: { id },
    });
  },

  // ==================== 다대다 관계 관리 ====================

  /**
   * 게시글에 태그 연결 (Many-to-Many)
   *
   * @param tagId - 태그 ID
   * @param postId - 게시글 ID
   * @returns 생성된 PostTag 레코드
   *
   * @example
   * // Post ID 1에 Tag ID 3을 연결
   * await tagService.attachToPost(3, 1);
   *
   * // 실제 SQL: INSERT INTO PostTag (postId, tagId) VALUES (1, 3)
   */
  async attachToPost(tagId: number, postId: number) {
    return await prisma.postTag.create({
      data: {
        tagId,
        postId,
      },
      include: {
        tag: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  },

  /**
   * 게시글에서 태그 제거 (Many-to-Many)
   *
   * @param tagId - 태그 ID
   * @param postId - 게시글 ID
   * @returns 삭제된 PostTag 레코드
   *
   * @example
   * // Post ID 1에서 Tag ID 3을 제거
   * await tagService.detachFromPost(3, 1);
   *
   * // 실제 SQL: DELETE FROM PostTag WHERE postId = 1 AND tagId = 3
   */
  async detachFromPost(tagId: number, postId: number) {
    return await prisma.postTag.delete({
      where: {
        postId_tagId: {
          // 복합 키 사용
          postId,
          tagId,
        },
      },
    });
  },

  /**
   * 게시글의 모든 태그 조회
   *
   * @param postId - 게시글 ID
   * @returns 게시글에 연결된 태그 목록
   *
   * @example
   * const tags = await tagService.findByPostId(1);
   * // 결과: [
   * //   { id: 1, name: "TypeScript" },
   * //   { id: 2, name: "Database" }
   * // ]
   */
  async findByPostId(postId: number) {
    const postTags = await prisma.postTag.findMany({
      where: { postId },
      include: {
        tag: true,
      },
    });

    return postTags.map((pt) => pt.tag);
  },

  /**
   * 게시글의 모든 태그 한 번에 설정 (기존 태그는 모두 제거)
   *
   * @param postId - 게시글 ID
   * @param tagIds - 새로 연결할 태그 ID 배열
   * @returns 업데이트된 Post (tags 포함)
   *
   * @example
   * // Post ID 1의 태그를 [1, 2, 3]으로 설정
   * await tagService.setPostTags(1, [1, 2, 3]);
   *
   * // 기존 태그가 [1, 5, 7]이었다면:
   * // - Tag 5, 7은 제거됨
   * // - Tag 2, 3이 새로 추가됨
   * // - Tag 1은 유지됨
   */
  async setPostTags(postId: number, tagIds: number[]) {
    // Transaction 사용: 기존 태그 삭제 + 새 태그 추가
    return await prisma.$transaction(async (tx) => {
      // 1. 기존 PostTag 레코드 모두 삭제
      await tx.postTag.deleteMany({
        where: { postId },
      });

      // 2. 새 PostTag 레코드 생성
      if (tagIds.length > 0) {
        await tx.postTag.createMany({
          data: tagIds.map((tagId) => ({
            postId,
            tagId,
          })),
        });
      }

      // 3. 업데이트된 Post 반환
      return await tx.post.findUnique({
        where: { id: postId },
        include: {
          postTags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  },
};
