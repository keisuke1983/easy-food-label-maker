# FoodPilot — 食品メーカー向け AI 商品管理 SaaS

> 食品メーカー・小規模食品事業者向け AI 搭載商品管理クラウドサービス

**「食品表示法に準拠したラベル作成・原材料管理・商品規格書作成を、専門知識なしで完結させる」**

- URL: https://easy-food-label-maker.vercel.app
- GitHub: https://github.com/keisuke1983/easy-food-label-maker

---

## プロダクト概要

食品の商品ラベル作成・原材料管理・規格書作成・原価管理を一元管理できるバニラ JavaScript 製 SPA（Single Page Application）です。

- **バックエンドレス設計** — Vercel Serverless Functions（`/api/`）のみ、独立サーバー不要
- **AI 機能** — Groq API（Llama 3.3 / Llama 4 Scout）による食品表示チェック・商品説明文・相談チャット・ダッシュボードブリーフィング
- **クラウド同期** — Supabase REST API でデータをクラウドに保存（未設定時は localStorage フォールバック）
- **決済** — Stripe Checkout（サブスクリプション）による SaaS 課金

---

## 使用技術

| 項目 | 内容 |
|------|------|
| フロントエンド | バニラ JavaScript SPA（フレームワークなし） |
| スタイリング | 素の CSS（CSS Custom Properties / デザイントークン） |
| ホスティング | Vercel（静的配信 + Serverless Functions） |
| AI | Groq API — `llama-3.3-70b-versatile`（テキスト）/ `meta-llama/llama-4-scout-17b-16e-instruct`（ビジョン） |
| クラウド DB | Supabase REST API（`localStorage` フォールバックあり） |
| 決済 | Stripe Checkout（REST API 直呼び、npm パッケージなし） |
| Webhook 検証 | Node.js 標準 `crypto`（HMAC-SHA256、timing-safe 比較） |
| バーコード | JsBarcode（CDN） |
| テスト | Playwright（E2E） |

---

## 実装済み機能

### 商品管理
| 機能 | 詳細 |
|------|------|
| 商品マスター | 商品名・品番・カテゴリ・JANコード・内容量・賞味期限・保存方法 |
| 完成度スコア | 入力必須項目の充足率を自動計算（Map キャッシュ付き） |
| カード / テーブル表示切替 | テーブルビューはヘッダークリックでソート（商品名・完成度・賞味期限・更新日） |
| フィルター | スター / 公開中 / 下書き / 期限切れ / 原材料未入力 / 製造者未設定 等 |
| リアルタイム検索 | 商品名・品番・カテゴリ |
| 一括操作 | チェックボックスで複数選択 → ステータス一括変更・一括削除 |
| 商品テンプレート | 加工食品・健康食品・菓子類等のプリセット |
| 削除 Undo | 削除後 5 秒間「元に戻す」トースト |
| スナップショット | 商品ごとに任意タイミングで保存・復元 |

### 原材料管理
| 機能 | 詳細 |
|------|------|
| 入力フォーム | 名称・重量。Enter キーで次行へ自動移動（`requestAnimationFrame` でフォーカス安定化） |
| 添加物キーワード | 約 180 件のデフォルト辞書（防腐剤・乳化剤・着色料・甘味料・増粘剤等） |
| 自動ソート | 重量降順・添加物後列ソート |
| ドラッグ並び替え | `dragstart` / `drop` イベントで順序変更 |
| アレルゲン自動検出 | 28 品目（特定原材料 8 品目 + 準ずるもの 20 品目） |
| まとめて貼り付け | 改行区切りテキストを一括入力 |

### 食品表示ラベル
| 機能 | 詳細 |
|------|------|
| リアルタイムプレビュー | 入力と同時にラベルを生成 |
| ラベルスタイル | ベーシック / 栄養成分表示 / 一括表示 |
| PDF 印刷 | `@page{margin:0}` + `print-color-adjust:exact` で高品質印刷 |
| PNG エクスポート | Canvas 変換でダウンロード |
| サイズ設定 | プリセット + 自由入力（幅・高さ・フォントサイズ・余白・オフセット） |
| 複数商品一括印刷 | チェックボックスで選択して一括出力 |
| JAN バーコード | バーコード SVG 生成・ラベルに埋め込み |
| 画像エラー表示 | 画像読み込み失敗時に `⚠️` フォールバック表示（4 箇所） |

