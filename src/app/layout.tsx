import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Terminal } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Share - 프롬프트 엔지니어링 커뮤니티",
  description: "최고의 프롬프트를 공유하고 발견하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 min-h-screen`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <Terminal size={24} />
              <span>PromptShare</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="hover:text-indigo-600 font-medium">탐색하기</Link>
              <Link href="/upload" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                프롬프트 업로드
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t py-8 bg-white">
          <div className="container mx-auto px-4 text-center text-slate-500">
            <p>© 2026 PromptShare. Built for the Prompt Engineering Community.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
