import Link from "next/link";
import { Prompt } from "@/types";
import { ChevronRight, Clock, User } from "lucide-react";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const formattedDate = new Date(prompt.created_at).toLocaleDateString('ko-KR');

  return (
    <Link href={`/prompt/${prompt.id}`}>
      <div className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
            {prompt.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {prompt.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {prompt.description}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User size={14} />
              {prompt.author_name || '익명'}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formattedDate}
            </span>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