### 商品規格書
| 機能 | 詳細 |
|------|------|
| A4 規格書生成 | 商品情報・原材料・アレルゲン・栄養成分・保存方法・製造者を自動整形 |
| 原価情報切替 | 含む / 含まないを選択して印刷 |
| 署名欄 | 担当者・承認者の署名欄付き |
| PDF 印刷 | 新規ウィンドウで `window.print()` |

### 原価管理
| 機能 | 詳細 |
|------|------|
| 直接原価モード | 材料費・包装費・送料・その他を直接入力 |
| 明細モード | 原材料別に数量・価格を入力して合計自動計算 |
| KPI 自動計算 | 原価率・粗利率・粗利額 |
| ダッシュボード集計 | 平均原価率・最高粗利率商品 |

### AI 機能（Groq API）
| 機能 | モデル | 詳細 |
|------|--------|------|
| ダッシュボードブリーフィング | llama-3.3-70b | 商品データを要約してダッシュボードに毎回 AI ブリーフィングを表示（sessionStorage 2h キャッシュ） |
| 食品表示法チェック | llama-3.3-70b | 原材料・添加物・アレルゲン記載の法令準拠チェック・改善提案 |
| AI 商品説明文 | llama-3.3-70b | 楽天・Amazon・Yahoo 等チャネル別の商品説明文を自動生成 |
| AI 相談チャット | llama-3.3-70b | 商品ごとのコンテキスト付きチャット |
| AI 商品登録（画像解析） | llama-4-scout（ビジョン） | 商品画像から商品名・原材料・製造者をワンクリックで自動抽出 |
| AI 棚割り提案 | llama-3.3-70b | ターゲット・販路・売場面積から棚割り構成を提案 |

### データ管理
| 機能 | 詳細 |
|------|------|
| 自動保存 | 入力から 2 秒後に自動保存 |
| クラウド同期 | Supabase REST API（未設定時は localStorage） |
| JSON バックアップ | 全データ（原材料・アレルゲン含む）をエクスポート / インポート |
| CSV エクスポート | 基本情報を CSV 形式で出力 |
| 変更履歴 | 商品ごとにスナップショット保存・復元 |

### SaaS / 課金
| 機能 | 詳細 |
|------|------|
| プラン管理 | 無料（1商品）/ スタンダード（10商品・1,980円/月）/ エキスパート（無制限・4,980円/月） |
| Stripe Checkout | REST API 直呼びでサブスクリプション決済。npm パッケージ不使用 |
| ライセンス認証 | Stripe セッション ID（`cs_xxx`）をライセンスキーとして使用（DB 不要） |
| Webhook | `checkout.session.completed` 受信・HMAC 検証 |
| モニターコード | 環境変数 `TRIAL_CODE` で無制限お試しを発行 |

---

## 未実装・今後の改善候補

| 項目 | 優先度 | 補足 |
|------|--------|------|
| チームアカウント / 権限管理 | 高 | 現在は 1 ユーザー前提 |
| 賞味期限アラートメール | 中 | 期限 30 日前にメール通知 |
| EC サイト自動同期 | 中 | 楽天・Amazon 出品情報の自動更新 |
| 規格書 OCR 取り込み | 中 | 既存 PDF 規格書を AI で解析・インポート |
| モバイルアプリ（PWA 強化） | 低 | 現在は PWA 対応済みだが操作性改善余地あり |
| 多言語対応 | 低 | 現在は日本語のみ |
| API 公開 | 低 | 外部システムとの連携用 REST API |
| 本番リリース前: trial プラン削除 | 必須 | `constants.js` の `PLANS.trial` を削除 |

---

## ディレクトリ構成

