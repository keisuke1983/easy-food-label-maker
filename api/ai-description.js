// Vercel Serverless Function — FoodPilot AI説明文生成（Groq版）
// 環境変数 GROQ_API_KEY をVercelプロジェクト設定で登録してください

const CHANNEL_PROMPTS = {
  rakuten: `楽天市場用の商品説明文を作成してください。
・見出しを使って読みやすく構成する
・商品の魅力・特徴を3〜5点箇条書きでアピール
・安全・品質へのこだわりを強調
・お客様の購買意欲を高める表現を使う
・文字数：500〜800文字`,

  amazon: `Amazon商品ページ用の説明文を作成してください。
・商品タイトルの提案（ブランド名＋商品名＋容量＋特徴）
・5つの商品特徴を箇条書き（各40文字以内）
・詳細な商品説明（300〜500文字）
・自然にキーワードを盛り込む`,

  base: `BASE・Shopify向けの商品説明文を作成してください。
・親しみやすく温かみのあるトーン
・商品の背景・こだわりのストーリーを含める
・食べ方・使い方の提案
・300〜500文字`,

  instagram: `Instagram投稿文を作成してください。
・感情を動かす魅力的な導入文
・絵文字を適切に使用
・ハッシュタグを10〜15個提案（日本語・英語混在）
・本文200文字以内`,

  wholesale: `業務用・卸向けの商品説明文を作成してください。
・品質・安全性・原材料の信頼性を重点的にアピール
・仕様を箇条書きで整理（成分・賞味期限・保存方法等）
・MOQ・取引条件の問い合わせ誘導文を含める
・300〜500文字`,

  pop: `店頭POP用の短い説明文を作成してください。
・インパクトのあるキャッチコピー（20文字以内）
・商品の最大の魅力を1〜2文で表現
・合計60文字以内`,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { product, channel } = req.body || {};
  if (!product || !channel) return res.status(400).json({ error: "商品情報とチャンネルが必要です" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "サーバーにGroq APIキーが設定されていません。" });

  const channelPrompt = CHANNEL_PROMPTS[channel] || "商品説明文を作成してください。";

  const productInfo = `商品名：${product.name || "未入力"}
カテゴリ：${product.category || "未入力"}
内容量：${product.volume || "未入力"}
販売価格：${product.price ? "¥" + product.price : "未入力"}
原材料：${product.ingLabel || "未入力"}
アレルゲン：${product.allergens?.join("・") || "なし"}
保存方法：${product.storage || "未入力"}
賞味期限：${product.bestBefore || "未入力"}
製造者：${product.manufacturerName || "未入力"}
メモ・特記事項：${product.memo || "なし"}`;

  const systemPrompt = `あなたは食品マーケティングのプロフェッショナルです。日本の食品メーカー・販売者向けに、魅力的で購買意欲を高める商品説明文を作成します。
食品表示法に沿った正確な情報をベースに、販売チャネルに最適化した文章を生成してください。
説明文のみを出力し、前置きや注釈は不要です。`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `■ 商品情報\n${productInfo}\n\n■ 作成依頼\n${channelPrompt}` },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      console.error("Groq error:", groqRes.status, JSON.stringify(err));
      return res.status(502).json({ error: err.error?.message || `Groq APIエラー (HTTP ${groqRes.status})` });
    }

    const json = await groqRes.json();
    const text = json.choices?.[0]?.message?.content || "";
    if (!text) return res.status(422).json({ error: "AIが説明文を生成できませんでした。" });

    return res.status(200).json({ text });
  } catch (err) {
    console.error("ai-description error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
