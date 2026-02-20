"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Download, ChevronLeft, Settings, Share2 } from "lucide-react";
import Link from "next/link";
import { EditorRibbon } from "@/components/Editor/EditorRibbon";
import { SidebarThumbnails } from "@/components/Editor/SidebarThumbnails";
import { ItineraryBlock } from "@/components/Editor/ItineraryBlock";
import { LuggageBlock } from "@/components/Editor/LuggageBlock";
import { MembersBlock } from "@/components/Editor/MembersBlock";
import { PageContent, TravelSheet, TravelBlock, BlockType } from "@/types/travel";

export default function EditorPage() {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  // 初期データ（4ページ = 1シート分相当の構成）
  const [sheets, setSheets] = useState<TravelSheet[]>([
    {
      id: "sheet-1",
      leftPage: { id: "p-4", pageNum: 4, blocks: [] },
      rightPage: { id: "p-1", pageNum: 1, blocks: [] },
    },
    {
      id: "sheet-2",
      leftPage: {
        id: "p-2", pageNum: 2, blocks: [
          { id: "b1", type: "itinerary", title: "行程表", content: {} }
        ]
      },
      rightPage: {
        id: "p-3", pageNum: 3, blocks: [
          { id: "b2", type: "luggage", title: "持ち物リスト", content: {} }
        ]
      },
    }
  ]);

  const addBlock = (type: BlockType) => {
    const newBlock: TravelBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: type,
      content: {},
    };

    // 現在のシート・右ページに暫定的に追加するロジック
    setSheets(prev => prev.map((sheet, idx) => {
      if (idx === currentSheetIndex) {
        return {
          ...sheet,
          rightPage: {
            ...sheet.rightPage,
            blocks: [...sheet.rightPage.blocks, newBlock]
          }
        };
      }
      return sheet;
    }));
  };

  const handleExport = () => {
    alert("PDF出力の設定を開始します...");
  };

  return (
    <div className="h-screen flex flex-col bg-[#f0f2f5] dark:bg-zinc-950 overflow-hidden">
      {/* Top Header (PowerPoint Style) */}
      <header className="h-12 flex items-center justify-between px-4 bg-[#2b579a] text-white z-50 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:bg-white/10 p-1.5 rounded transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-[#2b579a] text-[10px] font-black">旅</span>
            </div>
            <h1 className="text-sm font-bold truncate max-w-[200px]">東京・箱根 1泊2日 - 旅行のしおり</h1>
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
            onClick={handleExport}
            className="px-4 py-1 bg-white text-[#2b579a] text-xs font-bold rounded-sm border border-white hover:bg-[#2b579a] hover:text-white transition-all flex items-center gap-2 ml-2"
          >
            <Download size={14} />
            PDF形式で保存
          </button>
        </div>
      </header>

      {/* Top Ribbon (Collapsible) */}
      <EditorRibbon onAddBlock={addBlock} />

      {/* Main Area: Sidebar + Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Thumbnails */}
        <SidebarThumbnails
          sheets={sheets}
          currentSheetIndex={currentSheetIndex}
          onSelectSheet={setCurrentSheetIndex}
        />

        {/* Center: Canvas Area */}
        <main className="flex-1 overflow-auto p-12 flex justify-center items-start bg-zinc-200/50 dark:bg-zinc-900/50 custom-scrollbar">
          <div className="relative">
            {/* A4 Canvas */}
            <div className="w-[1000px] aspect-[1.414/1] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-none flex relative rounded-sm overflow-hidden select-none">

              {/* Central Fold Mark */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 z-10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[40px] -translate-x-1/2 bg-zinc-500/5 pointer-events-none z-10" />

              {/* Left Page Editor */}
              <div className="flex-1 h-full border-r border-zinc-50 p-10 flex flex-col items-center relative">
                <PageContentRenderer page={sheets[currentSheetIndex].leftPage} position="left" />
              </div>

              {/* Right Page Editor */}
              <div className="flex-1 h-full p-10 flex flex-col items-center relative">
                <PageContentRenderer page={sheets[currentSheetIndex].rightPage} position="right" />
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Footer / Status Bar (PowerPoint Style) */}
      <footer className="h-6 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between px-3 text-[10px] text-zinc-500 font-medium">
        <div className="flex items-center gap-4">
          <span>用紙 {currentSheetIndex + 1} / {sheets.length}</span>
          <span>日本語 (日本)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>アクセシビリティ: 検討中</span>
          <div className="flex items-center gap-2">
            <span>100%</span>
            <div className="w-20 h-1 bg-zinc-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-zinc-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PageContentRenderer({ page, position }: { page: PageContent, position: 'left' | 'right' }) {
  const pageNumberDisplay = (
    <div className={`absolute bottom-6 ${position === 'left' ? 'left-6' : 'right-6'} pointer-events-none mix-blend-difference`}>
      <span className="text-[10px] font-bold text-zinc-100 tracking-tighter opacity-80 uppercase">
        P.{page.pageNum}
      </span>
    </div>
  );

  if (page.pageNum === 1) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-100 rounded-3xl relative">
        <div className="w-24 h-24 bg-indigo-500 rounded-3xl mb-8 flex items-center justify-center text-white shadow-xl rotate-3">
          <span className="text-4xl font-black italic">旅</span>
        </div>
        <h1 className="text-3xl font-black text-center text-zinc-900 leading-tight">旅のしおりタイトル</h1>
        <div className="mt-8 px-6 py-2 bg-zinc-50 rounded-full border border-zinc-100 text-[10px] font-bold text-zinc-400">
          FRONT COVER
        </div>
        {pageNumberDisplay}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 scale-[0.8] origin-top overflow-y-auto no-scrollbar pb-10">
      {page.blocks.map((block: TravelBlock) => (
        <div key={block.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-100 p-6 w-full">
          {block.type === 'itinerary' && <ItineraryBlock />}
          {block.type === 'luggage' && <LuggageBlock />}
          {block.type === 'members' && <MembersBlock />}
          {(block.type === 'memo' || block.type === 'text') && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-900 font-medium">自由記述メモエリア</p>
            </div>
          )}
        </div>
      ))}
      {page.blocks.length === 0 && (
        <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-50 rounded-3xl">
          <span className="text-[10px] font-bold text-zinc-300 italic">コンテンツを追加してください</span>
        </div>
      )}
      {pageNumberDisplay}
    </div>
  );
}
