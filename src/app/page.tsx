"use client";

import { motion } from "framer-motion";
import { Plane, Map, Package, Download, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:pt-40 md:pb-32 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/20 rounded-full bg-indigo-500/5 text-[var(--primary)]">
            未来の旅行をデザインする
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-outfit)] mb-6 tracking-tight">
            想い出を形にする、<br />
            <span className="gradient-text">最高の旅行しおり。</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            AIによるルート自動予測、直感的なブロック型エディタ、そして印刷に最適化されたPDF出力。
            機能美と実用性を兼ね備えた、新しい旅のパートナー。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <button className="px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group">
                しおりを作成する
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 bg-[var(--secondary)] text-[var(--foreground)] font-bold rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
              デモを見る
            </button>
          </div>
        </motion.div>

        {/* Floating elements animation */}
        <div className="mt-20 relative w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="premium-card aspect-[16/9] w-full flex items-center justify-center border-indigo-500/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <FeatureIcon icon={<Map />} label="自動ルート提案" />
              <FeatureIcon icon={<Package />} label="持ち物リスト" />
              <FeatureIcon icon={<Download />} label="PDF印刷対応" />
              <FeatureIcon icon={<Plane />} label="旅程管理" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-outfit)]">プロフェッショナルな機能を、すべての人に。</h2>
            <p className="text-[var(--muted)]">プロジェクト企画書 兼 要件定義書（ドラフト）に基づいた核心機能</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="ブロック型エディタ"
              description="行程、持ち物、メンバー。すべてをブロックとしてドラッグ＆ドロップで自由に配置可能。"
            />
            <FeatureCard
              title="自動計算アシスト"
              description="Google Maps API 連携により、移動時間を自動予測。予定の変更も瞬時に再計算。"
            />
            <FeatureCard
              title="印刷面付けPDF"
              description="A4用紙・2つ折りに最適化されたレイアウトで出力。そのまま製本して持ち歩けます。"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-4 bg-indigo-500/10 rounded-2xl text-[var(--primary)]">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="premium-card border-transparent bg-white dark:bg-zinc-800">
      <div className="mb-4 text-indigo-500"><Star fill="currentColor" size={24} /></div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--muted)] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
