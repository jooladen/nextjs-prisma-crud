# Prisma & PostgreSQL 레퍼런스 애플리케이션

Next.js, Prisma, PostgreSQL을 활용한 CRUD 학습 및 참조용 레퍼런스 애플리케이션입니다.

## 목표

이 프로젝트는 개발자가 Prisma 일반 쿼리와 PostgreSQL Native 쿼리를 비교하고 학습할 수 있도록 설계된 레퍼런스 애플리케이션입니다.

### 주요 기능

- **Prisma 일반 쿼리**: TypeScript 타입 안전성을 제공하는 Prisma Client 사용
- **Native 쿼리**: PostgreSQL의 강력한 기능 (Window 함수, JSONB, 배열 등) 활용
- **실시간 실행**: 각 쿼리를 실제로 실행하고 결과 확인
- **코드 + 결과 + 설명**: 모든 예제에 코드, 실행 결과, 사용 사례 포함
- **학습 가이드**: 쿼리 선택 기준, SQL 인젝션 방어, 성능 최적화 팁

## 기술 스택

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16 (Docker)
- **ORM**: Prisma
- **코드 하이라이팅**: react-syntax-highlighter

## 데이터베이스 스키마

블로그 플랫폼 구조로 7개 모델 구성:

1. **User** - 사용자 (기본 CRUD)
2. **Post** - 게시글 (관계형 쿼리, 필터링)
3. **Category** - 카테고리 (1:N 관계, GROUP BY)
4. **Comment** - 댓글 (자기참조 관계, 중첩 쿼리)
5. **Tag** - 태그 (N:M 관계)
6. **PostTag** - 게시글-태그 조인 테이블
7. **PostMetadata** - 메타데이터 (JSONB, 배열)

## 설치 및 실행

### 1. 사전 요구사항

- Node.js 20+ 설치
- Docker Desktop 설치 및 실행

### 2. 프로젝트 클론 및 의존성 설치

```bash
# 이미 클론되어 있다면 생략
cd nextjs-prisma-crud

# 의존성이 이미 설치되어 있지만 확인
npm install
```

### 3. Docker로 PostgreSQL 시작

```bash
# Docker Desktop이 실행 중인지 확인 후
docker-compose up -d

# 컨테이너 상태 확인
docker-compose ps
```

### 4. 데이터베이스 마이그레이션 및 시드

```bash
# Prisma 마이그레이션 실행 (테이블 생성)
npx prisma migrate dev --name init

# Prisma Client 생성
npx prisma generate

# 시드 데이터 생성 (샘플 데이터 삽입)
npx prisma db seed
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 주요 API 엔드포인트

### Prisma 쿼리 API

- `GET /api/prisma/users` - 전체 사용자 조회
- `POST /api/prisma/users` - 사용자 생성
- `GET /api/prisma/posts` - 게시글 목록 조회 (필터링, 페이지네이션)
- `POST /api/prisma/posts` - 게시글 생성

### Native 쿼리 API

- `GET /api/native/joins` - JOIN 쿼리 예제
- `GET /api/native/window` - Window 함수 예제
- `GET /api/native/aggregations` - GROUP BY 집계 예제

## 프로젝트 구조

```
nextjs-prisma-crud/
├── prisma/
│   ├── schema.prisma           # Prisma 스키마 정의
│   └── seed.ts                 # 시드 데이터
├── src/
│   ├── app/
│   │   ├── api/                # API 라우트
│   │   │   ├── prisma/         # Prisma 쿼리 API
│   │   │   └── native/         # Native 쿼리 API
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   └── page.tsx            # 홈 페이지
│   ├── lib/
│   │   └── prisma.ts           # Prisma 클라이언트 싱글톤
│   ├── services/
│   │   ├── user.service.ts     # 사용자 서비스
│   │   ├── post.service.ts     # 게시글 서비스
│   │   └── native-query.service.ts # Native 쿼리 서비스
│   └── types/
│       ├── dto.ts              # DTO 타입
│       ├── native-queries.ts   # Native 쿼리 결과 타입
│       └── api-responses.ts    # API 응답 타입
├── docker-compose.yml          # PostgreSQL 컨테이너 설정
└── .env                        # 환경 변수 (DATABASE_URL)
```

## 데이터베이스 관리

### Prisma Studio로 데이터 확인

```bash
npx prisma studio
```

브라우저에서 [http://localhost:5555](http://localhost:5555) 접속하여 데이터 확인/수정

### 데이터베이스 초기화

```bash
# 모든 데이터 삭제 및 재시드
npx prisma migrate reset
```

### Docker 컨테이너 관리

```bash
# 컨테이너 중지
docker-compose down

