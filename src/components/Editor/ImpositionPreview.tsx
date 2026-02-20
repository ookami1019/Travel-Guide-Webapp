"use client";

import React from "react";
import { X, Printer, Download } from "lucide-react";
import { TravelPage } from "@/types/travel";

interface Props {
  pages: TravelPage[];
  onClose: () => void;
}

export function ImpositionPreview({ pages, onClose }: Props) {
  // 中綴じ面付けロジック
  const generateSheets = () => {
    const totalPages = Math.ceil(pages.length / 4) * 4;
    const sheets = [];
    for (let i = 0; i < totalPages / 2; i++) {
      const isFront = i % 2 === 0;
      const sheetIndex = Math.floor(i / 2);

      // サドルステッチの配置計算
      // 例: 4ページの場合
      // Sheet 1 Front: (P4, P1)
      // Sheet 1 Back:  (P2, P3)
      let leftIdx, rightIdx;
      if (isFront) {
        leftIdx = totalPages - 1 - sheetIndex;
        rightIdx = sheetIndex;
      } else {
        leftIdx = sheetIndex + 1;
        rightIdx = totalPages - 2 - sheetIndex;
      }

      sheets.push({
        label: `用紙 ${sheetIndex + 1} - ${isFront ? '表面' : '裏面'}`,
        leftPage: pages[leftIdx] || { id: `empty-${leftIdx}`, pageNum: leftIdx + 1, blocks: [] },
        rightPage: pages[rightIdx] || { id: `empty-${rightIdx}`, pageNum: rightIdx + 1, blocks: [] },
      });
    }
    return sheets;
  };

  const sheets = generateSheets();

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900/90 backdrop-blur-sm flex flex-col">
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-zinc-900 text-white">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">仕上がり確認（面付けプレビュー）</h2>
          <span className="px-2 py-0.5 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            {pages.length} Pages / {sheets.length / 2} Sheets
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-bold transition-colors">
            <Printer size={16} />
            印刷設定
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-500/20">
            <Download size={16} />
            PDFを保存
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-12 custom-scrollbar flex flex-col items-center gap-16">
        {sheets.map((sheet, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="h-[1px] flex-1 bg-white/5" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{sheet.label}</span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="w-[1000px] aspect-[1.414/1] bg-white shadow-2xl flex relative rounded-sm overflow-hidden ring-1 ring-white/10 scale-90">
              {/* Central Fold */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 z-10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[40px] -translate-x-1/2 bg-zinc-500/5 z-10" />

              {/* Left Page */}
              <div className="flex-1 h-full p-8 flex flex-col border-r border-zinc-50 overflow-hidden relative opacity-90 scale-[0.9] origin-top">
                <PreviewPageContent page={sheet.leftPage} />
                <div className="absolute bottom-4 left-4 text-[8px] font-bold text-zinc-300">P.{sheet.leftPage.pageNum}</div>
              </div>

              {/* Right Page */}
              <div className="flex-1 h-full p-8 flex flex-col overflow-hidden relative opacity-90 scale-[0.9] origin-top">
                <PreviewPageContent page={sheet.rightPage} />
                <div className="absolute bottom-4 right-4 text-[8px] font-bold text-zinc-300">P.{sheet.rightPage.pageNum}</div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

function PreviewPageContent({ page }: { page: TravelPage }) {
  if (page.blocks.length === 0 && page.pageNum === 1) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-100">
        <div className="w-16 h-16 bg-indigo-500 rounded-2xl mb-4" />
        <div className="w-24 h-3 bg-zinc-200 rounded-full" />
      </div>
    );
  }
  return (
    <div className="w-full h-full space-y-4">
      {page.blocks.map((block: any, i: number) => (
        <div key={i} className="p-4 bg-white border border-zinc-100 rounded-xl shadow-sm">
          <div className="h-2 w-1/3 bg-zinc-100 rounded-full mb-3" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-zinc-50 rounded-full" />
            <div className="h-1.5 w-5/6 bg-zinc-50 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
