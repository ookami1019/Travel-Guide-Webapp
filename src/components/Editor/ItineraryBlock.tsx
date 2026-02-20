"use client";

import React from "react";
import { Clock, MapPin, Car } from "lucide-react";
import { getTravelTime } from "@/lib/google-maps";

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
  content?: Record<string, unknown>;
}

export function ItineraryBlock({ content }: Props) {
  const typedContent = content as unknown as ItineraryContent;
  const spots = typedContent?.spots || [];

  if (spots.length === 0) {
    return (
      <div className="w-full h-32 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-xl text-zinc-300 text-xs font-bold">
        行程が登録されていません
      </div>
    );
  }

  return (
    <div className="w-full relative border-l-2 border-indigo-100 dark:border-indigo-900/30 ml-2 pl-6 space-y-6">
      {spots.map((spot, index) => (
        <div key={spot.id} className="relative group">
          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-[3px] border-[var(--primary)] z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock size={14} className="text-[var(--primary)] shrink-0" />
              <span className="font-bold text-sm text-zinc-700 dark:text-zinc-300">{spot.time || "--:--"}</span>
            </div>

            <div className="md:col-span-3 space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin size={14} className="text-[var(--muted)] mt-1 shrink-0" />
                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 leading-tight">
                  {spot.name || "名称未設定"}
                </h4>
              </div>
              {spot.description && (
                <p className="text-xs text-[var(--muted)] pl-5 whitespace-pre-wrap leading-relaxed">
                  {spot.description}
                </p>
              )}
            </div>
          </div>

          {/* Travel Time Suggestion between items */}
          {index < spots.length - 1 && (
            <div className="mt-3 -ml-3 flex items-center gap-2">
              <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
              <button
                onClick={async () => {
                  const nextSpot = spots[index + 1];
                  if (spot.name && nextSpot.name) {
                    const result = await getTravelTime(spot.name, nextSpot.name);
                    alert(`移動時間の目安: ${result.duration}\n距離: ${result.distance}`);
                  } else {
                    alert("出発地と到着地の両方を入力してください");
                  }
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-full text-[9px] font-bold text-zinc-400 hover:text-[var(--primary)] hover:border-indigo-500/20 transition-all shadow-sm"
              >
                <Car size={10} />
                移動時間を計算
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
