export type BlockType = "itinerary" | "luggage" | "members" | "memo" | "image" | "text" | "ai-spot";

export interface TravelBlock {
  id: string;
  type: BlockType;
  title: string;
  content: any;
}

export interface PageContent {
  id: string;
  pageNum: number;
  blocks: TravelBlock[];
}

export interface TravelSheet {
  id: string;
  leftPage: PageContent;
  rightPage: PageContent;
}
