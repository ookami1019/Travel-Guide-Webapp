# 実装計画 (Code Refactoring & Feature Completion)

本計画は、現在発生しているTypeScript/ESLintの警告・エラーの解消と、モック状態となっているUIへの機能組み込み、そして今後の開発方針（企画書）の提示を行うことを目的としています。

## Proposed Changes

### 1. 型定義とLintエラーの解消
以下のファイルに含まれる未使用のインポート (`useMemo`, `motion`, `AnimatePresence`, 未使用のアイコンなど) を削除・整理し、`any` 型を適切な型 (`Record<string, unknown>` や専用インターフェース) に置き換えます。
#### [MODIFY] [travel.ts](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/types/travel.ts)
#### [MODIFY] [route.ts](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/app/api/export/route.ts)
#### [MODIFY] [page.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/app/editor/page.tsx)
#### [MODIFY] [EditorRibbon.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/EditorRibbon.tsx)
#### [MODIFY] [EditorRightPanel.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/EditorRightPanel.tsx)
#### [MODIFY] [ImpositionPreview.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/ImpositionPreview.tsx)
#### [MODIFY] [MembersBlock.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/MembersBlock.tsx)
#### [MODIFY] [SidebarThumbnails.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/SidebarThumbnails.tsx)
#### [MODIFY] [google-maps.ts](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/lib/google-maps.ts)
#### [MODIFY] [supabase.ts](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/lib/supabase.ts)

---

### 2. データ更新ロジックの実装
右側の編集パネルで行われた変更（例：ブロックタイトルの変更）が、中央のプレビューにリアルタイム反映されるようにします。
#### [MODIFY] [page.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/app/editor/page.tsx)
- `handleUpdateBlock` を実装し、指定した `blockId` の内容を `pages` ステートに反映させます。
#### [MODIFY] [EditorRightPanel.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/EditorRightPanel.tsx)
- ブロックタイトルの `<input>` 要素に `onChange` 属性を追加し、`onUpdateBlock` コールバックを通じて状態を更新します。

---

### 3. PDFエクスポート・保存機能の接続
面付けプレビュー画面から、エンドポイント (`/api/export`) を呼び出してPDFを出力し、ダウンロードする処理を実装します。
#### [MODIFY] [ImpositionPreview.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/ImpositionPreview.tsx)
- 「PDFを保存」ボタンにクリックイベントを追加し、fetchAPIを用いてPDF生成リクエストを送信、取得したBlobをダウンロードするロジックを組み込みます。

---

## Verification Plan

### Automated Tests
- `npm run lint` および `npx tsc --noEmit` を実行し、エラーおよび警告が0件になることを確認します。

### Manual Verification
- エディタ画面にて右側のパネルからブロックのタイトルを変更し、中央画面に即座に反映されるか確認します。
- 面付けプレビューを開き、「PDFを保存」を実行して実際にファイルがダウンロードされるか確認します。
