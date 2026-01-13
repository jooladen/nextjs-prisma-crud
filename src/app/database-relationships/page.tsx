'use client';

import Link from 'next/link';

export default function DatabaseRelationshipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            데이터베이스 관계 완벽 이해하기
          </h1>
          <p className="text-xl text-gray-600">
            7개 모델 간의 관계를 정확하게 이해하고, Prisma 스키마로 표현하는 방법을 배워보세요.
          </p>
        </div>

        {/* Schema Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">전체 스키마 개요</h2>

          <p className="text-gray-600 mb-6">
            현재 프로젝트는 블로그 플랫폼을 위한 7개의 모델로 구성되어 있습니다.
            각 모델 간의 관계를 이해하면 복잡한 쿼리도 쉽게 작성할 수 있습니다.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <pre className="text-sm overflow-x-auto">
              <code>{`
┌──────────┐
│   User   │──────┐
└──────────┘      │ 1:N (한 사용자, 여러 게시글)
                  ↓
              ┌──────────┐     1:1     ┌──────────────┐
              │   Post   │─────────────│ PostMetadata │
              └──────────┘             └──────────────┘
                  │ ↑
                  │ │ 1:N
                  │ └──────────────┐
                  ↓                │
              ┌──────────┐     ┌──────────┐
              │ Comment  │     │ Category │
              └──────────┘     └──────────┘
                  ↑ │               │
                  └─┘               │ 1:N (한 카테고리, 여러 게시글)
              자기참조              │
              (대댓글)              ↓

                  ┌──────────┐     N:M     ┌──────────┐
                  │   Tag    │←───────────→│ PostTag  │
                  └──────────┘  조인 테이블  └──────────┘
                                                │
                                                ↓
                                            (Post와 연결)
`}</code>
            </pre>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">7개 모델 목록</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>User</strong> - 사용자</li>
                <li><strong>Post</strong> - 게시글</li>
                <li><strong>Comment</strong> - 댓글</li>
                <li><strong>Category</strong> - 카테고리</li>
                <li><strong>Tag</strong> - 태그</li>
                <li><strong>PostTag</strong> - 게시글-태그 조인 테이블</li>
                <li><strong>PostMetadata</strong> - 게시글 메타데이터</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">4가지 관계 타입</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>1:1</strong> (One-to-One) - Post ↔ PostMetadata</li>
                <li><strong>1:N</strong> (One-to-Many) - User → Post, Category → Post</li>
                <li><strong>N:M</strong> (Many-to-Many) - Post ↔ Tag</li>
                <li><strong>자기참조</strong> (Self-Referential) - Comment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Relationship Type 1: One-to-One */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold mr-4">타입 1</span>
            <h2 className="text-2xl font-bold text-gray-800">One-to-One (1:1) 관계</h2>
          </div>

          <p className="text-gray-600 mb-6">
            <strong>하나의 레코드가 다른 테이블의 정확히 하나의 레코드와만 연결됩니다.</strong>
            <br/>
            예: 하나의 Post는 정확히 하나의 PostMetadata를 가집니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📝 Prisma 스키마</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model Post {
  id       Int           @id @default(autoincrement())
  title    String
  content  String
  metadata PostMetadata? // ← 선택적 (Optional) 관계
}

model PostMetadata {
  id          Int    @id @default(autoincrement())
  postId      Int    @unique  // ← @unique로 1:1 보장!
  description String?
  keywords    String[]
  post        Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded">
              <h4 className="font-bold text-purple-800 mb-2">🔑 핵심 포인트</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><code className="bg-gray-100 px-1">@unique</code> 제약조건이 1:1을 보장</li>
                <li><code className="bg-gray-100 px-1">postId</code>는 외래키 (Foreign Key)</li>
                <li><code className="bg-gray-100 px-1">Post</code>의 <code className="bg-gray-100 px-1">metadata</code>는 선택적 (<code className="bg-gray-100 px-1">?</code>)</li>
                <li><code className="bg-gray-100 px-1">onDelete: Cascade</code> - Post 삭제 시 PostMetadata도 삭제</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-bold text-blue-800 mb-2">💡 실제 사용 예시</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>사용자 ↔ 사용자 프로필</li>
                <li>주문 ↔ 배송 정보</li>
                <li>게시글 ↔ SEO 메타데이터</li>
                <li>상품 ↔ 재고 정보</li>
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">쿼리 예제:</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`// Post를 조회할 때 PostMetadata도 함께 가져오기
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    metadata: true  // 1:1 관계 include
  }
});