```
/
├── index.html                  # エントリーポイント（スクリプト読み込み順を管理）
├── src/
│   ├── db.js                   # 栄養成分 DB・原材料データ（最初に読み込み）
│   ├── constants.js            # 定数（アレルゲン・プラン・サイズプリセット・添加物辞書 ~180件）
│   ├── utils-core.js           # ユーティリティ（escapeHtml・uid・safeGet 等）
│   ├── state.js                # グローバル状態変数（唯一の状態管理場所）
│   ├── db-cloud.js             # Supabase REST API クラウド同期
│   ├── ui-dashboard.js         # ダッシュボード UI（AI ブリーフィング・KPI カード）
│   ├── ui-products.js          # 商品一覧 UI（カード・テーブルビュー・フィルター）
│   ├── delegation.js           # イベントデリゲーション（全クリック・キーボード・input を一元処理）
│   ├── app.js                  # メイン（UI 生成・ビジネスロジック・Stripe・ライセンス認証）
│   └── styles.css              # スタイルシート（CSS Custom Properties）
├── api/                        # Vercel Serverless Functions
│   ├── activate.js             # ライセンス認証（3 種類: モニターコード / Stripe / 手動キー）
│   ├── ai-briefing.js          # AI ダッシュボードブリーフィング
│   ├── ai-consult.js           # AI 相談チャット
│   ├── ai-description.js       # AI 商品説明文生成
│   ├── ai-photo.js             # AI 画像解析（商品情報自動抽出）
│   ├── ai-shelf.js             # AI 棚割り提案
│   ├── stripe-checkout.js      # Stripe Checkout セッション作成
│   └── stripe-webhook.js       # Stripe Webhook 受信・HMAC 検証
├── assets/
│   └── app-icon.svg
├── tests/
│   └── e2e/food-label.spec.js  # Playwright E2E テスト
├── vercel.json                 # Vercel 設定
├── PROJECT_RULES.md            # 開発ルール・禁止事項
├── ROADMAP.md                  # 開発計画
├── TODO.md                     # 改善タスク
└── CHANGELOG.md                # 変更履歴
```

### スクリプト読み込み順（index.html で管理・順序変更禁止）

```
db.js → constants.js → utils-core.js → state.js → db-cloud.js
→ ui-dashboard.js → ui-products.js → delegation.js → app.js
```

---

## アーキテクチャ上の特徴と制約

### グローバルスコープの活用
フレームワークなしのため、すべての状態変数・関数はグローバルスコープに存在します。`state.js` が唯一の状態管理場所として機能し、`render()` を呼ぶことで全 UI を再描画します。

### イベントデリゲーション
`document` に対して1つのクリックリスナーを設定し、`e.target.closest()` で対象要素を判定する設計（`delegation.js`）。商品数・DOM 要素数が増えても性能劣化しない。

### render() の同期・非同期ルール
- `render()` は同期的に全 DOM を再構築
- 非同期 fetch（AI・クラウド同期）は `queueMicrotask` や Promise で render の外に出す
- render 内で副作用（fetch・setState）を起こさない

### Vercel Serverless Functions
- `/api/*.js` は ES modules（`export default async function handler`）
- Stripe Webhook のみ `export const config = { api: { bodyParser: false } }` でローボディ受信
- 環境変数は Vercel Dashboard で設定（コードにハードコードしない）

---

## 環境変数（Vercel）

| 変数名 | 用途 |
|--------|------|
| `GROQ_API_KEY` | AI 機能全般 |
| `SUPABASE_URL` | クラウド同期（任意） |
| `SUPABASE_ANON_KEY` | クラウド同期（任意） |
| `STRIPE_SECRET_KEY` | Stripe 決済 |
| `STRIPE_PRICE_STARTER` | スタンダードプランの Price ID |
| `STRIPE_PRICE_PRO` | エキスパートプランの Price ID |
| `STRIPE_WEBHOOK_SECRET` | Webhook 署名検証 |
| `TRIAL_CODE` | モニター向けお試しコード（本番リリース前に削除） |
| `VALID_LICENSES` | 手動ライセンスキー JSON（任意） |

---

## ローカル開発

```bash
# 任意のローカルサーバーで index.html を配信
npx serve . -p 3001
# または
python -m http.server 3001
```

Serverless Functions をローカルでテストする場合は Vercel CLI を使用：

```bash
npm i -g vercel
vercel dev
```

### キャッシュバスティング

`index.html` の `?v=` クエリを全 JS・CSS ファイルで統一して更新：

```html
<link rel="stylesheet" href="./src/styles.css?v=20260716a" />
<script src="./src/app.js?v=20260716a"></script>
```

---

## ライセンス

ISC License