# 컨테이너 및 볼륨 삭제 (데이터 완전 삭제)
docker-compose down -v

# 컨테이너 재시작
docker-compose restart
```

## 환경 변수

`.env` 파일에 다음 환경 변수가 설정되어 있습니다:

```env
DATABASE_URL="postgresql://prisma_user:prisma_password@localhost:5432/prisma_crud_db?schema=public"
```

## 개발 중 유용한 명령어

```bash
# TypeScript 타입 체크
npm run build

# ESLint 실행
npm run lint

# Prisma 스키마 포맷팅
npx prisma format

# Prisma Client 재생성
npx prisma generate

# 마이그레이션 상태 확인
npx prisma migrate status
```

## 학습 포인트

### Prisma 일반 쿼리

- ✅ 타입 안전성 (TypeScript)
- ✅ 자동완성 지원
- ✅ 간결한 문법
- ✅ N+1 문제 자동 해결
- ⚠️ 복잡한 쿼리 제한
- ⚠️ PostgreSQL 특화 기능 제한

### Native 쿼리

- ✅ PostgreSQL 모든 기능 사용 가능
- ✅ 복잡한 집계/윈도우 함수
- ✅ 성능 최적화 가능
- ⚠️ 타입 안전성 수동 관리
- ⚠️ SQL 인젝션 주의 필요
- ⚠️ 데이터베이스 종속성

## 쿼리 선택 기준

### Prisma 사용이 적합한 경우

- 기본 CRUD 작업
- 타입 안전성이 중요한 경우
- 빠른 개발이 필요한 경우
- 간단한 관계형 쿼리

### Native 쿼리 사용이 적합한 경우

- Window 함수가 필요한 경우
- 복잡한 집계 쿼리
- JSONB, 배열 등 PostgreSQL 특화 기능
- 성능 최적화가 중요한 경우

## 트러블슈팅

### Docker 컨테이너가 시작되지 않는 경우

1. Docker Desktop이 실행 중인지 확인
2. 포트 5432가 사용 중인지 확인: `netstat -ano | findstr :5432`
3. 다른 PostgreSQL이 실행 중이면 중지

### Prisma Client 에러가 발생하는 경우

```bash
# Prisma Client 재생성
npx prisma generate

# 캐시 삭제 후 재설치
rm -rf node_modules
npm install
```

### 마이그레이션 에러가 발생하는 경우

```bash
# 데이터베이스 완전 초기화
npx prisma migrate reset

# 새로운 마이그레이션 생성
npx prisma migrate dev --name init
```

## 향후 개발 계획

- [ ] Prisma 쿼리 페이지 완성 (다양한 예제 추가)
- [ ] Native 쿼리 페이지 완성 (더 많은 Window 함수 예제)
- [ ] 참조 가이드 페이지 완성
- [ ] 코드 하이라이팅 컴포넌트 추가
- [ ] 실시간 쿼리 실행 UI 개선
- [ ] 성능 비교 차트 추가
- [ ] 더 많은 API 예제 추가

## 라이선스

MIT

## 기여

이 프로젝트는 학습용 레퍼런스이므로 자유롭게 포크하고 수정하여 사용하세요!
