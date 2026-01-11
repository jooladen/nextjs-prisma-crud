🔹 종합 프롬프트 (Next.js + Prisma CRUD 레퍼런스 앱)

목적:
Next.js와 Prisma를 활용한 CRUD 학습/참조용 레퍼런스 애플리케이션을 생성하고 싶습니다.
개발자가 메뉴별로 참조하면서, “어떤 상황에서 Prisma 일반 쿼리를 사용하고, 어떤 상황에서 네이티브 쿼리를 사용해야 하는지” 직관적으로 판단할 수 있어야 합니다.

1️⃣ 기능 요구

Prisma 일반 쿼리 메뉴

단일 테이블 CRUD (Create, Read, Update, Delete)

단순 JOIN (Relation Queries)

Prisma Client (findMany, findUnique, create, update, delete) 사용

타입 안전성 강조

코드 + 실행 결과 표시

Native 쿼리 메뉴

JOIN + GROUP BY

Window Function, 고급 집계 (PostgreSQL 특화 기능 포함, 예: JSONB, 배열)

Prisma $queryRaw / $executeRaw 사용

트랜잭션 처리 예제 포함 ($transaction)

TypeScript DTO/타입 정의 포함

코드 + 실행 결과 + Prisma vs Native 선택 이유 표시

참조용 안내

각 메뉴에서 “왜 이 쿼리를 썼는지”, “Prisma vs Native 선택 기준” 설명

SQL 인젝션 방어법 강조

실무 팁 포함 (성능 최적화, 트랜잭션 처리 등)

2️⃣ UI/레이아웃 요구

UI는 심플하고 깔끔하게, 학습/참조 중심

메뉴별로 체계적 구분

좌측 메뉴: Prisma 일반 쿼리 / Native 쿼리

우측 영역: 예제 코드, 실행 결과, 설명, 쿼리 유형

화려한 디자인보다는 가독성과 메뉴 구조에 집중

3️⃣ 프로젝트 구조 요구 (실무 기준)

App Router 기반 API 라우트 → app/api/...

서비스 레이어 분리 → services/userService.ts, services/reportService.ts

타입 정의/DTO 레이어 → types/

샘플 데이터 포함 → prisma/seed.ts

메뉴별 예제와 구조가 실무 기준과 유사하도록 설계

4️⃣ 기대 효과

개발자가 메뉴별 예제를 보면서 상황에 맞는 쿼리 선택 학습 가능

Prisma 일반 쿼리와 Native 쿼리의 장단점 및 적용 기준 직관적으로 이해 가능

학습용 Reference Application으로, 실제 프로젝트에 바로 참고 가능

5️⃣ 요청 요약 문장 (AI용 프롬프트 예시)

**“Next.js와 Prisma를 활용한 CRUD 학습/참조용 레퍼런스 애플리케이션을 만들어 주세요.
화면은 심플하지만 메뉴별로 체계적으로 구분되어 있어야 하며, 개발자가 메뉴별로 참조하면서 Prisma 일반 쿼리와 네이티브 쿼리 사용 기준을 판단할 수 있도록 합니다.

Prisma 일반 쿼리 메뉴: 단일 테이블 CRUD, 단순 JOIN, Prisma Client 사용

Native 쿼리 메뉴: JOIN + GROUP BY, Window Function, PostgreSQL 특화 기능, 트랜잭션 처리, TypeScript 타입 정의 포함

각 메뉴에서 코드, 실행 결과, 쿼리 유형, Prisma vs Native 선택 이유를 보여주고, 실무 팁, SQL 인젝션 방어법, 성능 최적화 등 참고 내용을 포함합니다.

프로젝트 구조는 실무 기준으로 App Router 기반 API, 서비스 레이어, 타입 정의, 샘플 데이터 포함 형태로 설계합니다.

즉, 개발자가 메뉴별로 참조하며 실제 상황에서 어떤 쿼리를 사용할지 판단할 수 있는 학습/참조용 Reference Application입니다.”**

원하면 제가 이 프롬프트를 바탕으로 바로 AI에게 요청할 수 있는 실무 프로젝트 구조 + 메뉴별 Prisma/Native CRUD 예제 설계안까지 만들어서 보여드릴 수도 있어요.

혹시 그거까지 만들어 드릴까요?