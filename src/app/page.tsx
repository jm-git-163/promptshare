import PromptCard from "@/components/PromptCard";
import { Prompt } from "@/types";
import { supabase } from "@/lib/supabase";
import { Search } from "lucide-react";

async function getPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    // Mock data for initial preview if Supabase is not connected
    return [
      {
        id: "1",
        created_at: new Date().toISOString(),
        title: "창의적인 블로그 포스트 작성기",
        description: "모든 주제에 대해 흥미롭고 SEO에 최적화된 블로그 포스트를 생성하는 프롬프트입니다.",
        body: "# Blog Post Generator\n\nWrite a 1000-word blog post about...",
        category: "WRITING",
        author_name: "PromptMaster"
      },
      {
        id: "2",
        created_at: new Date().toISOString(),
        title: "복잡한 코드 설명 및 최적화",
        description: "난해한 코드를 분석하고 더 효율적인 방법으로 리팩토링 및 설명해줍니다.",
        body: "Analyze the following code for complexity...",
        category: "CODING",
        author_name: "CodeGuru"
      },
      {
        id: "3",
        created_at: new Date().toISOString(),
        title: "역할 연기 마케팅 전문가",
        description: "브랜드 아이덴티티를 분석하고 타겟 오디언스에 맞는 마케팅 전략을 수립합니다.",
        body: "Act as a senior marketing strategist with 20 years of experience...",
        category: "BUSINESS",
        author_name: "StrategyWiz"
      }
    ];
  }

  return data;
}

export default async function Home() {
  const prompts = await getPrompts();

  return (
    <div className="space-y-12 py-10">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          최고의 <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">프롬프트</span>를 <br />
          공유하고 발견하세요
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          프롬프트 엔지니어링 커뮤니티의 지식을 한데 모았습니다. 
          실무에서 검증된 프롬프트로 AI의 잠재력을 깨우세요.
        </p>
        
        <div className="pt-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="검색어를 입력하세요 (예: 코딩, 작문, 마케팅...)" 
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {['전체', 'WRITING', 'CODING', 'BUSINESS', 'IMAGE', 'STUDY'].map((cat) => (
          <button 
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat === '전체' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
      
      {prompts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500">
          <p className="text-lg">아직 등록된 프롬프트가 없습니다.</p>
          <p className="text-sm">첫 번째 프롬프트를 업로드해 보세요!</p>
        </div>
      )}
    </div>
  );
}
