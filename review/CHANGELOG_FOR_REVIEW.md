# CHANGELOG_FOR_REVIEW.md — 差分レビュー用変更履歴

> ChatGPT向け：最新の変更内容のみをまとめた差分レビュー用ファイル
> 前回レビュー時点: v20260710b（2026-07-09）
> 現在のバージョン: v20260710h（2026-07-10）

---

## v20260710h — ダッシュボード全面リニューアル・AIプロアクティブ提案・パイプラインステータス

### 追加ファイル・変更ファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/constants.js` | `PRODUCT_STATUSES`（6段階ライフサイクル定数）を追加 |
| `src/state.js` | `cloudSyncStatus` / `cloudSyncLastAt` / `cloudSyncMessage` を追加 |
| `src/app.js` | `dashboardHtml()` 全面再設計、`generateAiSuggestions()` 新規追加、パイプライン対応、履歴ユーザー追跡、バックアップ履歴 |
| `src/delegation.js` | `data-set-pipeline-status` クリックハンドラー追加 |
| `src/styles.css` | ダッシュボード・AIサジェスト・パイプライン・クラウド同期UI 全新規CSSクラス群 |
| `index.html` | バージョン文字列を `?v=20260710h` に更新 |

### 主な変更内容

**1. ダッシュボード全面リニューアル**
- **KPI行**（`.dash-kpi-row`）: 6枚のメトリクスカードで主要指標を一覧表示。クリックで各ビューへ遷移
- **クイックアクションバー**（`.dash-quick-bar`）: 頻繁に使うアクションへのワンクリックアクセス
- **2カラムメイングリッド**（`.dash-main-grid`）: 左=今日やること / 右=AIからのお知らせ
- **最近編集した商品グリッド**（`.recent-prod-grid`）: 最大8件をカード形式（サムネイル+パイプラインチップ+プログレスバー）で表示
- **下部3カラムグリッド**（`.dash-bottom-grid`）: 完成度分布 / カテゴリグラフ / 原価サマリー

**2. AIプロアクティブ提案（`generateAiSuggestions()`）**
```javascript
// 4段階のルールベース提案
// critical: 賞味期限切れ
// high: 承認待ち・製造者未設定
// medium: 画像未登録・原価未設定・栄養成分未設定
// low: JANコード未登録・3か月以上更新なし
// 最大7件をダッシュボードのAIパネルに常時表示
```

**3. 商品ライフサイクルパイプライン**
```javascript
const PRODUCT_STATUSES = [
  { id: "draft",        label: "下書き",   color: "#94a3b8", bg: "#f1f5f9" },
  { id: "in_progress",  label: "作成中",   color: "#d97706", bg: "#fef3c7" },
  { id: "review",       label: "確認待ち", color: "#2563eb", bg: "#dbeafe" },
  { id: "approved",     label: "承認済み", color: "#7c3aed", bg: "#ede9fe" },
  { id: "on_sale",      label: "販売中",   color: "#16a34a", bg: "#dcfce7" },
  { id: "discontinued", label: "終了",     color: "#6b7280", bg: "#f3f4f6" },
];
// 商品詳細上部にパイプラインセレクター（クリックで即時変更）
// 商品カード・最近編集グリッドにステータスチップ表示
```

**4. 履歴に操作者を記録**
```javascript
hist.unshift({
  snapshot: JSON.parse(JSON.stringify(p)),
  savedAt: new Date().toLocaleString("ja-JP"),
  savedBy: currentUserName || "—",  // ← 新規追加
});
```

**5. クラウド同期UI刷新**
- ステータスバー（接続状態インジケーター + 最終同期日時）
- Coming Soonバナー（Supabase / Google Drive / OneDrive 連携予告）
- バックアップ履歴セクション（日時・件数・画像有無を自動記録）

---

## v20260710g — チーム・承認機能 実装

### 追加ファイル・変更ファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/state.js` | `teamMembers`・`currentUserName` 状態変数を追加 |
| `src/app.js` | 承認フィールド・承認タブ・チームページ・承認バッジ を追加 |
| `src/delegation.js` | 承認関連アクションハンドラー7件を追加 |
| `src/styles.css` | 承認バッジ・チームメンバー行・サイドバーユーザーチップ のスタイルを追加 |
| `index.html` | バージョン文字列を `?v=20260710g` に更新 |

### 主な変更内容

**1. データ構造の拡張（`extendProductMaster()`）**
```javascript
// 商品オブジェクトに承認フィールドを追加
approvalStatus: "none",  // "none" | "review" | "approved" | "rejected"
assignedTo: "",          // 担当者名
approvalComment: "",     // 申請コメント
approverName: "",        // 承認者名
approvalDate: "",        // 承認日
```

**2. チーム状態（`src/state.js` 末尾）**
```javascript
let teamMembers = (() => { try { return JSON.parse(safeGet("fmcc-team-members") || "[]"); } catch { return []; } })();
let currentUserName = safeGet("fmcc-current-user") || "";
```

