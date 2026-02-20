"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { TravelBlock } from "@/types/travel";
import { ItineraryBlock } from "./ItineraryBlock";
import { LuggageBlock } from "./LuggageBlock";
import { MembersBlock } from "./MembersBlock";

interface Props {
  block: TravelBlock;
  onDelete: () => void;
}

export function SortableBlock({ block, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`group bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden ${isDragging ? 'shadow-xl ring-2 ring-indigo-500' : ''}`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={18} />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{block.title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200/50 transition-colors">
            <Settings size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-6">
        {block.type === "itinerary" && <ItineraryBlock />}
        {block.type === "luggage" && <LuggageBlock />}
        {block.type === "members" && <MembersBlock />}
        {block.type === "memo" && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium italic">メモエリア...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
