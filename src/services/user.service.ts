import { prisma } from '@/lib/prisma';
import { CreateUserDto, UpdateUserDto } from '@/types/dto';

export const userService = {
  // 전체 사용자 조회
  async findAll() {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  // 단일 사용자 조회
  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
    });
  },

  // 사용자 생성
  async create(data: CreateUserDto) {
    return await prisma.user.create({
      data,
    });
  },

  // 사용자 수정
  async update(id: number, data: UpdateUserDto) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // 사용자 삭제
  async delete(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
