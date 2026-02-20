"use client";

import React, { useState } from "react";
import { Clock, MapPin, Plus, Trash2, Calendar, Car } from "lucide-react";
import { getTravelTime } from "@/lib/google-maps";

interface ScheduleItem {
  id: string;
  time: string;
  location: string;
  description: string;
}

interface DayPlan {
  id: string;
  dayNumber: number;
  items: ScheduleItem[];
}

export function ItineraryBlock() {
  const [days, setDays] = useState<DayPlan[]>([
    {
      id: "day-1",
      dayNumber: 1,
      items: [
        { id: "1-1", time: "09:00", location: "東京駅", description: "集合・出発" },
        { id: "1-2", time: "11:30", location: "箱根湯本駅", description: "到着・ランチ" },
      ]
    }
  ]);

  const addDay = () => {
    const newDay: DayPlan = {
      id: Math.random().toString(36).substr(2, 9),
      dayNumber: days.length + 1,
      items: [{ id: Math.random().toString(36).substr(2, 9), time: "09:00", location: "", description: "" }]
    };
    setDays([...days, newDay]);
  };

  const addItem = (dayId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          items: [...day.items, { id: Math.random().toString(36).substr(2, 9), time: "12:00", location: "", description: "" }]
        };
      }
      return day;
    }));
  };

  const updateItem = (dayId: string, itemId: string, field: keyof ScheduleItem, value: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          items: day.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
        };
      }
      return day;
    }));
  };

  const deleteItem = (dayId: string, itemId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return { ...day, items: day.items.filter(item => item.id !== itemId) };
      }
      return day;
    }));
  };

  const deleteDay = (dayId: string) => {
    if (days.length === 1) return;
    const newDays = days.filter(day => day.id !== dayId).map((day, index) => ({
      ...day,
      dayNumber: index + 1
    }));
    setDays(newDays);
  };

  return (
    <div className="w-full space-y-12">
      {days.map((day) => (
        <div key={day.id} className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <Calendar size={18} />
              <h4 className="font-bold text-lg">{day.dayNumber}日目</h4>
            </div>
            <button
              onClick={() => deleteDay(day.id)}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
            >
              日程を削除
            </button>
          </div>

          <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900/30 ml-4 pl-8 space-y-8">
            {day.items.map((item, index) => (
              <div key={item.id} className="relative group">
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border-4 border-[var(--primary)] z-10" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[var(--primary)]" />
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) => updateItem(day.id, item.id, "time", e.target.value)}
                      className="bg-transparent font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded px-1"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[var(--muted)]" />
                      <input
                        type="text"
                        placeholder="場所を入力"
                        value={item.location}
                        onChange={(e) => updateItem(day.id, item.id, "location", e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 focus:border-[var(--primary)] focus:outline-none transition-colors py-0.5"
                      />
                    </div>
                    <textarea
                      placeholder="メモ・詳細"
                      value={item.description}
                      onChange={(e) => updateItem(day.id, item.id, "description", e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg text-sm text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none h-16"
                    />
                  </div>

                  <div className="flex justify-end pr-2">
                    <button
                      onClick={() => deleteItem(day.id, item.id)}
                      className="p-2 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Travel Time Suggestion between items */}
                {index < day.items.length - 1 && (
                  <div className="mt-4 -ml-4 flex items-center gap-3">
                    <div className="h-8 w-[1px] bg-zinc-100 dark:bg-zinc-800" />
                    <button
                      onClick={async () => {
                        const nextItem = day.items[index + 1];
                        if (item.location && nextItem.location) {
                          const result = await getTravelTime(item.location, nextItem.location);
                          alert(`移動時間の目安: ${result.duration}\n距離: ${result.distance}`);
                        } else {
                          alert("出発地と到着地の両方を入力してください");
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 hover:text-[var(--primary)] hover:border-indigo-500/20 transition-all shadow-sm"
                    >
                      <Car size={12} />
                      移動時間を計算
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => addItem(day.id)}
            className="ml-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium text-zinc-500 hover:text-[var(--primary)] hover:border-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            予定を追加
          </button>
        </div>
      ))}

      <button
        onClick={addDay}
        className="w-full py-4 bg-indigo-500/5 border-2 border-indigo-500/10 rounded-2xl text-[var(--primary)] hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2 text-sm font-bold"
      >
        <Plus size={18} />
        日程を追加
      </button>
    </div>
  );
}
