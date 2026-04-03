import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://match-teenieping.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "매치 티니핑!",
  description: "티니핑 이미지를 보고 이름을 맞춰보세요! 캐치 티니핑 이름 맞추기 게임",
  openGraph: {
    title: "매치 티니핑!",
    description: "티니핑 이름 맞추기 게임 — 몇 점 받을 수 있을까요?",
    images: [{ url: "/api/og?score=5&total=5&difficulty=쉬움", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
