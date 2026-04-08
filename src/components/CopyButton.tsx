'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
        copied 
        ? 'bg-green-100 text-green-700 ring-2 ring-green-500' 
        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
      }`}
    >
      {copied ? (
        <><Check size={18} /> 복사 완료!</>
      ) : (
        <><Copy size={18} /> 프롬프트 복사</>
      )}
    </button>
  );
}
