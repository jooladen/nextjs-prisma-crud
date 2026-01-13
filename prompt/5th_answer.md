  Wrote 1 lines to ..\..\..\.claude\plans\adaptive-waddling-porcupine.md
      1 # Prisma 교육용 레퍼런스 앱 확장 계획
      2 ## 📋 요구사항 요약
      3 사용자는 Next.js + Prisma CRUD 프로젝트를 Prisma 초보자를 위한 포괄적인 교육 자료로 확장하고자 합니다:
      4 1. **Include 상세 설명** - Prisma의 `include` 기능을 초보자가 이해하기 쉽게 단계별로 설명
      5 2. **테이블 관계 설명** - 7개 모델 간의 관계를 정확하고 명확하게 설명
      6 3. **API 라우팅 패턴** - Next.js App Router의 관행과 RESTful API 패턴 설명
      7 4. **쿼리 예제 확장** - 더 많은 Prisma 쿼리 샘플과 메뉴 추가 (복사-붙여넣기 가능)

● Perfect! I've created a comprehensive implementation plan that addresses all your requirements. Let me submit this plan for your review.

  ★ Insight ─────────────────────────────────────
  This plan transforms your CRUD app into a complete Prisma learning platform by focusing on three educational pillars:

  1. Conceptual Understanding: The Include and Relationships pages build foundational knowledge
  2. Practical Patterns: The API Patterns page teaches industry-standard practices
  3. Hands-on Examples: Expanded query samples with copy-paste ready code enable learning-by-doing

  The implementation prioritizes the hardest concepts (include, relationships) first, then expands with practical CRUD examples across all 7 models.
  ─────────────────────────────────────────────────


# Prisma 교육용 레퍼런스 앱 확장 계획

## 📋 요구사항 요약

사용자는 Next.js + Prisma CRUD 프로젝트를 Prisma 초보자를 위한 포괄적인 교육 자료로 확장하고자 합니다:

1. **Include 상세 설명** - Prisma의 `include` 기능을 초보자가 이해하기 쉽게 단계별로 설명
2. **테이블 관계 설명** - 7개 모델 간의 관계를 정확하고 명확하게 설명
3. **API 라우팅 패턴** - Next.js App Router의 관행과 RESTful API 패턴 설명
4. **쿼리 예제 확장** - 더 많은 Prisma 쿼리 샘플과 메뉴 추가 (복사-붙여넣기 가능)
5. **추가 제안** - 초보자에게 유용한 추가 학습 자료

## 🎯 구현 목표

- **교육적 가치**: 모든 예제는 초보자가 이해하고 복사-붙여넣기할 수 있어야 함
- **점진적 학습**: 간단한 예제부터 복잡한 예제까지 단계적 구성
- **실용성**: 실제 프로젝트에서 사용할 수 있는 패턴 제공
- **한국어 중심**: 한국 개발자를 위한 명확한 한국어 설명

---

## 📂 현재 프로젝트 상태

### Prisma 스키마 (7개 모델)
- **User** → Post (1:N), Comment (1:N)
- **Category** → Post (1:N)
- **Post** → User (N:1), Category (N:1), Comment (1:N), PostMetadata (1:1), Tag (N:M via PostTag)
- **Comment** → Post (N:1), User (N:1), 자기참조 (parent/replies)
- **Tag** ↔ Post (N:M via PostTag)
- **PostTag** (조인 테이블, 복합 PK)
- **PostMetadata** → Post (1:1, JSONB + array 필드)

### 기존 페이지
- `/` - 홈/랜딩
- `/prisma-queries` - Users & Posts CRUD 데모
- `/native-queries` - Native SQL 예제
- `/reference` - 문서 페이지

### 기존 API
- GET/POST `/api/prisma/users`
- GET/POST `/api/prisma/posts`
- GET `/api/native/aggregations|joins|window`

