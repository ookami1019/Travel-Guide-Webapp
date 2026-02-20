"use client";

import React, { useState } from "react";
import { Plus, ChevronUp, ChevronDown, Calendar, ClipboardList, Users, StickyNote, Image as ImageIcon, Type, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onAddBlock: (type: any) => void;
}

export function EditorRibbon({ onAddBlock }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const groups = [
    {
      label: "基本ブロック",
      items: [
        { id: "itinerary", label: "行程", icon: <Calendar size={20} />, color: "bg-blue-500" },
        { id: "luggage", label: "持ち物", icon: <ClipboardList size={20} />, color: "bg-emerald-500" },
        { id: "members", label: "メンバー", icon: <Users size={20} />, color: "bg-orange-500" },
      ]
    },
    {
      label: "装飾・その他",
      items: [
        { id: "memo", label: "メモ", icon: <StickyNote size={20} />, color: "bg-amber-400" },
        { id: "image", label: "写真", icon: <ImageIcon size={20} />, color: "bg-purple-500" },
        { id: "text", label: "テキスト", icon: <Type size={20} />, color: "bg-zinc-600" },
      ]
    },
    {
      label: "AI提案",
      items: [
        { id: "ai-spot", label: "スポット提案", icon: <Sparkles size={20} />, color: "bg-indigo-500" },
      ]
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm z-40 transition-all">
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex gap-4">
          <button className="text-[11px] font-bold text-indigo-600 border-b-2 border-indigo-600 pb-0.5 px-2">挿入</button>
          <button className="text-[11px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 pb-0.5 px-2">デザイン</button>
          <button className="text-[11px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 pb-0.5 px-2">表示</button>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white dark:bg-zinc-900"
          >
            <div className="p-3 flex gap-8 items-start overflow-x-auto no-scrollbar">
              {groups.map((group, idx) => (
                <div key={idx} className="flex gap-1 items-start">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onAddBlock(item.id)}
                          className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all min-w-[64px] group"
                        >
                          <div className={`p-2 ${item.color} text-white rounded-xl shadow-sm group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-tighter mt-1">
                      {group.label}
                    </span>
                  </div>
                  {idx < groups.length - 1 && (
                    <div className="w-[1px] h-12 bg-zinc-100 dark:bg-zinc-800 mx-4 self-center" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
