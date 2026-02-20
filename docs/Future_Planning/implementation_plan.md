# 実装計画：今後の機能拡充・データ連携

## Goal Description
現在、デザインツールとしての編集UI（3カラムレイアウト、プレビュー機能）の基礎が完成しています。
今後は「実用的な旅行のしおりアプリ」として完成させるために、実際に入力を行えるブロック編集機能の実装、Google Maps APIを利用した移動時間の自動計算、実用的なPDFエクスポート機能、およびバックエンド（Turso等）へのデータ永続化を段階的に進めます。

## User Review Required
> [!IMPORTANT]
> 以下のPhase 5〜8の順番で進める方針でよろしいでしょうか？
> もし「まずはPDF出力を完成させたい」や「API連携よりもDB保存を先にやりたい」といった優先順位のご希望があれは教えてください。

## Proposed Changes

### [Phase 5] コンテンツ編集機能とデータフローの完成
右側の `EditorRightPanel.tsx` を拡張し、選択されたブロック(行程・持ち物等)に応じた専用の入力フォームを動的に表示します。
- `ItineraryEditor`, `LuggageEditor` などのサブコンポーネントを作成し、`onUpdateBlock` 関数を通じて全体の状態 (`pages` ステート) を更新します。

### [Phase 6] Google Maps API連携
すでに枠組みがある `src/lib/google-maps.ts` を本番APIに繋ぎこみ、行程表で「出発地」と「目的地」を入力した際に、移動時間と距離を自動算出してUIに反映させます。
周辺スポットの提案機能もUIに組み込みます。

#### [MODIFY] [google-maps.ts](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/lib/google-maps.ts)
`@googlemaps/google-maps-services-js` を用いたルート検索ロジックは実装済みのため、APIキーの環境変数が読み込まれることを確認します。さらに Places API を用いたおすすめスポット検索（Text Search 等）の実装を行います。

#### [MODIFY] [ItineraryEditor.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/Editors/ItineraryEditor.tsx)
スポットの間に「移動時間」を表示・計算するUIを追加します。具体的には、2つのスポットの `name` が入力されたタイミング（またはボタン押下時）で `getTravelTime` を呼び出し、結果を差し込みます。
また、おすすめスポットを提案する「💡おすすめ」ボタンを設置し、`getRecommendedSpots` の結果を一覧表示して追加できるようにします。

#### [MODIFY] [ItineraryBlock.tsx](file:///Users/seiji/Antigravity-1/Travel_guide_Webapp/src/components/Editor/ItineraryBlock.tsx)
Editor側で計算・保存された移動時間等のデータをプレビュー上に美しく表示するためのUI改修を行います。

### [Phase 7] 高精細PDFエクスポート
現在の「仕上がり確認・保存」機能はUI上のプレビューですが、これを実際のPDFファイルとしてダウンロードできるようにします。
ブラウザからの直接出力(`html2canvas` + `jsPDF`)、または標準機能を用いた印刷ダイアログの最適化を行います。

### [Phase 8] データ保存（Turso / SQLite）と共有機能
ユーザーが作成したしおりを永続化します。`Drizzle ORM` などのORMを用いて `Turso` に接続し、しおりデータとページ/ブロック構成を保存します。
また、一意のURL（UUID）を発行してしおりをWeb上で共有できるようにします。

## Verification Plan

### Automated Tests
- ESLint, TypeScriptによる静的解析を利用し、型の整合性が保たれていることを継続的に確認します。(`npm run lint`, `npx tsc --noEmit`)

### Manual Verification
- `npm run dev` でローカルサーバーを起動し、ブラウザ上で実際に各ブロックの追加・編集・削除をテストします。
- 行程表にスポットを入力し、Google Maps API連携が正しく動作するか確認します。
- 実際にPDF出力（または印刷ダイアログ起動）を実行し、レイアウトが崩れないか確認します。
