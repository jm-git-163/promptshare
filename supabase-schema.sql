-- 프롬프트 저장 테이블 생성
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT DEFAULT '익명',
  likes_count INT DEFAULT 0
);

-- Row Level Security (RLS) 활성화
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능하도록 정책 설정
CREATE POLICY "Allow public read access" ON prompts FOR SELECT USING (true);

-- 인증된 사용자 또는 익명 사용자 모두 삽입 가능하도록 설정 (데모 용도)
CREATE POLICY "Allow all to insert" ON prompts FOR INSERT WITH CHECK (true);

-- (참고) 실제 운영 환경에서는 auth.users(id)를 author_id로 연결하여 사용하는 것이 좋습니다.
