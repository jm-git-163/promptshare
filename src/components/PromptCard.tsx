import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function PromptCard({ prompt }: { prompt: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-md uppercase tracking-wide">
            {prompt.category || 'General'}
          </span>
          <span className="text-slate-400 text-xs font-medium">• {new Date(prompt.created_at).toLocaleDateString()}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{prompt.title}</h2>
        <p className="text-slate-600 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">{prompt.description}</p>
      </div>
      <Link 
        href={`/prompt/${prompt.id}`}
        className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:translate-x-1 transition-transform"
      >
        상세 보기 <ArrowRight size={16} />
      </Link>
    </div>
  );
}
