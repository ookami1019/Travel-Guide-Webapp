"use client";

import React from "react";
import { Plus } from "lucide-react";
import { TravelPage } from "@/types/travel";

interface Props {
  pages: TravelPage[];
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
}

export function SidebarThumbnails({ pages, currentPageIndex, onSelectPage, onAddPage }: Props) {
  return (
    <div className="w-40 h-full bg-zinc-50/80 dark:bg-zinc-900/40 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto p-3 space-y-3 no-scrollbar shrink-0">
      <div className="flex flex-col gap-1 mb-2 px-1">
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter opacity-70">Pages</span>
        <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />
      </div>

      <div className="space-y-4">
        {pages.map((page, index) => (
          <div key={page.id} className="space-y-1">
            <button
              onClick={() => onSelectPage(index)}
              className={`w-full group relative aspect-[1/1.414] bg-white border-2 rounded-md overflow-hidden transition-all flex shadow-sm ${currentPageIndex === index
                ? 'border-indigo-500 ring-4 ring-indigo-500/10'
                : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
            >
              <div className="absolute left-1 top-1 bg-zinc-800/80 backdrop-blur-sm rounded-sm px-1 py-0.5 z-10">
                <span className="text-[8px] font-black text-white leading-none">{index + 1}</span>
              </div>

              {/* Thumbnail Content Visualization (Simplified) */}
              <div className="flex-1 p-2 bg-white space-y-0.5 overflow-hidden opacity-30">
                <div className="w-full h-1.5 bg-zinc-100 rounded-full" />
                <div className="w-2/3 h-1.5 bg-zinc-100 rounded-full" />
                <div className="w-full h-6 bg-zinc-50 rounded-sm mt-1" />
                <div className="w-full h-10 bg-zinc-50 rounded-sm" />
              </div>

              {/* Selection Overlay */}
              {currentPageIndex === index && (
                <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
              )}
            </button>
            <div className="flex items-center justify-center">
              <span className={`text-[9px] font-bold ${currentPageIndex === index ? 'text-indigo-600' : 'text-zinc-400'}`}>
                {index === 0 ? 'COVER' : index === pages.length - 1 ? 'BACK' : `PAGE ${index + 1}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onAddPage}
        className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-300 hover:text-indigo-400 hover:border-indigo-100 transition-all flex flex-col items-center justify-center gap-1 group"
      >
        <Plus size={14} className="group-hover:rotate-90 transition-transform" />
        <span className="text-[8px] font-bold underline decoration-dotted">PAGE SET</span>
      </button>
    </div>
  );
}
