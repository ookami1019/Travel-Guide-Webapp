import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Travel栞 | 未来の旅行をデザインする",
  description: "旅行の計画からしおりの作成、印刷までを自動化。オリジナリティのあるデザイン性の高いしおりを簡単に。プロジェクト企画書 兼 要件定義書（ドラフト）に基づくMVP開発中。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
