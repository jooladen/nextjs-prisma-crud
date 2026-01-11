import { prisma } from '@/lib/prisma';
import { CreatePostDto, UpdatePostDto, PostFilterDto } from '@/types/dto';

export const postService = {
  // 전체 게시글 조회 (필터링, 페이지네이션)
  async findAll(filter?: PostFilterDto, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter?.published !== undefined) {
      where.published = filter.published;
    }

    if (filter?.authorId) {
      where.authorId = filter.authorId;
    }

    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { content: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // 단일 게시글 조회 (관계 포함)
  async findById(id: number) {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        comments: {
          include: {
            author: { select: { id: true, name: true } },
            replies: {
              include: {
                author: { select: { id: true, name: true } },
              },
            },
          },
          where: { parentId: null }, // 최상위 댓글만
          orderBy: { createdAt: 'desc' },
        },
        postTags: {
          include: {
            tag: true,
          },
        },
        metadata: true,
      },
    });
  },

  // 게시글 생성
  async create(data: CreatePostDto) {
    return await prisma.post.create({
      data,
      include: {
        author: true,
        category: true,
      },
    });
  },

  // 게시글 수정
  async update(id: number, data: UpdatePostDto) {
    return await prisma.post.update({
      where: { id },
      data,
      include: {
        author: true,
        category: true,
      },
    });
  },

  // 게시글 삭제
  async delete(id: number) {
    return await prisma.post.delete({
      where: { id },
    });
  },

  // 조회수 증가
  async incrementViewCount(id: number) {
    return await prisma.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  },
};
