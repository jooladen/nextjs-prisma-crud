import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prisma & PostgreSQL 레퍼런스",
  description: "Next.js, Prisma, PostgreSQL을 활용한 CRUD 학습 레퍼런스 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold hover:text-blue-200 transition">
                Prisma 레퍼런스
              </Link>
              <div className="hidden md:flex gap-6 items-center">
                <Link href="/prisma-queries" className="hover:text-blue-200 transition">
                  Prisma 쿼리
                </Link>
                <Link href="/prisma-includes" className="hover:text-blue-200 transition">
                  Include 가이드
                </Link>
                <Link href="/database-relationships" className="hover:text-blue-200 transition">
                  테이블 관계
                </Link>
                <Link href="/api-patterns" className="hover:text-blue-200 transition">
                  API 패턴
                </Link>
                <Link href="/advanced-queries" className="hover:text-blue-200 transition">
                  고급 쿼리
                </Link>
                <Link href="/native-queries" className="hover:text-blue-200 transition">
                  Native 쿼리
                </Link>
                <Link href="/common-pitfalls" className="hover:text-blue-200 transition">
                  자주하는 실수
                </Link>
                <Link href="/performance-tips" className="hover:text-blue-200 transition">
                  성능 팁
                </Link>
                <Link href="/reference" className="hover:text-blue-200 transition">
                  참조 가이드
                </Link>
              </div>
              {/* Mobile: Show simplified menu */}
              <div className="md:hidden text-sm">
                <Link href="/reference" className="hover:text-blue-200 transition">
                  전체 메뉴 →
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
