"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";

interface LuggageItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

export function LuggageBlock() {
  const [items, setItems] = useState<LuggageItem[]>([
    { id: "1", text: "着替え", checked: false, category: "基本" },
    { id: "2", text: "充電器", checked: false, category: "電子機器" },
    { id: "3", text: "洗面用具", checked: false, category: "基本" },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const addItem = () => {
    const newItem: LuggageItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      checked: false,
      category: "自由項目",
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemText = (id: string, text: string) => {
    setItems(items.map(item => item.id === id ? { ...item, text } : item));
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl group transition-all hover:ring-1 hover:ring-indigo-500/20"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="text-[var(--primary)] transition-colors"
            >
              {item.checked ? <CheckSquare size={20} /> : <Square size={20} className="text-zinc-400" />}
            </button>

            <input
              type="text"
              value={item.text}
              placeholder="アイテム名"
              onChange={(e) => updateItemText(item.id, e.target.value)}
              className={`flex-1 bg-transparent focus:outline-none text-sm ${item.checked ? 'text-zinc-400 line-through' : ''}`}
            />

            <button
              onClick={() => deleteItem(item.id)}
              className="p-1 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] hover:border-indigo-500/20 transition-all flex items-center justify-center gap-2 text-xs font-medium"
      >
        <Plus size={14} />
        アイテムを追加
      </button>
    </div>
  );
}