### 부족한 부분
- ❌ Category, Comment, Tag CRUD UI 없음
- ❌ PUT/PATCH/DELETE 엔드포인트 없음
- ❌ 동적 라우트 (`[id]`) 없음
- ❌ Include 상세 설명 페이지 없음
- ❌ 관계 설명 페이지 없음
- ❌ API 패턴 가이드 없음

---

## 🚀 구현 계획

### **Phase 1: Include 상세 설명 페이지** (요구사항 1)

#### 새 페이지: `/prisma-includes`

**파일 생성**: `src/app/prisma-includes/page.tsx`

**내용 구조**:

1. **도입부**
   - `include`가 무엇이고 왜 필요한가
   - `include` vs `select` 차이점

2. **6가지 Include 패턴** (각각 실행 가능한 코드 예제 포함)

   **1단계: 기본 Include**
   ```typescript
   // User의 모든 Post 함께 가져오기
   const user = await prisma.user.findUnique({
     where: { id: 1 },
     include: { posts: true }
   })
   ```

   **2단계: Selective Fields (select 활용)**
   ```typescript
   // Post의 특정 필드만 선택하여 성능 최적화
   const user = await prisma.user.findUnique({
     where: { id: 1 },
     include: {
       posts: {
         select: { id: true, title: true, published: true }
       }
     }
   })
   ```

   **3단계: Nested Include (중첩)**
   ```typescript
   // Post → Comments → Replies (3단계 중첩)
   const post = await prisma.post.findUnique({
     where: { id: 1 },
     include: {
       author: true,
       comments: {
         include: {
           author: true,
           replies: { include: { author: true } }
         }
       }
     }
   })
   ```

   **4단계: _count (집계)**
   ```typescript
   // 관계 데이터를 로드하지 않고 개수만 세기
   const user = await prisma.user.findUnique({
     where: { id: 1 },
     include: {
       _count: {
         select: { posts: true, comments: true }
       }
     }
   })
   ```

   **5단계: Filtering Within Include**
   ```typescript
   // Include 내에서 필터링, 정렬, 제한
   const user = await prisma.user.findUnique({
     where: { id: 1 },
     include: {
       posts: {
         where: { published: true },
         orderBy: { createdAt: 'desc' },
         take: 5
       }
     }
   })
   ```

   **6단계: Many-to-Many Include**
   ```typescript
   // 조인 테이블을 통한 다대다 관계
   const post = await prisma.post.findUnique({
     where: { id: 1 },
     include: {
       postTags: {
         include: { tag: true }
       }
     }
   })
   ```

3. **성능 비교 섹션**
   - 각 패턴의 쿼리 수와 데이터 크기 비교
   - 언제 include를 사용하고 언제 별도 쿼리를 사용할지

4. **주의사항**
   - N+1 문제
   - 과도한 중첩
   - 순환 참조

**UI 특징**:
- 각 예제마다 코드 블록 표시
- JSON 결과 표시
- 복사 버튼

---

### **Phase 2: 테이블 관계 설명 페이지** (요구사항 2)

#### 새 페이지: `/database-relationships`

**파일 생성**: `src/app/database-relationships/page.tsx`

**내용 구조**:

1. **스키마 개요**
   - 7개 모델의 전체 관계 다이어그램 (텍스트 또는 ASCII 아트)

