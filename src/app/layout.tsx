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
              <div className="flex gap-6">
                <Link href="/prisma-queries" className="hover:text-blue-200 transition">
                  Prisma 쿼리
                </Link>
                <Link href="/native-queries" className="hover:text-blue-200 transition">
                  Native 쿼리
                </Link>
                <Link href="/reference" className="hover:text-blue-200 transition">
                  참조 가이드
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
