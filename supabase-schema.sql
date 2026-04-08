-- 프롬프트 테이블 생성
create table prompts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  body text not null,
  category text not null,
  author_name text default 'Anonymous'
);

-- 권한 설정
GRANT ALL ON TABLE public.prompts TO authenticated;
GRANT ALL ON TABLE public.prompts TO anon;
GRANT ALL ON TABLE public.prompts TO service_role;
