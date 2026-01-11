import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 기존 데이터 삭제 (역순으로)
  await prisma.postMetadata.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ 기존 데이터 삭제 완료');

  // 1. 사용자 생성
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: '앨리스',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: '밥',
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie@example.com',
        name: '찰리',
      },
    }),
    prisma.user.create({
      data: {
        email: 'diana@example.com',
        name: '다이애나',
      },
    }),
    prisma.user.create({
      data: {
        email: 'edward@example.com',
        name: '에드워드',
      },
    }),
    prisma.user.create({
      data: {
        email: 'fiona@example.com',
        name: '피오나',
      },
    }),
    prisma.user.create({
      data: {
        email: 'george@example.com',
        name: '조지',
      },
    }),
    prisma.user.create({
      data: {
        email: 'hannah@example.com',
        name: '한나',
      },
    }),
    prisma.user.create({
      data: {
        email: 'isaac@example.com',
        name: '아이작',
      },
    }),
    prisma.user.create({
      data: {
        email: 'julia@example.com',
        name: '줄리아',
      },
    }),
  ]);

  console.log(`✅ ${users.length}명의 사용자 생성 완료`);

  // 2. 카테고리 생성
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: '프로그래밍',
        description: '프로그래밍 관련 글',
      },
    }),
    prisma.category.create({
      data: {
        name: '데이터베이스',
        description: '데이터베이스 및 SQL 관련 글',
      },
    }),
    prisma.category.create({
      data: {
        name: '웹 개발',
        description: '웹 개발 프레임워크 및 기술',
      },
    }),
    prisma.category.create({
      data: {
        name: '클라우드',
        description: '클라우드 서비스 및 인프라',
      },
    }),
    prisma.category.create({
      data: {
        name: '데브옵스',
        description: 'CI/CD, 배포, 모니터링',
      },
    }),
  ]);

  console.log(`✅ ${categories.length}개의 카테고리 생성 완료`);

  // 3. 게시글 생성 (50+개)
  const posts = [];
  const postData = [
    { title: 'TypeScript 시작하기', content: 'TypeScript는 JavaScript의 상위 집합으로 정적 타입을 제공합니다. 타입 안전성을 통해 런타임 에러를 줄이고 코드 품질을 향상시킬 수 있습니다.', categoryIdx: 0, authorIdx: 0, published: true, views: 1250 },
    { title: 'Next.js App Router 완벽 가이드', content: 'Next.js 13부터 도입된 App Router는 서버 컴포넌트를 기본으로 하여 성능을 크게 개선했습니다. 레이아웃, 로딩, 에러 처리가 훨씬 간편해졌습니다.', categoryIdx: 2, authorIdx: 0, published: true, views: 2340 },
    { title: 'Prisma ORM 활용법', content: 'Prisma는 타입 안전한 데이터베이스 ORM입니다. 스키마 정의, 마이그레이션, 쿼리 빌더를 제공하여 데이터베이스 작업을 쉽게 만듭니다.', categoryIdx: 1, authorIdx: 1, published: true, views: 980 },
    { title: 'PostgreSQL 윈도우 함수', content: 'ROW_NUMBER, RANK, DENSE_RANK 등의 윈도우 함수를 사용하면 복잡한 집계 쿼리를 간단하게 작성할 수 있습니다.', categoryIdx: 1, authorIdx: 1, published: true, views: 560 },
    { title: 'Docker로 개발 환경 구축', content: 'Docker Compose를 사용하면 일관된 개발 환경을 쉽게 구축할 수 있습니다. PostgreSQL, Redis 등을 컨테이너로 실행하세요.', categoryIdx: 4, authorIdx: 2, published: true, views: 1450 },
    { title: 'React Server Components 이해하기', content: 'React Server Components는 서버에서 렌더링되어 클라이언트로 전송됩니다. 번들 크기를 줄이고 초기 로딩 속도를 개선합니다.', categoryIdx: 2, authorIdx: 2, published: true, views: 1890 },
    { title: 'SQL JOIN 완벽 정리', content: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN의 차이점과 사용 시나리오를 실제 예제와 함께 알아봅니다.', categoryIdx: 1, authorIdx: 3, published: true, views: 3200 },
    { title: 'Tailwind CSS 실전 활용', content: 'Utility-first CSS 프레임워크인 Tailwind CSS를 사용하면 빠르고 일관된 디자인을 구현할 수 있습니다.', categoryIdx: 2, authorIdx: 3, published: true, views: 2100 },
    { title: 'GitHub Actions로 CI/CD 구축', content: 'GitHub Actions를 사용하여 자동화된 테스트, 빌드, 배포 파이프라인을 구성하는 방법을 단계별로 설명합니다.', categoryIdx: 4, authorIdx: 4, published: true, views: 1650 },
    { title: 'AWS Lambda 서버리스 아키텍처', content: 'AWS Lambda와 API Gateway를 사용한 서버리스 백엔드 구축 가이드입니다.', categoryIdx: 3, authorIdx: 4, published: true, views: 920 },
    { title: 'TypeScript 고급 타입', content: 'Utility Types, Conditional Types, Mapped Types 등 고급 TypeScript 타입 기능을 마스터하세요.', categoryIdx: 0, authorIdx: 5, published: true, views: 1340 },
    { title: 'Redis 캐싱 전략', content: 'Redis를 활용한 효과적인 캐싱 전략과 패턴을 소개합니다. TTL 설정, 캐시 무효화 전략 등을 다룹니다.', categoryIdx: 1, authorIdx: 5, published: true, views: 780 },
    { title: 'Kubernetes 기초', content: 'Kubernetes의 핵심 개념인 Pod, Service, Deployment를 이해하고 실제 애플리케이션을 배포해봅니다.', categoryIdx: 4, authorIdx: 6, published: true, views: 1560 },
    { title: 'GraphQL vs REST API', content: '두 API 아키텍처의 장단점을 비교하고 프로젝트에 맞는 선택 기준을 제시합니다.', categoryIdx: 2, authorIdx: 6, published: true, views: 2450 },
    { title: 'MongoDB 집계 파이프라인', content: 'MongoDB의 강력한 집계 프레임워크를 사용하여 복잡한 데이터 분석을 수행하는 방법입니다.', categoryIdx: 1, authorIdx: 7, published: true, views: 650 },
    { title: 'Vercel로 Next.js 배포하기', content: 'Vercel 플랫폼을 사용한 Next.js 애플리케이션 배포 및 설정 가이드입니다.', categoryIdx: 3, authorIdx: 7, published: true, views: 1980 },
    { title: 'Jest로 테스트 작성하기', content: 'Jest 테스팅 프레임워크를 사용한 단위 테스트, 통합 테스트 작성법을 배웁니다.', categoryIdx: 0, authorIdx: 8, published: true, views: 1120 },
    { title: 'Node.js 성능 최적화', content: '클러스터링, 워커 스레드, 메모리 관리 등 Node.js 애플리케이션 성능 최적화 기법입니다.', categoryIdx: 0, authorIdx: 8, published: true, views: 890 },
    { title: 'JSONB 데이터 타입 활용', content: 'PostgreSQL의 JSONB 타입을 사용한 유연한 스키마 설계 및 쿼리 방법을 알아봅니다.', categoryIdx: 1, authorIdx: 9, published: true, views: 540 },
    { title: 'AWS S3 파일 업로드', content: 'AWS SDK를 사용하여 S3에 파일을 안전하게 업로드하고 관리하는 방법입니다.', categoryIdx: 3, authorIdx: 9, published: true, views: 1240 },
    // 추가 게시글 (30개 더)
    { title: 'React Hook 완벽 가이드', content: 'useState, useEffect, useContext 등 React Hooks의 모든 것을 다룹니다.', categoryIdx: 2, authorIdx: 0, published: true, views: 2680 },
    { title: 'Python과 FastAPI', content: '현대적인 파이썬 웹 프레임워크 FastAPI로 빠른 API 서버를 구축하세요.', categoryIdx: 0, authorIdx: 1, published: true, views: 1450 },
    { title: 'Elasticsearch 검색 엔진', content: 'Elasticsearch를 사용한 전문 검색 시스템 구축 가이드입니다.', categoryIdx: 1, authorIdx: 2, published: true, views: 870 },
    { title: 'WebSocket 실시간 통신', content: 'WebSocket을 활용한 실시간 채팅, 알림 시스템 구현 방법입니다.', categoryIdx: 2, authorIdx: 3, published: true, views: 1590 },
    { title: 'Terraform 인프라 코드', content: 'Terraform으로 클라우드 인프라를 코드로 관리하는 IaC 접근법입니다.', categoryIdx: 4, authorIdx: 4, published: true, views: 1120 },
    { title: 'gRPC 마이크로서비스', content: 'gRPC를 사용한 고성능 마이크로서비스 아키텍처 설계 및 구현입니다.', categoryIdx: 0, authorIdx: 5, published: true, views: 760 },
    { title: 'Nginx 로드 밸런싱', content: 'Nginx를 활용한 로드 밸런싱 및 리버스 프록시 설정 방법입니다.', categoryIdx: 4, authorIdx: 6, published: true, views: 980 },
    { title: 'Vue.js Composition API', content: 'Vue 3의 Composition API로 더 나은 코드 재사용성을 달성하세요.', categoryIdx: 2, authorIdx: 7, published: true, views: 1350 },
    { title: 'OAuth 2.0 인증', content: 'OAuth 2.0 프로토콜을 사용한 소셜 로그인 구현 가이드입니다.', categoryIdx: 0, authorIdx: 8, published: true, views: 2100 },
    { title: 'Prometheus 모니터링', content: 'Prometheus와 Grafana를 사용한 애플리케이션 모니터링 시스템입니다.', categoryIdx: 4, authorIdx: 9, published: true, views: 890 },
    { title: 'Svelte 프레임워크', content: '컴파일 타임 프레임워크 Svelte의 독특한 접근 방식을 알아봅니다.', categoryIdx: 2, authorIdx: 0, published: true, views: 1450 },
    { title: 'RabbitMQ 메시지 큐', content: 'RabbitMQ를 사용한 비동기 메시지 처리 시스템 구축입니다.', categoryIdx: 0, authorIdx: 1, published: true, views: 670 },
    { title: 'Rust 프로그래밍', content: '메모리 안전성과 성능을 동시에 제공하는 Rust 언어 입문서입니다.', categoryIdx: 0, authorIdx: 2, published: true, views: 1890 },
    { title: 'DynamoDB NoSQL', content: 'AWS DynamoDB를 활용한 확장 가능한 NoSQL 데이터베이스 설계입니다.', categoryIdx: 1, authorIdx: 3, published: true, views: 740 },
    { title: 'Cypress E2E 테스트', content: 'Cypress로 프론트엔드 End-to-End 테스트를 작성하는 방법입니다.', categoryIdx: 2, authorIdx: 4, published: true, views: 1230 },
    { title: 'Apache Kafka 스트리밍', content: 'Apache Kafka를 사용한 대용량 실시간 데이터 스트리밍 처리입니다.', categoryIdx: 1, authorIdx: 5, published: true, views: 980 },
    { title: 'Flutter 모바일 앱', content: 'Flutter로 크로스 플랫폼 모바일 앱을 개발하는 완전 가이드입니다.', categoryIdx: 0, authorIdx: 6, published: true, views: 2340 },
    { title: 'Ansible 자동화', content: 'Ansible을 사용한 서버 설정 및 배포 자동화 플레이북 작성법입니다.', categoryIdx: 4, authorIdx: 7, published: true, views: 560 },
    { title: 'Supabase 백엔드', content: 'Supabase를 활용한 빠른 백엔드 구축 및 인증, 실시간 기능 구현입니다.', categoryIdx: 3, authorIdx: 8, published: true, views: 1670 },
    { title: 'Deno 런타임', content: 'Node.js의 대안 Deno의 특징과 TypeScript 네이티브 지원을 알아봅니다.', categoryIdx: 0, authorIdx: 9, published: true, views: 890 },
    { title: '머신러닝 기초', content: 'Python과 scikit-learn으로 시작하는 머신러닝 기초 입문서입니다.', categoryIdx: 0, authorIdx: 0, published: false, views: 120 },
    { title: 'Clean Code 원칙', content: '읽기 쉽고 유지보수 가능한 코드를 작성하는 원칙과 패턴입니다.', categoryIdx: 0, authorIdx: 1, published: false, views: 340 },
    { title: 'API 버저닝 전략', content: 'RESTful API의 버전 관리 전략과 하위 호환성 유지 방법입니다.', categoryIdx: 2, authorIdx: 2, published: false, views: 210 },
    { title: 'SOLID 디자인 원칙', content: '객체지향 프로그래밍의 5가지 핵심 SOLID 원칙을 실전 예제로 배웁니다.', categoryIdx: 0, authorIdx: 3, published: false, views: 450 },
    { title: 'Git 고급 사용법', content: 'rebase, cherry-pick, bisect 등 Git의 고급 기능을 마스터하세요.', categoryIdx: 0, authorIdx: 4, published: false, views: 670 },
    { title: 'Design Patterns', content: '싱글톤, 팩토리, 옵저버 등 자주 사용되는 디자인 패턴을 알아봅니다.', categoryIdx: 0, authorIdx: 5, published: false, views: 890 },
    { title: 'PostgreSQL 인덱싱 전략', content: 'B-Tree, Hash, GiST 등 다양한 인덱스 타입과 최적 활용법입니다.', categoryIdx: 1, authorIdx: 6, published: true, views: 1340 },
    { title: 'Zustand 상태 관리', content: '가볍고 간단한 React 상태 관리 라이브러리 Zustand 활용법입니다.', categoryIdx: 2, authorIdx: 7, published: true, views: 980 },
    { title: 'Vite 빌드 툴', content: '초고속 프론트엔드 빌드 툴 Vite의 특징과 설정 방법입니다.', categoryIdx: 2, authorIdx: 8, published: true, views: 1560 },
    { title: 'SQL 트랜잭션', content: 'ACID 속성과 트랜잭션 격리 수준을 이해하고 올바르게 사용하세요.', categoryIdx: 1, authorIdx: 9, published: true, views: 780 },
  ];

  for (const data of postData) {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        viewCount: data.views,
        authorId: users[data.authorIdx].id,
        categoryId: categories[data.categoryIdx].id,
      },
    });
    posts.push(post);
  }

  console.log(`✅ ${posts.length}개의 게시글 생성 완료`);

  // 4. 태그 생성
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'JavaScript' } }),
    prisma.tag.create({ data: { name: 'TypeScript' } }),
    prisma.tag.create({ data: { name: 'React' } }),
    prisma.tag.create({ data: { name: 'Next.js' } }),
    prisma.tag.create({ data: { name: 'Node.js' } }),
    prisma.tag.create({ data: { name: 'PostgreSQL' } }),
    prisma.tag.create({ data: { name: 'Docker' } }),
    prisma.tag.create({ data: { name: 'AWS' } }),
    prisma.tag.create({ data: { name: 'Prisma' } }),
    prisma.tag.create({ data: { name: 'Tailwind' } }),
    prisma.tag.create({ data: { name: 'Git' } }),
    prisma.tag.create({ data: { name: 'Testing' } }),
    prisma.tag.create({ data: { name: 'Performance' } }),
    prisma.tag.create({ data: { name: 'Security' } }),
    prisma.tag.create({ data: { name: 'Backend' } }),
  ]);

  console.log(`✅ ${tags.length}개의 태그 생성 완료`);

  // 5. 게시글-태그 연결 (PostTag)
  const postTagRelations = [
    { postIdx: 0, tagIdx: 1 }, // TypeScript 시작하기 - TypeScript
    { postIdx: 0, tagIdx: 0 }, // TypeScript 시작하기 - JavaScript
    { postIdx: 1, tagIdx: 3 }, // Next.js App Router - Next.js
    { postIdx: 1, tagIdx: 2 }, // Next.js App Router - React
    { postIdx: 2, tagIdx: 8 }, // Prisma ORM - Prisma
    { postIdx: 2, tagIdx: 5 }, // Prisma ORM - PostgreSQL
    { postIdx: 3, tagIdx: 5 }, // PostgreSQL 윈도우 함수 - PostgreSQL
    { postIdx: 4, tagIdx: 6 }, // Docker - Docker
    { postIdx: 5, tagIdx: 2 }, // React Server Components - React
    { postIdx: 6, tagIdx: 5 }, // SQL JOIN - PostgreSQL
    { postIdx: 7, tagIdx: 9 }, // Tailwind CSS - Tailwind
    { postIdx: 10, tagIdx: 1 }, // TypeScript 고급 타입 - TypeScript
    { postIdx: 16, tagIdx: 11 }, // Jest 테스트 - Testing
  ];

  for (const relation of postTagRelations) {
    await prisma.postTag.create({
      data: {
        postId: posts[relation.postIdx].id,
        tagId: tags[relation.tagIdx].id,
      },
    });
  }

  console.log(`✅ ${postTagRelations.length}개의 게시글-태그 연결 완료`);

  // 6. 댓글 생성 (100+ 개, 일부는 대댓글)
  const comments = [];

  // 각 게시글에 2-5개의 댓글 추가
  for (let i = 0; i < Math.min(20, posts.length); i++) {
    const commentCount = Math.floor(Math.random() * 4) + 2; // 2-5개

    for (let j = 0; j < commentCount; j++) {
      const authorIdx = Math.floor(Math.random() * users.length);
      const comment = await prisma.comment.create({
        data: {
          content: `${posts[i].title}에 대한 훌륭한 글입니다! 많은 도움이 되었습니다.`,
          postId: posts[i].id,
          authorId: users[authorIdx].id,
        },
      });
      comments.push(comment);
    }
  }

  // 대댓글 추가 (일부 댓글에 대한 답글)
  for (let i = 0; i < Math.min(30, comments.length); i++) {
    const authorIdx = Math.floor(Math.random() * users.length);
    await prisma.comment.create({
      data: {
        content: '좋은 의견 감사합니다! 추가 설명을 드리자면...',
        postId: comments[i].postId,
        authorId: users[authorIdx].id,
        parentId: comments[i].id,
      },
    });
  }

  console.log(`✅ 100+ 개의 댓글 생성 완료`);

  // 7. PostMetadata 생성 (일부 게시글에 대해)
  for (let i = 0; i < Math.min(20, posts.length); i++) {
    await prisma.postMetadata.create({
      data: {
        postId: posts[i].id,
        metadata: {
          readingTime: Math.floor(Math.random() * 10) + 3, // 3-12분
          seo: {
            title: `${posts[i].title} | 개발 블로그`,
            description: posts[i].content.substring(0, 150),
            ogImage: '/images/default-og.png',
          },
          featured: i < 5, // 처음 5개는 추천 글
        },
        keywords: ['개발', '프로그래밍', 'IT', 'Tech'],
      },
    });
  }

  console.log(`✅ 20개의 메타데이터 생성 완료`);

  // 최종 통계
  const stats = {
    users: await prisma.user.count(),
    categories: await prisma.category.count(),
    posts: await prisma.post.count(),
    comments: await prisma.comment.count(),
    tags: await prisma.tag.count(),
    postTags: await prisma.postTag.count(),
    metadata: await prisma.postMetadata.count(),
  };

  console.log('\n🎉 시드 데이터 생성 완료!');
  console.log('📊 생성된 데이터:');
  console.log(`   - 사용자: ${stats.users}명`);
  console.log(`   - 카테고리: ${stats.categories}개`);
  console.log(`   - 게시글: ${stats.posts}개`);
  console.log(`   - 댓글: ${stats.comments}개`);
  console.log(`   - 태그: ${stats.tags}개`);
  console.log(`   - 게시글-태그 연결: ${stats.postTags}개`);
  console.log(`   - 메타데이터: ${stats.metadata}개`);
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 생성 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
