import React from "react";
import { Plus, Trash2, GripVertical, Clock, MapPin } from "lucide-react";

interface Spot {
  id: string;
  time: string;
  name: string;
  description: string;
}

interface ItineraryContent {
  spots?: Spot[];
}

interface Props {
  content: Record<string, unknown>;
  onChange: (newContent: Record<string, unknown>) => void;
}

export function ItineraryEditor({ content, onChange }: Props) {
  const typedContent = content as unknown as ItineraryContent;
  const spots = typedContent.spots || [];

  const addSpot = () => {
    const newSpot: Spot = {
      id: Math.random().toString(36).substring(2, 9),
      time: "10:00",
      name: "新しいスポット",
      description: "",
    };
    onChange({ ...content, spots: [...spots, newSpot] });
  };

  const updateSpot = (id: string, updates: Partial<Spot>) => {
    const newSpots = spots.map(s => s.id === id ? { ...s, ...updates } : s);
    onChange({ ...content, spots: newSpots });
  };

  const removeSpot = (id: string) => {
    const newSpots = spots.filter(s => s.id !== id);
    onChange({ ...content, spots: newSpots });
  };

  return (
    <div className="space-y-4">
      {spots.map((spot, index) => (
        <div key={spot.id} className="bg-white dark:bg-zinc-950 border text-xs border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-3 relative group">
          <div className="flex gap-2 items-center text-zinc-400 mb-1">
            <GripVertical size={14} className="cursor-grab" />
            <span className="font-bold text-[10px] uppercase">Spot {index + 1}</span>
            <button
              onClick={() => removeSpot(spot.id)}
              className="ml-auto p-1 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 rounded text-zinc-300 dark:text-zinc-500 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={14} className="text-zinc-400" />
            <input
              type="time"
              value={spot.time}
              onChange={(e) => updateSpot(spot.id, { time: e.target.value })}
              className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-zinc-400" />
            <input
              type="text"
              value={spot.name}
              placeholder="スポット名"
              onChange={(e) => updateSpot(spot.id, { name: e.target.value })}
              className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <textarea
            value={spot.description}
            placeholder="メモ（オプショナル）"
            onChange={(e) => updateSpot(spot.id, { description: e.target.value })}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-16"
          />
        </div>
      ))}

      <button
        onClick={addSpot}
        className="w-full py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
      >
        <Plus size={14} /> スポットを追加
      </button>
    </div>
  );
}