2. **관계 유형별 상세 설명**

   **타입 1: One-to-One (1:1) - Post ↔ PostMetadata**
   ```prisma
   model Post {
     id       Int           @id @default(autoincrement())
     metadata PostMetadata?
   }

   model PostMetadata {
     id     Int  @id @default(autoincrement())
     postId Int  @unique
     post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
   }
   ```
   - **설명**: 하나의 Post는 정확히 하나의 PostMetadata만 가질 수 있음
   - **외래키**: `postId` → `Post.id`
   - **@unique**: 1:1 보장
   - **Cascade Delete**: Post 삭제 시 PostMetadata도 삭제
   - **실제 사용 예**: 게시글-메타데이터, 사용자-프로필

   **타입 2: One-to-Many (1:N) - User → Post, Category → Post**
   ```prisma
   model User {
     id    Int    @id @default(autoincrement())
     posts Post[]
   }

   model Post {
     authorId Int
     author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
   }
   ```
   - **설명**: 한 User는 여러 Post를 작성 가능
   - **외래키**: `authorId` → `User.id`
   - **Cascade**: User 삭제 시 모든 Post도 삭제
   - **실제 사용 예**: 사용자-게시글, 카테고리-게시글, 게시글-댓글

   **타입 3: Many-to-Many (N:M) - Post ↔ Tag**
   ```prisma
   model Post {
     postTags PostTag[]
   }

   model Tag {
     postTags PostTag[]
   }

   model PostTag {
     postId Int
     tagId  Int
     post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
     tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

     @@id([postId, tagId])
   }
   ```
   - **설명**: 하나의 Post는 여러 Tag를 가질 수 있고, 하나의 Tag는 여러 Post에 사용됨
   - **조인 테이블**: PostTag가 중간 테이블
   - **복합 PK**: `[postId, tagId]`로 중복 방지
   - **실제 사용 예**: 게시글-태그, 학생-수업

   **타입 4: Self-Referential (자기참조) - Comment**
   ```prisma
   model Comment {
     id       Int       @id @default(autoincrement())
     parentId Int?
     parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
     replies  Comment[] @relation("CommentReplies")
   }
   ```
   - **설명**: Comment가 자기 자신을 참조하여 대댓글 구조
   - **Optional**: `parentId`가 null이면 최상위 댓글
   - **Named Relation**: "CommentReplies"로 명시
   - **실제 사용 예**: 댓글-대댓글, 카테고리-하위카테고리, 조직도

3. **Cascade Actions 설명**
   - `onDelete: Cascade` - 부모 삭제 시 자식도 삭제
   - `onDelete: SetNull` - 부모 삭제 시 자식 FK를 null로
   - `onDelete: Restrict` - 자식이 있으면 부모 삭제 불가

4. **인덱스 전략**
   - 왜 `authorId`, `categoryId` 등에 인덱스가 필요한가
   - 조회 성능 비교

---

### **Phase 3: API 라우팅 패턴 가이드** (요구사항 3)

#### 새 페이지: `/api-patterns`

**파일 생성**: `src/app/api-patterns/page.tsx`

**내용 구조**:

1. **Next.js App Router 기본**
   - `route.ts` 파일이란?
   - Named exports (GET, POST, PUT, DELETE, PATCH)가 표준인 이유
   - App Router vs Pages Router

2. **RESTful API 설계 원칙**
   ```
   GET    /api/users          - 목록 조회
   GET    /api/users/[id]     - 단일 조회
   POST   /api/users          - 생성
   PUT    /api/users/[id]     - 전체 수정
   PATCH  /api/users/[id]     - 부분 수정
   DELETE /api/users/[id]     - 삭제
   ```

3. **Static Route 패턴** (현재 사용 중)
   ```typescript
   // src/app/api/prisma/users/route.ts
   export async function GET() {
     const users = await userService.findAll();
     return NextResponse.json({ success: true, data: users });
   }

   export async function POST(request: NextRequest) {
     const body = await request.json();
     const user = await userService.create(body);
     return NextResponse.json({ success: true, data: user }, { status: 201 });
   }
   ```
   - **장점**: 간단 명확
   - **단점**: 개별 리소스 접근 불가
   - **사용 시기**: 리스트 조회/생성만 필요할 때

4. **Dynamic Route 패턴** (권장 - 구현 예정)
   ```typescript
   // src/app/api/prisma/users/[id]/route.ts
   export async function GET(
     request: NextRequest,
     { params }: { params: { id: string } }
   ) {
     const id = parseInt(params.id);
     const user = await userService.findById(id);
     if (!user) {
       return NextResponse.json(
         { success: false, error: 'User not found' },
         { status: 404 }
       );
     }
     return NextResponse.json({ success: true, data: user });
   }

   export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
     const id = parseInt(params.id);
     const body = await request.json();
     const user = await userService.update(id, body);
     return NextResponse.json({ success: true, data: user });
   }

   export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
     const id = parseInt(params.id);
     await userService.delete(id);
     return NextResponse.json({ success: true, message: 'User deleted' });
   }
   ```
   - **장점**: RESTful, 완전한 CRUD
   - **사용 시기**: 개별 리소스 관리가 필요할 때

