import { supabase } from "@/lib/supabase";
import { Prompt } from "@/types";
import ReactMarkdown from "react-markdown";
import { CopyButton } from "@/components/CopyButton";
import { Calendar, User, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPrompt(id: string): Promise<Prompt | null> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    // Fallback for mock data demo
    const mockPrompts = [
      {
        id: "1",
        created_at: new Date().toISOString(),
        title: "창의적인 블로그 포스트 작성기",
        description: "모든 주제에 대해 흥미롭고 SEO에 최적화된 블로그 포스트를 생성하는 프롬프트입니다.",
        body: "# Blog Post Generator\n\nYou are an expert content marketer. Your task is to write a high-quality blog post.\n\n## Instructions\n- Tone: Informative and engaging\n- Structure: Introduction, 3 subheadings, Conclusion\n- Length: 800-1000 words\n\nPlease write about: [TOPIC]",
        category: "WRITING",
        author_name: "PromptMaster"
      },
      {
        id: "2",
        created_at: new Date().toISOString(),
        title: "복잡한 코드 설명 및 최적화",
        description: "난해한 코드를 분석하고 더 효율적인 방법으로 리팩토링 및 설명해줍니다.",
        body: "Analyze the following code for complexity and suggest optimizations.\n\n```python\ndef slow_function(items):\n    result = []\n    for i in items:\n        if i not in result:\n            result.append(i)\n    return result\n```",
        category: "CODING",
        author_name: "CodeGuru"
      },
      {
        id: "3",
        created_at: new Date().toISOString(),
        title: "역할 연기 마케팅 전문가",
        description: "브랜드 아이덴티티를 분석하고 타겟 오디언스에 맞는 마케팅 전략을 수립합니다.",
        body: "Act as a senior marketing strategist with 20 years of experience. I will give you a brand name and its mission statement. You will then provide a comprehensive 3-month marketing plan including social media strategy, email campaigns, and potential partnership ideas.",
        category: "BUSINESS",
        author_name: "StrategyWiz"
      }
    ];
    return mockPrompts.find(p => p.id === id) || null;
  }

  return data;
}

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const prompt = await getPrompt(params.id);

  if (!prompt) {
    notFound();
  }

  const formattedDate = new Date(prompt.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        목록으로 돌아가기
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-slate-50">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Tag size={12} />
              {prompt.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
            {prompt.title}
          </h1>
          
          <p className="text-xl text-slate-500 mb-8 leading-relaxed">
            {prompt.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <User size={16} />
              </div>
              <span className="font-medium text-slate-600">{prompt.author_name || '익명'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-slate-50/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
              프롬프트 본문
            </h2>
            <CopyButton text={prompt.body} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm prose prose-indigo max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-headings:text-slate-900">
            <ReactMarkdown>{prompt.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
