/**
 * 高度なPDF面付け（Imposition）および製本ユーティリティ
 */

export interface PageInfo {
  pageNumber: number; // 欠番・白紙の場合は -1
  label: string;
}

export interface SheetSide {
  left: PageInfo;
  right: PageInfo;
  isBackSide: boolean;
  sheetIndex: number;
}

/**
 * 中綴じ（Saddle Stitch）面付けロジック
 * A4横向きの用紙1枚に4ページ分を配置する（表：2ページ、裏：2ページ）
 * 全ページ数を4の倍数に調整する。
 *
 * 例: 8ページの場合
 * Sheet 1 (Outer): Front [P8, P1], Back [P2, P7]
 * Sheet 2 (Inner): Front [P6, P3], Back [P4, P5]
 */
export function generateSaddleStitchLayout(totalPages: number): SheetSide[] {
  const adjustedTotal = Math.ceil(totalPages / 4) * 4;
  const sheetCount = adjustedTotal / 4;
  const layout: SheetSide[] = [];

  for (let s = 0; s < sheetCount; s++) {
    // 表面 (Front Side)
    // 左側: 最後から数えて (s*2) 番目のページ
    // 右側: 最初から数えて (s*2 + 1) 番目のページ
    const frontLeft = adjustedTotal - (s * 2);
    const frontRight = 1 + (s * 2);

    layout.push({
      sheetIndex: s + 1,
      isBackSide: false,
      left: { pageNumber: frontLeft > totalPages ? -1 : frontLeft, label: frontLeft > totalPages ? "白紙" : `P.${frontLeft}` },
      right: { pageNumber: frontRight > totalPages ? -1 : frontRight, label: frontRight > totalPages ? "白紙" : `P.${frontRight}` }
    });

    // 裏面 (Back Side)
    // 左側: 最初から数えて (s*2 + 2) 番目のページ
    // 右側: 最後から数えて (s*2 + 1) 番目のページ
    const backLeft = 2 + (s * 2);
    const backRight = adjustedTotal - (s * 2 + 1);

    layout.push({
      sheetIndex: s + 1,
      isBackSide: true,
      left: { pageNumber: backLeft > totalPages ? -1 : backLeft, label: backLeft > totalPages ? "白紙" : `P.${backLeft}` },
      right: { pageNumber: backRight > totalPages ? -1 : backRight, label: backRight > totalPages ? "白紙" : `P.${backRight}` }
    });
  }

  return layout;
}

/**
 * 製本用マージン（のど / Gutter）の計算
 * ページが内側に行くほど「せり出し（Creep）」を考慮する必要があるが、
 * 今回は簡易的に各ページの内側に固定のセーフエリアを設ける。
 */
export const BINDING_GUTTER_MM = 10; // 10mmの綴じ代
