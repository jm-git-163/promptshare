'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    category: 'ChatGPT'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('prompts').insert([formData]);

    if (error) {
      alert('등록 중 오류가 발생했습니다: ' + error.message);
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium gap-1 transition-colors">
          <ArrowLeft size={16} /> 홈으로 돌아가기
        </Link>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h1 className="text-3xl font-bold mb-8 text-slate-900 tracking-tight">새 프롬프트 등록</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">제목</label>
              <input 
                required
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
                placeholder="예: 업무 효율을 높이는 이메일 작성 비서"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">간략한 설명</label>
              <input 
                required
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300"
                placeholder="어떤 효과가 있는지 한 줄로 설명해주세요."
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">카테고리</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="Midjourney">Midjourney</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">프롬프트 본문 (Markdown 지원)</label>
              <textarea 
                required
                rows={10}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm placeholder:text-slate-300"
                placeholder="AI에게 입력할 실제 프롬프트를 적어주세요."
                onChange={(e) => setFormData({...formData, body: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? '등록 중...' : '프롬프트 공유하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
