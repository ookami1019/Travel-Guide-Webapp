"use client";

import React from "react";
import { SheetSide } from "@/lib/pdf-generator";

interface Props {
  sheets: any[];
  currentSheetIndex: number;
  onSelectSheet: (index: number) => void;
}

export function SidebarThumbnails({ sheets, currentSheetIndex, onSelectSheet }: Props) {
  return (
    <div className="w-64 h-full bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto p-4 space-y-4 no-scrollbar">
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">用紙一覧</span>
        <span className="text-[10px] font-bold text-zinc-300 tracking-tighter">{sheets.length} Sheets</span>
      </div>

      <div className="space-y-4">
        {sheets.map((sheet, index) => (
          <div key={index} className="space-y-1">
            <button
              onClick={() => onSelectSheet(index)}
              className={`w-full group relative aspect-[1.414/1] bg-white border-2 rounded-lg overflow-hidden transition-all flex shadow-sm ${currentSheetIndex === index
                  ? 'border-indigo-500 ring-4 ring-indigo-500/10'
                  : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
            >
              <div className="absolute left-1 flex flex-col gap-0.5 top-1">
                <span className="text-[8px] font-bold text-zinc-300 leading-none">{index + 1}</span>
              </div>

              {/* Thumbnail Content Visualization */}
              <div className="flex-1 grid grid-cols-2 gap-[1px] bg-zinc-100">
                <div className="bg-white flex items-center justify-center">
                  <div className="w-2/3 h-1/2 bg-zinc-50 rounded-sm" />
                </div>
                <div className="bg-white flex items-center justify-center">
                  <div className="w-2/3 h-1/2 bg-zinc-50 rounded-sm" />
                </div>
              </div>

              {/* Selection Overlay */}
              {currentSheetIndex === index && (
                <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
              )}
            </button>
            <div className="flex justify-between items-center px-1">
              <span className={`text-[10px] font-bold ${currentSheetIndex === index ? 'text-indigo-600' : 'text-zinc-500'}`}>
                Sheet {index + 1}
              </span>
              <span className="text-[8px] text-zinc-300 font-medium">A4 Horizontal</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-indigo-500 hover:border-indigo-200 transition-all flex flex-col items-center justify-center gap-1 group">
        <Plus size={16} className="group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold">用紙を追加</span>
      </button>
    </div>
  );
}

import { Plus } from "lucide-react";
