"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Download, ChevronLeft, Settings, Share2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { EditorRibbon } from "@/components/Editor/EditorRibbon";
import { SidebarThumbnails } from "@/components/Editor/SidebarThumbnails";
import { EditorRightPanel } from "@/components/Editor/EditorRightPanel";
import { ItineraryBlock } from "@/components/Editor/ItineraryBlock";
import { LuggageBlock } from "@/components/Editor/LuggageBlock";
import { MembersBlock } from "@/components/Editor/MembersBlock";
import { ImpositionPreview } from "@/components/Editor/ImpositionPreview";
import { TravelPage, TravelBlock, BlockType } from "@/types/travel";

export default function EditorPage() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showImpositionPreview, setShowImpositionPreview] = useState(false);

  // 4の倍数で管理
  const [pages, setPages] = useState<TravelPage[]>([
    { id: "p1", pageNum: 1, blocks: [] },
    { id: "p2", pageNum: 2, blocks: [{ id: "b1", type: "itinerary", title: "行程表", content: {} }] },
    { id: "p3", pageNum: 3, blocks: [{ id: "b2", type: "luggage", title: "持ち物リスト", content: {} }] },
    { id: "p4", pageNum: 4, blocks: [] },
  ]);

  const addBlock = (type: BlockType) => {
    const newBlock: TravelBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: type === 'itinerary' ? '行程表' : type === 'luggage' ? '持ち物' : type === 'members' ? 'メンバー' : 'メモ',
      content: {},
    };

    setPages(prev => prev.map((page, idx) => {
      if (idx === currentPageIndex) {
        return {
          ...page,
          blocks: [...page.blocks, newBlock]
        };
      }
      return page;
    }));
  };

  const deleteBlock = (blockId: string) => {
    setPages(prev => prev.map((page, idx) => {
      if (idx === currentPageIndex) {
        return {
          ...page,
          blocks: page.blocks.filter(b => b.id !== blockId)
        };
      }
      return page;
    }));
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    // 将来的な同期ロジック
    console.log("Update block", blockId, content);
  };

  const addPageSet = () => {
    const newPageStart = pages.length + 1;
    const newPages: TravelPage[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `p${newPageStart + i}-${Math.random().toString(36).substr(2, 4)}`,
      pageNum: newPageStart + i,
      blocks: [],
    }));
    setPages([...pages, ...newPages]);
  };

  const currentPage = pages[currentPageIndex];

  return (
    <div className="h-screen flex flex-col bg-[#f0f2f5] dark:bg-zinc-950 overflow-hidden font-[var(--font-outfit)]">
      {/* Top Header */}
      <header className="h-12 flex items-center justify-between px-4 bg-[#2b579a] text-white z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:bg-white/10 p-1.5 rounded transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#2b579a] text-[10px] font-black">旅</span>
            </div>
            <h1 className="text-sm font-bold truncate max-w-[200px]">東京・箱根 1泊2日</h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-white/10 rounded-md transition-all text-white/80 hover:text-white" title="共有">
            <Share2 size={16} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-md transition-all text-white/80 hover:text-white" title="設定">
            <Settings size={16} />
          </button>
          <div className="w-[1px] h-4 bg-white/20 mx-2" />
          <button
            onClick={() => setShowImpositionPreview(true)}
            className="px-4 py-1 bg-white text-[#2b579a] text-xs font-bold rounded-sm border border-white hover:bg-[#2b579a] hover:text-white transition-all flex items-center gap-2 ml-2"
          >
            <Download size={14} />
            仕上がり確認・保存
          </button>
        </div>
      </header>

      {/* Top Ribbon */}
      <EditorRibbon onAddBlock={addBlock} />

      {/* Main Area: 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: スリムサイドバー */}
        <SidebarThumbnails
          pages={pages}
          currentPageIndex={currentPageIndex}
          onSelectPage={setCurrentPageIndex}
          onAddPage={addPageSet}
        />

        {/* Center: プレビューキャンバス */}
        <main className="flex-1 overflow-auto p-12 flex justify-center items-start bg-zinc-100/30 dark:bg-zinc-900/50 custom-scrollbar relative">
          <div className="relative">
            <div className="absolute -top-8 left-0 right-0 flex justify-between px-4 items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Preview Mode
              </span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Logical Page {currentPage.pageNum}</span>
            </div>

            <div className="w-[600px] h-[848px] bg-white shadow-2xl relative rounded-sm overflow-hidden flex flex-col pointer-events-none ring-1 ring-zinc-200/50">
              <PageContentRenderer page={currentPage} />
            </div>
          </div>
        </main>

        {/* Right: 編集パネル */}
        <EditorRightPanel
          page={currentPage}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={deleteBlock}
        />
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between px-3 text-[10px] text-zinc-500 font-medium">
        <div className="flex items-center gap-4">
          <span>ページ {currentPageIndex + 1} / {pages.length}</span>
          <span>Property Editor Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            印刷範囲内
          </span>
          <div className="flex items-center gap-2">
            <span>100%</span>
            <div className="w-16 h-1 bg-zinc-200 rounded-full">
              <div className="w-full h-full bg-zinc-400" />
            </div>
          </div>
        </div>
      </footer>

      {showImpositionPreview && (
        <ImpositionPreview pages={pages} onClose={() => setShowImpositionPreview(false)} />
      )}
    </div>
  );
}

