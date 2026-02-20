import { Client, TravelMode } from "@googlemaps/google-maps-services-js";

const client = new Client({});

/**
 * 2地点間の移動時間を取得する（Google Maps Routes API / Directions API 連携用）
 * APIキーがない場合はモックデータを返す
 */
export async function getTravelTime(origin: string, destination: string, mode: 'driving' | 'transit' = 'driving'): Promise<{ duration: string, distance: string }> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    console.warn("Google Maps API Key が設定されていません。モックデータを返します。");
    // モックロジック: 適当な時間を返す
    return {
      duration: "約 1時間 20分",
      distance: "45.2 km"
    };
  }

  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        mode: mode === 'driving' ? TravelMode.driving : TravelMode.transit,
        key: apiKey,
      }
    });

    const route = response.data.routes[0].legs[0];
    return {
      duration: route.duration.text,
      distance: route.distance.text
    };
  } catch (error) {
    console.error("Google Maps API 連携エラー:", error);
    throw error;
  }
}

/**
 * 入力されたルートに基づいて周辺のスッポトを提案する（Google Places API）
 */
export async function getRecommendedSpots(_location: string) {
  // 実装予定：Places API を用いたスポット検索
  console.log("Searching recommended spots for:", _location);
  return [
    { name: "おすすめの温泉", description: "景色が綺麗な露天風呂です" },
    { name: "人気のカフェ", description: "地元の食材を使ったスイーツが人気" }
  ];
}
