"use client";

import React from "react";
import { Edit3, Plus, Trash2, GripVertical, ChevronRight } from "lucide-react";
import { TravelPage, TravelBlock } from "@/types/travel";

interface Props {
  page: TravelPage;
  onUpdateBlock: (blockId: string, content: any) => void;
  onDeleteBlock: (blockId: string) => void;
}

export function EditorRightPanel({ page, onUpdateBlock, onDeleteBlock }: Props) {
  return (
    <div className="w-80 h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden shrink-0">
      <header className="h-10 px-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50">
        <div className="flex items-center gap-2">
          <Edit3 size={14} className="text-zinc-400" />
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">コンテンツ編集</span>
        </div>
        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded">
          PAGE {page.pageNum}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
        {page.blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-zinc-300 border-2 border-dashed border-zinc-50 rounded-2xl p-6 text-center">
            <Plus size={24} className="mb-2 opacity-50" />
            <p className="text-[10px] font-bold leading-tight">上のリボンから<br />ブロックを追加してください</p>
          </div>
        ) : (
          <div className="space-y-4">
            {page.blocks.map((block) => (
              <div key={block.id} className="group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-50/80 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <GripVertical size={12} className="text-zinc-300 cursor-grab px-0" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase">{block.title}</span>
                  </div>
                  <button
                    onClick={() => onDeleteBlock(block.id)}
                    className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-zinc-300 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div className="p-4 bg-zinc-50/30">
                  {/* Block specific simplified editors could go here */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase">見出し</label>
                      <input
                        type="text"
                        defaultValue={block.title}
                        className="w-full text-xs font-medium bg-white border border-zinc-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                      />
                    </div>
                    <button className="w-full py-1.5 bg-zinc-900 text-white text-[9px] font-bold rounded flex items-center justify-center gap-1 hover:bg-zinc-800 transition-colors">
                      詳細を編集 <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30">
        <p className="text-[9px] text-zinc-400 leading-relaxed font-medium">
          ※ 編集した内容は、中央のプレビュー画面にリアルタイムで反映されます。
        </p>
      </footer>
    </div>
  );
}