function PageContentRenderer({ page }: { page: TravelPage }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const isOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setIsOverflowing(isOverflow);
    }
  }, [page.blocks]);

  const pageNumberDisplay = (
    <div className="absolute bottom-6 right-6 pointer-events-none mix-blend-difference z-20">
      <span className="text-[10px] font-bold text-zinc-100 tracking-tighter opacity-80 uppercase">
        P.{page.pageNum}
      </span>
    </div>
  );

  if (page.pageNum === 1) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-100 relative bg-white">
        <div className="w-32 h-32 bg-indigo-500 rounded-3xl mb-12 flex items-center justify-center text-white shadow-xl rotate-3">
          <span className="text-5xl font-black italic">旅</span>
        </div>
        <h1 className="text-4xl font-black text-center text-zinc-900 leading-tight">旅のしおりタイトル</h1>
        <div className="mt-12 px-8 py-3 bg-zinc-50 rounded-full border border-zinc-100 text-xs font-bold text-zinc-400 uppercase">
          Front Cover
        </div>
        {pageNumberDisplay}
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      className={`w-full h-full flex flex-col p-10 origin-top overflow-hidden relative transition-all duration-300 ${isOverflowing ? 'gap-2 bg-red-50/10' : 'gap-6 bg-white'
        }`}
    >
      {isOverflowing && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <AlertCircle size={14} />
          <span className="text-[10px] font-bold">印刷範囲を超えています</span>
        </div>
      )}

      {page.blocks.map((block: TravelBlock) => (
        <div
          key={block.id}
          className={`bg-white rounded-2xl shadow-sm ring-1 ring-zinc-100 p-6 w-full transition-all ${isOverflowing ? 'scale-[0.95]' : 'scale-100'
            }`}
        >
          <div className="flex items-center justify-between mb-3 border-b border-zinc-50 pb-1">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{block.title}</span>
          </div>
          <div className={isOverflowing ? 'scale-[0.9] origin-top' : ''}>
            {block.type === 'itinerary' && <div className="space-y-4 opacity-100"><ItineraryBlock /></div>}
            {block.type === 'luggage' && <LuggageBlock />}
            {block.type === 'members' && <MembersBlock />}
            {(block.type === 'memo' || block.type === 'text') && (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 text-amber-900/40 text-xs italic">
                📝 自由記述エリア
              </div>
            )}
          </div>
        </div>
      ))}

      {page.blocks.length === 0 && (
        <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-50 rounded-3xl opacity-20">
          <span className="text-[10px] font-bold text-zinc-300 italic uppercase">Preview Area</span>
        </div>
      )}
      {pageNumberDisplay}
    </div>
  );
}