5. **Query Parameters vs Path Parameters**
   ```typescript
   // Path: /api/posts/123
   const { id } = params;

   // Query: /api/posts?page=1&limit=10&published=true
   const page = request.nextUrl.searchParams.get('page');
   const limit = request.nextUrl.searchParams.get('limit');
   ```

6. **Error Handling 패턴**
   ```typescript
   try {
     const user = await userService.findById(id);
     return NextResponse.json({ success: true, data: user });
   } catch (error) {
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
       if (error.code === 'P2025') {
         return NextResponse.json(
           { success: false, error: 'Record not found' },
           { status: 404 }
         );
       }
     }
     return NextResponse.json(
       { success: false, error: 'Internal server error' },
       { status: 500 }
     );
   }
   ```

7. **HTTP 상태 코드 가이드**
   - 200 OK - 성공
   - 201 Created - 생성 성공
   - 400 Bad Request - 잘못된 요청
   - 404 Not Found - 리소스 없음
   - 500 Internal Server Error - 서버 에러

8. **실무 권장사항**
   - Service layer 패턴 사용 (현재 잘 사용 중)
   - DTO 타입 정의
   - 일관된 응답 형식
   - 적절한 HTTP 상태 코드
   - 입력 검증 (선택사항)

---

### **Phase 4: 쿼리 예제 대폭 확장** (요구사항 4)

#### 4.1 새 Service 파일 생성

**파일 1**: `src/services/category.service.ts`
```typescript
import { prisma } from '@/lib/prisma';

export const categoryService = {
  // 카테고리 전체 조회 (게시글 개수 포함)
  async findAll() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { posts: true } }
      }
    });
  },

  // 카테고리 상세 조회 (게시글 목록 포함)
  async findById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
            viewCount: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  },

  async create(data: { name: string; description?: string }) {
    return await prisma.category.create({ data });
  },

  async update(id: number, data: { name?: string; description?: string }) {
    return await prisma.category.update({ where: { id }, data });
  },

  async delete(id: number) {
    return await prisma.category.delete({ where: { id } });
  }
};
```

**파일 2**: `src/services/comment.service.ts`
```typescript
import { prisma } from '@/lib/prisma';

export const commentService = {
  // 게시글의 최상위 댓글 조회 (대댓글 포함)
  async findByPostId(postId: number) {
    return await prisma.comment.findMany({
      where: {
        postId,
        parentId: null  // 최상위 댓글만
      },
      include: {
        author: { select: { id: true, name: true } },
        replies: {
          include: {
            author: { select: { id: true, name: true } }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(data: { content: string; postId: number; authorId: number; parentId?: number }) {
    return await prisma.comment.create({
      data,
      include: {
        author: { select: { id: true, name: true } }
      }
    });
  },

  async delete(id: number) {
    // Cascade로 대댓글도 함께 삭제됨
    return await prisma.comment.delete({ where: { id } });
  }
};
```

**파일 3**: `src/services/tag.service.ts`
```typescript
import { prisma } from '@/lib/prisma';

export const tagService = {
  // 태그 전체 조회 (사용 횟수 포함)
  async findAll() {
    return await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { postTags: true } }
      }
    });
  },

  // 태그 상세 조회 (연결된 게시글 목록)
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
                author: { select: { name: true } }
              }
            }
          }
        }
      }
    });
  },

  async create(data: { name: string }) {
    return await prisma.tag.create({ data });
  },

  async delete(id: number) {
    return await prisma.tag.delete({ where: { id } });
  },

  // 게시글에 태그 연결
  async attachToPost(tagId: number, postId: number) {
    return await prisma.postTag.create({
      data: { tagId, postId }
    });
  },

  // 게시글에서 태그 제거
  async detachFromPost(tagId: number, postId: number) {
    return await prisma.postTag.delete({
      where: {
        postId_tagId: { postId, tagId }
      }
    });
  }
};
```

