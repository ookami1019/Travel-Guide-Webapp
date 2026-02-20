import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Clock, MapPin, Car, Loader2 } from "lucide-react";
import { getTravelTime } from "@/lib/google-maps";

interface Spot {
  id: string;
  time: string;
  name: string;
  description: string;
  travelTime?: string;
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
  const [calculatingIndex, setCalculatingIndex] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<{ name: string, description: string }[]>([]);
  const [isSearchingRecs, setIsSearchingRecs] = useState(false);

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
    // If we removed a spot, we might need to clear the travelTime of the new preceding spot if it's now the last one
    if (newSpots.length > 0) {
      newSpots[newSpots.length - 1].travelTime = undefined;
    }
    onChange({ ...content, spots: newSpots });
  };

  const handleCalculateTravelTime = async (index: number, currentSpot: Spot, nextSpot: Spot) => {
    if (!currentSpot.name || !nextSpot.name) {
      alert("出発地と到着地の両方を入力してください");
      return;
    }

    setCalculatingIndex(index);
    try {
      const result = await getTravelTime(currentSpot.name, nextSpot.name);
      updateSpot(currentSpot.id, { travelTime: `${result.duration} (${result.distance})` });
    } catch (error) {
      console.error(error);
      alert("移動時間の計算に失敗しました");
    } finally {
      setCalculatingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {spots.map((spot, index) => (
        <React.Fragment key={spot.id}>
          <div className="bg-white dark:bg-zinc-950 border text-xs border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-3 relative group">
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

          {/* Travel Time UI between spots */}
          {index < spots.length - 1 && (
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1 text-[10px] font-bold text-zinc-500 flex items-center gap-2 shadow-sm">
                <Car size={12} className="text-indigo-400" />
                {spot.travelTime ? (
                  <span className="flex items-center gap-2">
                    {spot.travelTime}
                    <button
                      onClick={() => handleCalculateTravelTime(index, spot, spots[index + 1])}
                      title="再計算"
                      className="text-zinc-400 hover:text-indigo-500"
                    >
                      {calculatingIndex === index ? <Loader2 size={10} className="animate-spin" /> : "↻"}
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={() => handleCalculateTravelTime(index, spot, spots[index + 1])}
                    disabled={calculatingIndex === index}
                    className="hover:text-indigo-500 disabled:opacity-50 flex items-center gap-1"
                  >
                    {calculatingIndex === index ? (
                      <><Loader2 size={10} className="animate-spin" /> 計算中...</>
                    ) : (
                      "移動時間を計算"
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={addSpot}
        className="w-full py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all mt-4"
      >
        <Plus size={14} /> スポットを追加
      </button>

      {/* Recommended Spots Section */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 mt-6 !mb-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <span className="text-amber-500">💡</span> AIおすすめ周辺スポット
          </h4>
          <button
            onClick={async () => {
              const lastSpot = spots[spots.length - 1];
              if (!lastSpot?.name) {
                alert("最後のスポット名を入力してから検索してください");
                return;
              }
              setIsSearchingRecs(true);
              try {
                const { getRecommendedSpots } = await import('@/lib/google-maps');
                const recs = await getRecommendedSpots(lastSpot.name);
                setRecommendations(recs);
              } catch (e) {
                console.error(e);
                alert("おすすめスポットの取得に失敗しました");
              } finally {
                setIsSearchingRecs(false);
              }
            }}
            disabled={isSearchingRecs || spots.length === 0}
            className="text-[10px] bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 px-2 py-1 rounded-full font-bold hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors disabled:opacity-50"
          >
            {isSearchingRecs ? <Loader2 size={10} className="animate-spin inline mr-1" /> : null}
            周辺を検索
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100/50 dark:border-amber-900/30 rounded p-2 flex items-start gap-2 group">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{rec.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{rec.description}</p>
                </div>
                <button
                  onClick={() => {
                    const newSpot: Spot = {
                      id: Math.random().toString(36).substring(2, 9),
                      time: "",
                      name: rec.name,
                      description: rec.description,
                    };
                    onChange({ ...content, spots: [...spots, newSpot] });
                    // Remove accepted recommendation
                    setRecommendations(recommendations.filter((_, idx) => idx !== i));
                  }}
                  className="shrink-0 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded shadow-sm text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
