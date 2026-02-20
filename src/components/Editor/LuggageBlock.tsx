"use client";

import React from "react";
import { CheckSquare, Square } from "lucide-react";

interface LuggageItem {
  id: string;
  name: string;
  isChecked: boolean;
}

interface LuggageCategory {
  id: string;
  name: string;
  items: LuggageItem[];
}

interface LuggageContent {
  categories?: LuggageCategory[];
}

interface Props {
  content?: Record<string, unknown>;
}

export function LuggageBlock({ content }: Props) {
  const typedContent = content as unknown as LuggageContent;
  const categories = typedContent?.categories || [];

  if (categories.length === 0) {
    return (
      <div className="w-full h-32 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-xl text-zinc-300 text-xs font-bold">
        持ち物が登録されていません
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h4 className="font-bold text-sm text-[var(--primary)] border-b border-zinc-100 dark:border-zinc-800 pb-1">
            {category.name || "名称未設定カテゴリ"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl transition-all"
              >
                <div className="text-[var(--primary)]">
                  {item.isChecked ? <CheckSquare size={18} /> : <Square size={18} className="text-zinc-400" />}
                </div>
                <span className={`flex-1 text-sm font-medium ${item.isChecked ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
                  {item.name || "名称未設定アイテム"}
                </span>
              </div>
            ))}
            {category.items.length === 0 && (
              <div className="text-xs text-zinc-400 italic py-2 pl-2">
                アイテムが登録されていません
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