// 결과:
// {
//   id: 1,
//   title: "Prisma 가이드",
//   content: "...",
//   metadata: {
//     id: 1,
//     postId: 1,
//     description: "Prisma ORM 완벽 가이드",
//     keywords: ["prisma", "database", "typescript"]
//   }
// }`}</code>
            </pre>
          </div>
        </section>

        {/* Relationship Type 2: One-to-Many */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold mr-4">타입 2</span>
            <h2 className="text-2xl font-bold text-gray-800">One-to-Many (1:N) 관계</h2>
          </div>

          <p className="text-gray-600 mb-6">
            <strong>하나의 레코드가 다른 테이블의 여러 레코드와 연결됩니다.</strong>
            <br/>
            예: 한 명의 User는 여러 개의 Post를 작성할 수 있습니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📝 Prisma 스키마 (User → Post)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String
  posts    Post[]    // ← 여러 개의 Post (배열)
  comments Comment[] // ← 여러 개의 Comment (배열)
}

model Post {
  id       Int      @id @default(autoincrement())
  title    String
  content  String
  authorId Int      // ← 외래키
  author   User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])  // ← 성능을 위한 인덱스
}`}</code>
            </pre>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📝 Prisma 스키마 (Category → Post)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model Category {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  description String?
  posts       Post[]  // ← 여러 개의 Post
}

model Post {
  id         Int      @id @default(autoincrement())
  title      String
  categoryId Int      // ← 외래키
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@index([categoryId])
}`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-green-800 mb-2">🔑 핵심 포인트</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>부모 모델은 배열(<code className="bg-gray-100 px-1">Post[]</code>)로 선언</li>
                <li>자식 모델은 외래키(<code className="bg-gray-100 px-1">authorId</code>)를 가짐</li>
                <li><code className="bg-gray-100 px-1">@@index</code>로 조회 성능 최적화</li>
                <li><code className="bg-gray-100 px-1">onDelete: Cascade</code> - 부모 삭제 시 자식도 삭제</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-bold text-blue-800 mb-2">💡 실제 사용 예시</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>사용자 → 게시글</li>
                <li>카테고리 → 상품</li>
                <li>게시글 → 댓글</li>
                <li>부서 → 직원</li>
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">쿼리 예제:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">User → Post (부모에서 자식 조회)</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`// 사용자의 모든 게시글 조회
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true  // 1:N 관계
  }
});

// 결과:
// {
//   id: 1,
//   name: "홍길동",
//   posts: [
//     { id: 1, title: "첫 글" },
//     { id: 2, title: "둘째 글" }
//   ]
// }`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Post → User (자식에서 부모 조회)</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`// 게시글의 작성자 조회
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    author: true  // N:1 관계
  }
});

// 결과:
// {
//   id: 1,
//   title: "첫 글",
//   author: {
//     id: 1,
//     name: "홍길동"
//   }
// }`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <h4 className="font-bold text-yellow-800 mb-2">⚡ Cascade Delete 동작 예시</h4>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>{`// User를 삭제하면?
await prisma.user.delete({ where: { id: 1 } });

// ✅ 해당 User가 작성한 모든 Post도 자동으로 삭제됨
// ✅ 해당 User가 작성한 모든 Comment도 자동으로 삭제됨
// (onDelete: Cascade 덕분)`}</code>
            </pre>
          </div>
        </section>

        {/* Relationship Type 3: Many-to-Many */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold mr-4">타입 3</span>
            <h2 className="text-2xl font-bold text-gray-800">Many-to-Many (N:M) 관계</h2>
          </div>

          <p className="text-gray-600 mb-6">
            <strong>양쪽 모두 여러 레코드와 연결될 수 있습니다. 중간 테이블(조인 테이블)이 필요합니다.</strong>
            <br/>
            예: 하나의 Post는 여러 Tag를 가질 수 있고, 하나의 Tag는 여러 Post에 사용될 수 있습니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📝 Prisma 스키마</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model Post {
  id       Int       @id @default(autoincrement())
  title    String
  postTags PostTag[] // ← 중간 테이블 참조
}

model Tag {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  postTags PostTag[] // ← 중간 테이블 참조
}

model PostTag {
  postId Int
  tagId  Int
  post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])  // ← 복합 기본키로 중복 방지
  @@index([tagId])       // ← Tag로 검색하기 위한 인덱스
}`}</code>
            </pre>
          </div>

          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded">
            <h4 className="font-bold text-orange-800 mb-3">🔑 핵심 포인트</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>중간 테이블 (PostTag):</strong> Post와 Tag를 연결하는 조인 테이블
              </li>
              <li>
                <strong>복합 기본키:</strong> <code className="bg-gray-100 px-1">@@id([postId, tagId])</code>로
                같은 Post에 같은 Tag가 중복으로 추가되는 것을 방지
              </li>
              <li>
                <strong>양방향 Cascade:</strong> Post나 Tag가 삭제되면 PostTag 레코드도 자동 삭제
              </li>
              <li>
                <strong>추가 필드 가능:</strong> PostTag에 <code className="bg-gray-100 px-1">createdAt</code> 등 추가 정보 저장 가능
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">쿼리 예제:</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">1. Post의 모든 Tag 조회</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: {
    postTags: {
      include: {
        tag: true  // Tag 정보 포함
      }
    }
  }
});

// 결과:
// {
//   id: 1,
//   title: "Prisma 가이드",
//   postTags: [
//     { postId: 1, tagId: 1, tag: { id: 1, name: "TypeScript" } },
//     { postId: 1, tagId: 2, tag: { id: 2, name: "Database" } }
//   ]
// }`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">2. Tag가 사용된 모든 Post 조회</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`const tag = await prisma.tag.findUnique({
  where: { id: 1 },
  include: {
    postTags: {
      include: {
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    }
  }
});

