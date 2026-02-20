export type BlockType = "itinerary" | "luggage" | "members" | "memo" | "image" | "text" | "ai-spot";

export interface TravelBlock {
  id: string;
  type: BlockType;
  title: string;
  content: any;
}

// ユーザーが編集時に扱う「論理ページ」
export interface TravelPage {
  id: string;
  pageNum: number;
  blocks: TravelBlock[];
}

// 出力時に使用する「物理シート（A4横・見開き）」
export interface TravelSheet {
  id: string;
  sheetNum: number;
  leftPageId: string; // TravelPage.id への参照
  rightPageId: string; // TravelPage.id への参照
}
