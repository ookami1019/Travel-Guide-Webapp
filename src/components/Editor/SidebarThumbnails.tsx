"use client";

import React from "react";
import { Plus, FileText } from "lucide-react";
import { TravelPage } from "@/types/travel";

interface Props {
  pages: TravelPage[];
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
}

export function SidebarThumbnails({ pages, currentPageIndex, onSelectPage, onAddPage }: Props) {
  return (
    <div className="w-64 h-full bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto p-4 space-y-4 no-scrollbar">
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ページ一覧</span>
        <span className="text-[10px] font-bold text-zinc-300 tracking-tighter">{pages.length} Pages</span>
      </div>

      <div className="space-y-4">
        {pages.map((page, index) => (
          <div key={page.id} className="space-y-1">
            <button
              onClick={() => onSelectPage(index)}
              className={`w-full group relative aspect-[1/1.414] bg-white border-2 rounded-lg overflow-hidden transition-all flex shadow-sm ${currentPageIndex === index
                  ? 'border-indigo-500 ring-4 ring-indigo-500/10'
                  : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
            >
              <div className="absolute left-2 top-2 bg-zinc-100 rounded px-1.5 py-0.5 z-10">
                <span className="text-[10px] font-black text-zinc-400 leading-none">{index + 1}</span>
              </div>

              {/* Thumbnail Content Visualization (Simplified) */}
              <div className="flex-1 p-4 bg-white space-y-1 overflow-hidden opacity-40">
                <div className="w-full h-2 bg-zinc-100 rounded-full" />
                <div className="w-2/3 h-2 bg-zinc-100 rounded-full" />
                <div className="w-full h-8 bg-zinc-50 rounded-md mt-2" />
                <div className="w-full h-12 bg-zinc-50 rounded-md" />
              </div>

              {/* Selection Overlay */}
              {currentPageIndex === index && (
                <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
              )}
            </button>
            <div className="flex justify-between items-center px-1">
              <span className={`text-[10px] font-bold ${currentPageIndex === index ? 'text-indigo-600' : 'text-zinc-500'}`}>
                {index === 0 ? '表紙' : index === pages.length - 1 ? '裏表紙' : `${index + 1}ページ`}
              </span>
              <span className="text-[8px] text-zinc-300 font-medium">A4 Vertical</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onAddPage}
        className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-indigo-500 hover:border-indigo-200 transition-all flex flex-col items-center justify-center gap-1 group"
      >
        <Plus size={16} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold">ページを追加</span>
      </button>
    </div>
  );
}