// 결과:
// {
//   id: 1,
//   name: "TypeScript",
//   postTags: [
//     { postId: 1, tagId: 1, post: { id: 1, title: "Prisma 가이드" } },
//     { postId: 5, tagId: 1, post: { id: 5, title: "Next.js 튜토리얼" } }
//   ]
// }`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">3. Post에 Tag 추가하기</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`// 방법 1: PostTag 직접 생성
await prisma.postTag.create({
  data: {
    postId: 1,
    tagId: 3
  }
});

// 방법 2: Post 업데이트 시 연결
await prisma.post.update({
  where: { id: 1 },
  data: {
    postTags: {
      create: {
        tagId: 3
      }
    }
  }
});`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">4. Post에서 Tag 제거하기</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`await prisma.postTag.delete({
  where: {
    postId_tagId: {
      postId: 1,
      tagId: 3
    }
  }
});`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 실제 사용 예시</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>게시글 ↔ 태그</li>
              <li>학생 ↔ 수업</li>
              <li>상품 ↔ 카테고리</li>
              <li>사용자 ↔ 역할(Role)</li>
            </ul>
          </div>
        </section>

        {/* Relationship Type 4: Self-Referential */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold mr-4">타입 4</span>
            <h2 className="text-2xl font-bold text-gray-800">Self-Referential (자기참조) 관계</h2>
          </div>

          <p className="text-gray-600 mb-6">
            <strong>같은 테이블 내에서 레코드끼리 관계를 맺습니다.</strong>
            <br/>
            예: Comment가 다른 Comment를 참조하여 댓글/대댓글 구조를 만듭니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">📝 Prisma 스키마</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model Comment {
  id        Int       @id @default(autoincrement())
  content   String
  postId    Int
  authorId  Int
  parentId  Int?      // ← 부모 댓글 ID (선택적)

  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)

  // 자기참조 관계
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies   Comment[] @relation("CommentReplies")  // ← 대댓글들

  @@index([postId])
  @@index([authorId])
  @@index([parentId])
}`}</code>
            </pre>
          </div>

          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <h4 className="font-bold text-red-800 mb-3">🔑 핵심 포인트</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>parentId:</strong> 부모 댓글의 ID. <code className="bg-gray-100 px-1">null</code>이면 최상위 댓글
              </li>
              <li>
                <strong>Named Relation:</strong> <code className="bg-gray-100 px-1">"CommentReplies"</code>로
                양방향 관계 명시
              </li>
              <li>
                <strong>parent:</strong> 이 댓글의 부모 댓글 (단수)
              </li>
              <li>
                <strong>replies:</strong> 이 댓글의 대댓글들 (복수, 배열)
              </li>
              <li>
                <strong>Cascade Delete:</strong> 댓글 삭제 시 모든 대댓글도 자동 삭제
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-700 mb-2">계층 구조 예시:</h4>
            <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
              <pre className="text-sm overflow-x-auto">
                <code>{`
Comment 1 (parentId: null)
├── Comment 2 (parentId: 1)  ← Comment 1의 대댓글
│   └── Comment 5 (parentId: 2)  ← Comment 2의 대댓글
└── Comment 3 (parentId: 1)  ← Comment 1의 대댓글

Comment 4 (parentId: null)
└── Comment 6 (parentId: 4)  ← Comment 4의 대댓글
`}</code>
              </pre>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">쿼리 예제:</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">1. 최상위 댓글과 대댓글 모두 조회</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`const comments = await prisma.comment.findMany({
  where: {
    postId: 1,
    parentId: null  // 최상위 댓글만
  },
  include: {
    author: { select: { id: true, name: true } },
    replies: {  // 대댓글 포함
      include: {
        author: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'asc' }
    }
  },
  orderBy: { createdAt: 'desc' }
});

// 결과:
// [
//   {
//     id: 1,
//     content: "좋은 글이네요!",
//     parentId: null,
//     author: { id: 2, name: "김철수" },
//     replies: [
//       {
//         id: 2,
//         content: "감사합니다!",
//         parentId: 1,
//         author: { id: 1, name: "홍길동" }
//       }
//     ]
//   }
// ]`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">2. 댓글 작성 (최상위 댓글)</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`await prisma.comment.create({
  data: {
    content: "좋은 글이네요!",
    postId: 1,
    authorId: 2,
    parentId: null  // 최상위 댓글
  }
});`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">3. 대댓글 작성</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`await prisma.comment.create({
  data: {
    content: "감사합니다!",
    postId: 1,
    authorId: 1,
    parentId: 1  // Comment 1에 대한 대댓글
  }
});`}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">4. 댓글 삭제 (대댓글도 함께 삭제됨)</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto text-sm">
                  <code>{`// Comment 1을 삭제하면?