**3. サイドバーのユーザーチップ**
- ログインユーザー名とロールをサイドバー下部に常時表示
- 未設定時は「👤 ユーザーを設定する」クリックで設定画面へ誘導

**4. 承認待ちバッジ（サイドバーナビ）**
```javascript
const reviewCount = products.filter(p => p.approvalStatus === "review").length;
// reviewCount > 0 時に赤バッジを「チーム・承認」ナビ項目に表示
```

**5. 商品カードの承認ステータスバッジ**
```javascript
// 商品カードに追加
if (p.approvalStatus === "review")   → "👥 確認待ち" (青)
if (p.approvalStatus === "approved") → "✓ 承認済"   (緑)
if (p.approvalStatus === "rejected") → "↩ 差し戻し" (赤)
```

**6. 商品詳細「承認」タブ（`approvalTabHtml(p)`）**
- `none/rejected` 状態: 担当者・コメントを入力して確認依頼を送る UI
- `review` 状態: 申請内容の表示 + キャンセルボタン
- `reviewer/admin` ロール + `review` 状態: 承認ボタン + 差し戻しボタン（コメント入力付き）

**7. チーム管理ページ（`teamApprovalHtml()`）**
- メンバー追加（名前 + ロール選択）
- メンバー一覧（削除 + 「自分として使う」トグル）
- 承認ステータス別商品一覧（確認待ち / 承認済 / 差し戻し）

**8. 新アクションハンドラー（`delegation.js`）**
```
request-approval  → approvalStatus="review", assignedTo, comment を保存
approve-product   → approvalStatus="approved", approverName, approvalDate を保存
reject-product    → approvalStatus="rejected", コメント必須
cancel-approval   → 全承認フィールドをリセット
add-team-member   → teamMembers に追加、localStorage保存
del-team-member   → インデックスで削除
set-current-user  → currentUserName トグル
```

**9. TODOダッシュボード連携**
```javascript
{ key:"review", label:"👥 承認待ちの商品", count: products.filter(p=>p.approvalStatus==="review").length }
```

**10. フィルター追加**
```javascript
if (masterFilter==="review")   list = list.filter(p=>p.approvalStatus==="review");
if (masterFilter==="approved") list = list.filter(p=>p.approvalStatus==="approved");
```

---

## v20260710f — JSONエクスポート 画像選択モーダル

### 問題
バックアップJSON に `imageDataUrl`（base64画像）が常に含まれ、ファイルサイズが数MB〜数十MBになり判読不能だった。

### 対策
`exportJson()` に画像を含む/除く 選択モーダルを追加：
- 「📦 画像を含む」→ 完全バックアップ（大きいが完全）
- 「📄 画像を除く」→ テキストのみ（小さく開きやすい）
- 画像なし商品のみなら選択なしで即エクスポート

---

## v20260710e — 写真/規格書登録のエラー表示 + Vision API実装

### 問題
写真から登録しても実際のAPI呼び出しがなく、失敗しても「✅ 解析完了！」と表示されていた。

### 対策
1. `processRegFile("photo", file)` に OpenAI Vision API（gpt-4o）の実際の呼び出しを実装
2. エラーケース別のメッセージ表示：
   - APIキー未登録 → 設定画面へ誘導
   - 画像ファイル読み込み失敗 → エラーメッセージ
   - API HTTP エラー → OpenAIのエラーメッセージをそのまま表示
   - JSONパース失敗 → エラーメッセージ
3. エラー画面に「もう一度試す」「手動で登録する」ボタンを追加

---

## v20260710c〜d — カードアクションボタン修正・複製undo・保存方法候補・原産地履歴

### バグ修正
**商品カードのアクションボタン（複製・削除・スター）が反応しなかった**
- 原因: `.master-card-actions` の `onclick="event.stopPropagation()"` が全クリックをブロック
- 対策: `stopPropagation` を削除し、`delegation.js` の `data-nav-product-detail` ハンドラーに `!t.closest(".master-card-actions")` ガードを追加

### 追加
- **複製undo**: 複製後に5秒 undo トーストを表示（削除と同等のUX）
- **保存方法 datalist**: 入力フォームに `<datalist>` を追加。`STORAGE_OPTS` の候補が表示される
- **原産地を履歴差分に追加**: `HISTORY_DIFF_FIELDS` に `originCountry` を追加

---

## レビューポイント

ChatGPTへのレビュー依頼時に特に見てほしい点：

1. **承認ワークフローのUX** — localStorage限定（デバイス内）の承認フローは実用的か？
2. **ロール制御のセキュリティ** — クライアントサイドのみのロール制御は問題ないか？
3. **チームページの情報設計** — メンバー管理 + 承認一覧を1ページに置く設計の是非
4. **Vision APIのプロンプト品質** — 商品写真から正確に情報抽出できているか？
5. **JSONエクスポートのファイルサイズ** — 画像なし選択でも十分小さいか？
