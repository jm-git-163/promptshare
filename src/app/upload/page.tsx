"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Send, Layout, Type, FileText, Tag, Terminal } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    category: "WRITING",
    author_name: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('prompts')
        .insert([formData]);

      if (error) {
        // If Supabase is not connected, we simulate success for this demo
        console.error("Supabase error:", error);
        alert("Supabase 연결이 필요합니다. (데모를 위해 메인으로 이동합니다)");
      } else {
        alert("프롬프트가 성공적으로 업로드되었습니다!");
      }
      
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Send /> 프롬프트 업로드
          </h1>
          <p className="mt-2 text-indigo-100">
            커뮤니티와 공유하고 싶은 당신만의 프롬프트를 작성해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Type size={18} className="text-indigo-500" /> 제목
            </label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 창의적인 블로그 포스트 작성기"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Tag size={18} className="text-indigo-500" /> 카테고리
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="WRITING">WRITING</option>
                <option value="CODING">CODING</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="IMAGE">IMAGE</option>
                <option value="STUDY">STUDY</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Layout size={18} className="text-indigo-500" /> 작성자 이름
              </label>
              <input
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                placeholder="익명"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <FileText size={18} className="text-indigo-500" /> 한 줄 설명
            </label>
            <input
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="프롬프트의 용도와 특징을 짧게 설명해 주세요."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Terminal size={18} className="text-indigo-500" /> 프롬프트 본문 (Markdown 지원)
            </label>
            <textarea
              required
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={10}
              placeholder="여기에 실제 프롬프트 내용을 입력하세요. Markdown 형식을 사용할 수 있습니다."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "업로드 중..." : <><Send size={20} /> 프롬프트 공유하기</>}
          </button>
        </form>
      </div>
    </div>
  );
}