await prisma.comment.delete({ where: { id: 1 } });

// ✅ Comment 2, Comment 3, Comment 5도 자동으로 삭제됨
// (onDelete: Cascade 덕분)`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">💡 실제 사용 예시</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>댓글 / 대댓글 시스템</li>
              <li>카테고리 / 하위 카테고리</li>
              <li>조직도 (상사 - 부하 관계)</li>
              <li>파일 시스템 (폴더 - 하위 폴더)</li>
            </ul>
          </div>
        </section>

        {/* Cascade Actions */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Cascade Actions (연쇄 동작)</h2>

          <p className="text-gray-600 mb-6">
            <code className="bg-gray-100 px-2 py-1 rounded">onDelete</code>와
            <code className="bg-gray-100 px-2 py-1 rounded mx-1">onUpdate</code> 옵션으로
            부모 레코드 변경 시 자식 레코드의 동작을 제어할 수 있습니다.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h4 className="font-bold text-red-800 mb-2">Cascade</h4>
              <p className="text-sm text-gray-700 mb-2">
                부모 삭제 시 자식도 함께 삭제
              </p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                <code>{`onDelete: Cascade

// User 삭제 →
// 모든 Post 삭제`}</code>
              </pre>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-bold text-yellow-800 mb-2">SetNull</h4>
              <p className="text-sm text-gray-700 mb-2">
                부모 삭제 시 자식의 FK를 null로
              </p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                <code>{`onDelete: SetNull

// User 삭제 →
// Post의 authorId를 null로`}</code>
              </pre>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-bold text-gray-800 mb-2">Restrict</h4>
              <p className="text-sm text-gray-700 mb-2">
                자식이 있으면 부모 삭제 불가
              </p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                <code>{`onDelete: Restrict

// User에 Post가 있으면
// User 삭제 불가 (에러)`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">현재 프로젝트 설정</h4>
            <p className="text-gray-700 mb-2">
              모든 관계에 <code className="bg-gray-100 px-1">onDelete: Cascade</code>가 설정되어 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>User 삭제 → 모든 Post와 Comment 삭제</li>
              <li>Post 삭제 → 모든 Comment, PostTag, PostMetadata 삭제</li>
              <li>Category 삭제 → 해당 카테고리의 모든 Post 삭제</li>
              <li>Comment 삭제 → 모든 대댓글 삭제</li>
            </ul>
          </div>
        </section>

        {/* Index Strategy */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">인덱스 전략</h2>

          <p className="text-gray-600 mb-6">
            외래키 필드에 인덱스를 추가하면 조회 성능이 크게 향상됩니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">왜 인덱스가 필요한가요?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="bg-red-100 border border-red-300 px-3 py-2 rounded-t font-semibold text-red-800">
                  ❌ 인덱스 없음
                </div>
                <div className="bg-gray-50 p-4 rounded-b border border-red-300">
                  <p className="text-sm text-gray-700 mb-2">
                    <code className="bg-gray-100 px-1">authorId</code>로 Post 검색 시:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>테이블 전체를 스캔 (Full Table Scan)</li>
                    <li>데이터가 많을수록 느려짐</li>
                    <li>1만 개 레코드면 1만 개 모두 확인</li>
                  </ul>
                  <p className="text-red-600 font-bold mt-2 text-sm">⏱️ 매우 느림!</p>
                </div>
              </div>

              <div>
                <div className="bg-green-100 border border-green-300 px-3 py-2 rounded-t font-semibold text-green-800">
                  ✅ 인덱스 있음
                </div>
                <div className="bg-gray-50 p-4 rounded-b border border-green-300">
                  <p className="text-sm text-gray-700 mb-2">
                    <code className="bg-gray-100 px-1">@@index([authorId])</code> 추가 시:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>인덱스로 빠르게 검색</li>
                    <li>데이터가 많아도 빠름</li>
                    <li>1만 개 레코드도 수십 개만 확인</li>
                  </ul>
                  <p className="text-green-600 font-bold mt-2 text-sm">⚡ 매우 빠름!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">현재 프로젝트의 인덱스:</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`model Post {
  // ... 필드들 ...

  @@index([authorId])    // User로 검색
  @@index([categoryId])  // Category로 검색
}

model Comment {
  // ... 필드들 ...

  @@index([postId])      // Post로 검색
  @@index([authorId])    // User로 검색
  @@index([parentId])    // 부모 댓글로 검색
}

model PostTag {
  // ... 필드들 ...

  @@index([tagId])       // Tag로 검색
}`}</code>
            </pre>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">성능 비교 예시</h4>
            <p className="text-gray-700">
              10만 개의 Post 중에서 특정 User의 Post를 찾을 때:
              <br/>
              • 인덱스 없음: ~500ms
              <br/>
              • 인덱스 있음: ~5ms
              <br/>
              <strong className="text-green-800">→ 100배 빠름!</strong>
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">관계 타입 요약</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">관계 타입</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">예시</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-bold">1:1</td>
                  <td className="border border-gray-300 px-4 py-2">하나가 정확히 하나와 연결</td>
                  <td className="border border-gray-300 px-4 py-2">Post ↔ PostMetadata</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">@unique 필수</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-bold">1:N</td>
                  <td className="border border-gray-300 px-4 py-2">하나가 여러 개와 연결</td>
                  <td className="border border-gray-300 px-4 py-2">User → Post</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">가장 흔한 패턴</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-bold">N:M</td>
                  <td className="border border-gray-300 px-4 py-2">양쪽 모두 여러 개와 연결</td>
                  <td className="border border-gray-300 px-4 py-2">Post ↔ Tag</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">조인 테이블 필요</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-bold">자기참조</td>
                  <td className="border border-gray-300 px-4 py-2">같은 테이블끼리 연결</td>
                  <td className="border border-gray-300 px-4 py-2">Comment (댓글/대댓글)</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">Named relation 필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">다음 단계</h2>
          <p className="mb-6">
            데이터베이스 관계를 이해했다면 이제 API 패턴을 배워보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/prisma-includes"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              ← Include 다시 보기
            </Link>
            <Link
              href="/api-patterns"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              API 패턴 학습하기 →
            </Link>
            <Link
              href="/prisma-queries"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              실전 쿼리 연습하기 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
