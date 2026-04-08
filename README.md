# PromptShare 🚀

프롬프트 엔지니어링 커뮤니티를 위한 프롬프트 공유 플랫폼입니다.

## 기술 스택

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown)

## 주요 기능

1. **프롬프트 피드:** 카드형 레이아웃으로 다양한 프롬프트를 한눈에 탐색.
2. **카테고리 필터링:** WRITING, CODING, BUSINESS 등 분야별 탐색 지원.
3. **상세 페이지:** 프롬프트의 전체 내용과 설명을 Markdown 형식으로 확인.
4. **복사 기능:** 클릭 한 번으로 프롬프트 본문을 클립보드에 복사.
5. **업로드 폼:** 제목, 설명, 본문, 카테고리를 입력하여 새로운 프롬프트 공유.

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 프로젝트의 정보를 입력합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 데이터베이스 설정

`supabase-schema.sql`의 쿼리를 Supabase SQL Editor에서 실행하여 테이블을 생성합니다.

### 3. 프로젝트 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.
