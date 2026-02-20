import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase クライアント
 * 行程データの保存・読み込みに使用
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * しおりデータを保存する
 */
export async function saveTravelGuide(userId: string, title: string, blocks: any[]) {
  const { data, error } = await supabase
    .from('travel_guides')
    .upsert({
      user_id: userId,
      title,
      content: blocks,
      updated_at: new Date()
    });

  if (error) throw error;
  return data;
}

/**
 * 特定のしおりデータを取得する
 */
export async function fetchTravelGuide(guideId: string) {
  const { data, error } = await supabase
    .from('travel_guides')
    .select('*')
    .eq('id', guideId)
    .single();

  if (error) throw error;
  return data;
}
