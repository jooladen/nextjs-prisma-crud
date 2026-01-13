전체 관계 한눈에 보기 (요약)
User 1 ── N Post
User 1 ── N Comment

Post 1 ── N Comment (자기참조 포함)
Category 1 ── N Post

Post N ── M Tag
        ↳ PostTag (조인 테이블)

Post 1 ── 1 PostMetadata

1️⃣ User ↔ Post
관계

User 1 : N Post

한 사용자는 여러 게시글 작성 가능

게시글은 반드시 작성자 1명

테이블 구조
User (
  id PK
)

Post (
  id PK
  user_id FK → User.id
)

왜 이렇게?

게시글 작성자 변경 가능성

User 삭제 시 Post 처리 정책 설정 가능

CASCADE / SET NULL / RESTRICT

2️⃣ Category ↔ Post
관계

Category 1 : N Post

게시글은 하나의 카테고리

카테고리는 여러 게시글

테이블 구조
Category (
  id PK
)

Post (
  id PK
  category_id FK → Category.id
)

GROUP BY 예시
SELECT category_id, COUNT(*)
FROM post
GROUP BY category_id;

왜 이렇게?

카테고리는 분류용

Post 쪽에 FK 두는 게 자연스러움

3️⃣ Post ↔ Comment
관계

Post 1 : N Comment

게시글 하나에 댓글 여러 개

기본 구조
Comment (
  id PK
  post_id FK → Post.id
)

4️⃣ Comment 자기참조 (대댓글 구조)
관계

Comment 1 : N Comment

부모 댓글 ↔ 자식 댓글

테이블 구조
Comment (
  id PK
  post_id FK → Post.id
  parent_comment_id FK → Comment.id (nullable)
)

구조 예
댓글 A
 ├─ 댓글 A-1
 └─ 댓글 A-2
     └─ 댓글 A-2-1

쿼리 특징

재귀 CTE

depth 기반 조회

트리 구조 렌더링

5️⃣ User ↔ Comment
관계

User 1 : N Comment

한 사용자는 여러 댓글 작성

Comment (
  id PK
  user_id FK → User.id
)

6️⃣ Post ↔ Tag
관계

Post N : M Tag

게시글 여러 태그

태그는 여러 게시글에 사용됨

❗ RDB에서 N:M 직접 불가 → 조인 테이블 필요

7️⃣ PostTag (조인 테이블)
역할

Post ↔ Tag 연결

테이블 구조 (정석)
PostTag (
  post_id FK → Post.id
  tag_id FK → Tag.id
  PRIMARY KEY (post_id, tag_id)
)

왜 PK를 복합키로?

같은 태그 중복 방지

불필요한 surrogate key 제거

8️⃣ PostMetadata ↔ Post
관계

Post 1 : 1 PostMetadata

게시글마다 메타 정보 1개

테이블 구조
PostMetadata (
  post_id PK FK → Post.id
  metadata JSONB
)

JSONB 예
{
  "views": 123,
  "likes": 10,
  "seo": {
    "title": "Next.js 관계 설계",
    "keywords": ["nextjs", "erd"]
  }
}

왜 분리하나?

자주 조회 안 되는 컬럼 분리

테이블 슬림화

JSONB 인덱싱 가능

🔥 실무에서 “일반적이다”의 기준
관계	실무 표준
User–Post	✅ 거의 100%
Post–Category	✅
Post–Comment	✅
Comment 자기참조	✅
Post–Tag (N:M)	✅
PostMetadata 분리	✅ (중급 이상 설계)
💡 ERD 관점에서 한 줄 정리

주 엔티티(Post)를 중심으로
작성자(User), 분류(Category), 확장(Tag), 계층(Comment), 부가정보(Metadata)가
정규화된 관계로 붙는 전형적인 구조

다음 단계로는 👇 이런 것도 바로 이어서 설명 가능해

JPA 기준 매핑 (@OneToMany, @ManyToMany vs 조인 엔티티)

MyBatis 기준 실전 쿼리

대댓글 조회 쿼리 (재귀 CTE)

이 구조에서 절대 하지 말아야 할 설계 실수

원하면 뭐부터 볼지 말해줘.