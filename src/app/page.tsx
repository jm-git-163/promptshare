import Link from 'next/link';
import { supabase } from '../lib/supabase';
import PromptCard from '../components/PromptCard';
import { PlusCircle } from 'lucide-react';

export default async function Home() {
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">PromptShare</Link>
          <Link 
            href="/upload" 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all font-medium"
          >
            <PlusCircle size={18} />
            새 프롬프트
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">최신 프롬프트 피드</h1>
        
        {!prompts || prompts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">아직 등록된 프롬프트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
