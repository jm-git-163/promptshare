-- 프롬프트 저장 테이블
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  body TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  author TEXT DEFAULT 'Anonymous'
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX idx_prompts_category ON prompts(category);
