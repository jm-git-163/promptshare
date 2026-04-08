import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import CopyButton from '../../../components/CopyButton';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const { data: prompt } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!prompt) return <div className="p-20 text-center font-bold">프롬프트를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium gap-1 transition-colors">
          <ArrowLeft size={16} /> 홈으로 돌아가기
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-indigo-600 p-8 md:p-12 text-white">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-1 text-xs font-bold bg-indigo-500/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <Tag size={12} /> {prompt.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold bg-indigo-500/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <Calendar size={12} /> {new Date(prompt.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold bg-indigo-500/50 px-3 py-1 rounded-full backdrop-blur-sm">
                <User size={12} /> {prompt.author_name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">{prompt.title}</h1>
            <p className="text-xl text-indigo-100 font-medium max-w-2xl leading-relaxed">{prompt.description}</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">프롬프트 본문</h2>
              <CopyButton text={prompt.body} />
            </div>
            
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6 prose-strong:text-indigo-600">
              <ReactMarkdown>{prompt.body}</ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
