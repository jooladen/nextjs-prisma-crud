import { prisma } from '@/lib/prisma';
import { CreateCommentDto } from '@/types/dto';

/**
 * Comment Service
 *
 * 댓글/대댓글 관리를 위한 서비스 레이어
 * - 자기참조 관계 (Self-Referential) 처리
 * - 계층적 댓글 구조 (Comment → Replies)
 * - Cascade Delete로 대댓글 자동 삭제
 */
export const commentService = {
  /**
   * 특정 게시글의 최상위 댓글 조회 (대댓글 포함)
   *
   * @param postId - 게시글 ID
   * @returns 최상위 댓글 목록 (각 댓글의 대댓글 포함)
   *
   * @example
   * const comments = await commentService.findByPostId(1);
   * // 결과: [
   * //   {
   * //     id: 1,
   * //     content: "좋은 글이네요!",
   * //     parentId: null,  // 최상위 댓글
   * //     author: { id: 2, name: "김철수" },
   * //     replies: [
   * //       {
   * //         id: 2,
   * //         content: "감사합니다!",
   * //         parentId: 1,  // Comment 1의 대댓글
   * //         author: { id: 1, name: "홍길동" }
   * //       }
   * //     ]
   * //   }
   * // ]
   */
  async findByPostId(postId: number) {
    return await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // 최상위 댓글만 조회 (parentId가 null)
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        replies: {
          // 대댓글들 포함
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' }, // 대댓글은 오래된 순
        },
      },
      orderBy: { createdAt: 'desc' }, // 최상위 댓글은 최신순
    });
  },

  /**
   * 모든 댓글 조회 (평평한 구조)
   *
   * @returns 모든 댓글 목록 (계층 구조 없이 평평하게)
   *
   * @example
   * const allComments = await commentService.findAll();
   * // 결과: [
   * //   { id: 1, content: "...", parentId: null },
   * //   { id: 2, content: "...", parentId: 1 },
   * //   { id: 3, content: "...", parentId: 1 }
   * // ]
   */
  async findAll() {
    return await prisma.comment.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * 특정 댓글 상세 조회 (대댓글 포함)
   *
   * @param id - 댓글 ID
   * @returns 댓글 정보 + 대댓글 목록
   *
   * @example
   * const comment = await commentService.findById(1);
   * // 결과: {
   * //   id: 1,
   * //   content: "좋은 글이네요!",
   * //   replies: [
   * //     { id: 2, content: "감사합니다!" },
   * //     { id: 3, content: "저도요!" }
   * //   ]
   * // }
   */
  async findById(id: number) {
    return await prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  },

  /**
   * 새 댓글 또는 대댓글 작성
   *
   * @param data - 댓글 데이터 (content, postId, authorId, parentId?)
   * @returns 생성된 댓글 (작성자 정보 포함)
   *
   * @example
   * // 최상위 댓글 작성
   * const comment = await commentService.create({
   *   content: "좋은 글이네요!",
   *   postId: 1,
   *   authorId: 2,
   *   parentId: null  // 또는 생략
   * });
   *
   * @example
   * // 대댓글 작성
   * const reply = await commentService.create({
   *   content: "감사합니다!",
   *   postId: 1,
   *   authorId: 1,
   *   parentId: 1  // Comment 1에 대한 대댓글
   * });
   */
  async create(data: CreateCommentDto) {
    return await prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  /**
   * 댓글 내용 수정
   *
   * @param id - 댓글 ID
   * @param content - 수정할 내용
   * @returns 수정된 댓글
   *
   * @example
   * const updated = await commentService.update(1, "수정된 내용입니다.");
   */
  async update(id: number, content: string) {
    return await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  /**
   * 댓글 삭제
   *
   * ⚠️ 주의: onDelete: Cascade로 인해 이 댓글의 모든 대댓글도 함께 삭제됩니다!
   *
   * @param id - 댓글 ID
   * @returns 삭제된 댓글
   *
   * @example
   * await commentService.delete(1);
   * // Comment 1과 그 아래 모든 replies (Comment 2, 3, 5 등)가 삭제됨
   *
   * // 예시 계층 구조:
   * // Comment 1 (삭제 대상)
   * //   ├── Comment 2 (자동 삭제)
   * //   │   └── Comment 5 (자동 삭제)
   * //   └── Comment 3 (자동 삭제)
   * // Comment 4 (영향 없음)
   */
  async delete(id: number) {
    return await prisma.comment.delete({
      where: { id },
    });
  },

  /**
   * 사용자가 작성한 모든 댓글 조회
   *
   * @param authorId - 사용자 ID
   * @returns 사용자의 댓글 목록
   *
   * @example
   * const userComments = await commentService.findByAuthorId(1);
   */
  async findByAuthorId(authorId: number) {
    return await prisma.comment.findMany({
      where: { authorId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};