#### 4.2 동적 API 라우트 생성

**파일 생성 목록**:
1. `src/app/api/prisma/users/[id]/route.ts` - User 개별 CRUD
2. `src/app/api/prisma/posts/[id]/route.ts` - Post 개별 CRUD
3. `src/app/api/prisma/categories/route.ts` - Category 목록/생성
4. `src/app/api/prisma/categories/[id]/route.ts` - Category 개별 CRUD
5. `src/app/api/prisma/comments/route.ts` - Comment 목록/생성
6. `src/app/api/prisma/comments/[id]/route.ts` - Comment 개별 CRUD
7. `src/app/api/prisma/tags/route.ts` - Tag 목록/생성
8. `src/app/api/prisma/tags/[id]/route.ts` - Tag 개별 CRUD

**예시** (`src/app/api/prisma/users/[id]/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user.service';
import { ApiResponse } from '@/types/api-responses';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const user = await userService.findById(id);

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const user = await userService.update(id, body);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await userService.delete(id);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

#### 4.3 Prisma Queries 페이지 확장

**파일 수정**: `src/app/prisma-queries/page.tsx`

**추가할 섹션**:

1. **카테고리 관리**
   - 전체 카테고리 조회 (게시글 개수 표시)
   - 카테고리 생성 폼
   - 카테고리별 게시글 보기

2. **댓글 관리**
   - 게시글 ID로 댓글 조회 (대댓글 포함)
   - 댓글 작성 폼
   - 대댓글 작성 폼

3. **태그 관리**
   - 전체 태그 조회 (사용 횟수 표시)
   - 태그 생성 폼
   - 게시글에 태그 추가/제거

#### 4.4 고급 쿼리 페이지 생성

**파일 생성**: `src/app/advanced-queries/page.tsx`

**내용**:

1. **Transaction 예제**
   ```typescript
   // 사용자와 첫 게시글 동시 생성
   const result = await prisma.$transaction(async (tx) => {
     const user = await tx.user.create({
       data: { email: 'new@example.com', name: 'New User' }
     });

     const post = await tx.post.create({
       data: {
         title: 'First Post',
         content: 'Hello World',
         authorId: user.id,
         categoryId: 1
       }
     });

     return { user, post };
   });
   ```

2. **Upsert 예제**
   ```typescript
   // 있으면 업데이트, 없으면 생성
   const tag = await prisma.tag.upsert({
     where: { name: 'TypeScript' },
     update: {},
     create: { name: 'TypeScript' }
   });
   ```

3. **Aggregate 예제**
   ```typescript
   // 게시글 통계
   const stats = await prisma.post.aggregate({
     _count: { id: true },
     _avg: { viewCount: true },
     _max: { viewCount: true },
     _sum: { viewCount: true }
   });
   ```

4. **GroupBy 예제**
   ```typescript
   // 카테고리별 그룹화
   const byCategory = await prisma.post.groupBy({
     by: ['categoryId'],
     _count: { id: true },
     _sum: { viewCount: true }
   });
   ```

5. **복잡한 필터링 예제**
   ```typescript
   // AND, OR, 날짜 범위 등
   const posts = await prisma.post.findMany({
     where: {
       AND: [
         { published: true },
         {
           OR: [
             { title: { contains: 'Prisma' } },
             { content: { contains: 'Prisma' } }
           ]
         },
         {
           createdAt: {
             gte: new Date('2024-01-01'),
             lte: new Date('2024-12-31')
           }
         }
       ]
     }
   });
   ```

---

### **Phase 5: 추가 학습 자료** (요구사항 5)

#### 5.1 자주하는 실수 페이지

**파일 생성**: `src/app/common-pitfalls/page.tsx`

**내용**:

1. **N+1 쿼리 문제**
   ```typescript
   // ❌ 나쁨: N+1 쿼리
   const users = await prisma.user.findMany();
   for (const user of users) {
     const posts = await prisma.post.findMany({
       where: { authorId: user.id }
     });
   }

   // ✓ 좋음: 단일 쿼리
   const users = await prisma.user.findMany({
     include: { posts: true }
   });
   ```

2. **과도한 데이터 페칭**
   ```typescript
   // ❌ 나쁨: 모든 필드 가져오기
   const users = await prisma.user.findMany({
     include: { posts: true }
   });

   // ✓ 좋음: 필요한 필드만 선택
   const users = await prisma.user.findMany({
     select: {
       id: true,
       name: true,
       posts: {
         select: { id: true, title: true }
       }
     }
   });
   ```

3. **트랜잭션 미사용**
4. **인덱스 누락**
5. **순환 참조**

#### 5.2 성능 최적화 팁

**파일 생성**: `src/app/performance-tips/page.tsx`

**내용**:
1. 가능하면 `select` 사용
2. 자주 조회하는 필드에 인덱스 추가
3. 대용량 데이터는 페이지네이션 사용
4. `findUnique` > `findFirst` (가능한 경우)
5. `createMany`, `updateMany`, `deleteMany`로 배치 처리
6. 복잡한 쿼리는 `$queryRaw` 고려

#### 5.3 데이터 시딩 가이드

**파일 생성**: `src/app/seeding-guide/page.tsx`

**내용**:
- `prisma/seed.ts` 파일 생성 방법
- 7개 모델에 대한 샘플 데이터
- `npx prisma db seed` 실행 방법

#### 5.4 마이그레이션 가이드

**파일 생성**: `src/app/migration-guide/page.tsx`

**내용**:
- `npx prisma migrate dev --name init` - 개발 환경
- `npx prisma migrate deploy` - 프로덕션 배포
- `npx prisma migrate reset` - 데이터베이스 초기화
- 스키마 변경 워크플로우

---

### **Phase 6: 네비게이션 업데이트**

**파일 수정**: `src/app/layout.tsx`

**변경 사항**:
- 새 페이지들을 네비게이션에 추가
- 학습 자료 드롭다운 메뉴 추가 (선택사항)

```tsx
<nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">Prisma 레퍼런스</Link>
      <div className="flex gap-6">
        <Link href="/prisma-queries">Prisma 쿼리</Link>
        <Link href="/prisma-includes">Include 설명</Link>
        <Link href="/database-relationships">테이블 관계</Link>
        <Link href="/api-patterns">API 패턴</Link>
        <Link href="/advanced-queries">고급 쿼리</Link>
        <Link href="/native-queries">Native 쿼리</Link>
        <Link href="/common-pitfalls">자주하는 실수</Link>
        <Link href="/performance-tips">성능 팁</Link>
        <Link href="/reference">참조 가이드</Link>
      </div>
    </div>
  </div>
</nav>
```

---

## 📋 구현 순서

### **우선순위 1: 핵심 교육 콘텐츠** (가장 중요)

1. ✅ `/prisma-includes` 페이지 생성 - Include 6단계 패턴 설명
2. ✅ `/database-relationships` 페이지 생성 - 4가지 관계 타입 설명
3. ✅ `/api-patterns` 페이지 생성 - RESTful API 가이드
4. ✅ `category.service.ts`, `comment.service.ts`, `tag.service.ts` 생성

### **우선순위 2: 쿼리 예제 확장**

5. ✅ 동적 API 라우트 생성 (8개 파일)
6. ✅ `prisma-queries/page.tsx` 확장 - Category, Comment, Tag 섹션 추가
7. ✅ `/advanced-queries` 페이지 생성 - Transaction, Upsert, Aggregate 등

### **우선순위 3: 추가 학습 자료**

8. ✅ `/common-pitfalls` 페이지 생성
9. ✅ `/performance-tips` 페이지 생성
10. ✅ `/seeding-guide` 페이지 생성 (선택)
11. ✅ `/migration-guide` 페이지 생성 (선택)

### **우선순위 4: 마무리**

12. ✅ `layout.tsx` 네비게이션 업데이트
13. ✅ 홈페이지에 새 페이지 링크 추가
14. ✅ 모든 예제 테스트 및 검증

---

## 📁 생성/수정할 파일 목록

### 새로 생성할 파일 (20개)

**서비스 파일 (3개)**:
- `src/services/category.service.ts`
- `src/services/comment.service.ts`
- `src/services/tag.service.ts`

**API 라우트 (8개)**:
- `src/app/api/prisma/users/[id]/route.ts`
- `src/app/api/prisma/posts/[id]/route.ts`
- `src/app/api/prisma/categories/route.ts`
- `src/app/api/prisma/categories/[id]/route.ts`
- `src/app/api/prisma/comments/route.ts`
- `src/app/api/prisma/comments/[id]/route.ts`
- `src/app/api/prisma/tags/route.ts`
- `src/app/api/prisma/tags/[id]/route.ts`

**교육 페이지 (9개)**:
- `src/app/prisma-includes/page.tsx` ⭐ 가장 중요
- `src/app/database-relationships/page.tsx` ⭐ 가장 중요
- `src/app/api-patterns/page.tsx` ⭐ 가장 중요
- `src/app/advanced-queries/page.tsx` ⭐ 중요
- `src/app/common-pitfalls/page.tsx`
- `src/app/performance-tips/page.tsx`
- `src/app/seeding-guide/page.tsx` (선택)
- `src/app/migration-guide/page.tsx` (선택)
- `src/app/testing-guide/page.tsx` (선택)

### 수정할 파일 (2개)

- `src/app/layout.tsx` - 네비게이션 업데이트
- `src/app/prisma-queries/page.tsx` - Category, Comment, Tag 섹션 추가

---

## 🎓 교육적 특징

1. **복사-붙여넣기 가능**: 모든 코드는 완전하고 즉시 실행 가능
2. **점진적 학습**: 간단한 예제부터 복잡한 예제까지
3. **실용성**: 실제 프로젝트에서 사용 가능한 패턴
4. **명확한 설명**: 한국어로 각 개념을 자세히 설명
5. **Best Practices**: 실무 권장사항 포함
6. **Common Pitfalls**: 초보자가 자주 하는 실수 명시

---

## ✅ 검증 방법

구현 완료 후 다음을 확인:

1. **모든 새 페이지 접근 가능**
   - 브라우저에서 각 URL 방문
   - 네비게이션 링크 작동 확인

2. **API 엔드포인트 테스트**
   - Postman 또는 Thunder Client로 테스트
   - GET, POST, PUT, DELETE 모두 테스트

3. **코드 예제 검증**
   - 각 코드 예제가 실제로 실행되는지 확인
   - 에러가 없는지 확인

4. **UI/UX 확인**
   - 모든 페이지가 일관된 스타일인지
   - 반응형 디자인 작동 확인

5. **교육적 가치**
   - 초보자가 이해할 수 있는지
   - 복사-붙여넣기가 가능한지

---

## 🔑 핵심 파일 (최우선 구현)

1. **`src/app/prisma-includes/page.tsx`** - Include 6단계 패턴 (요구사항 1)
2. **`src/app/database-relationships/page.tsx`** - 4가지 관계 타입 (요구사항 2)
3. **`src/app/api-patterns/page.tsx`** - RESTful API 가이드 (요구사항 3)
4. **`src/services/category.service.ts`** - Category CRUD 서비스
5. **`src/services/comment.service.ts`** - 자기참조 관계 예제
6. **`src/services/tag.service.ts`** - 다대다 관계 예제

이 6개 파일을 먼저 구현하면 사용자의 핵심 요구사항을 모두 충족할 수 있습니다.
