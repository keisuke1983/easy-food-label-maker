// Vercel Serverless Function — FoodPilot AI相談（Google Gemini版）
// 環境変数 GEMINI_API_KEY をVercelプロジェクト設定で登録してください

const SYSTEM_PROMPT = `あなたは日本の食品表示法・食品衛生法に精通したベテランの食品表示専門アドバイザーです。
食品メーカー・小規模食品事業者を対象に、実務に即した正確なアドバイスを提供します。

【対応範囲】
- 食品表示法・JAS法・食品衛生法に基づく表示基準
- 原材料名の記載順・表記方法
- アレルゲン表示（特定原材料8品目・準ずる20品目）
- 栄養成分表示の計算・記載方法
- 賞味期限・消費期限の設定根拠
- 製造者・販売者・加工者の記載要件
- 添加物の一般名・用途名表示
- コンタミネーション・製造ライン共有の取り扱い

【回答スタイル】
- 簡潔で実務的な回答（長すぎない）
- 法的根拠を示す場合は「食品表示基準 第○条」等を明記
- 曖昧なケースは「専門家・行政窓口への確認を推奨」と明示
- マークダウン形式で見やすく整形

【重要な注意事項】
- 最終的な法的判断は専門家（食品表示診断士等）や保健所に確認を促すこと
- 確実でない情報は推測と明記すること`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { product, history, message } = req.body || {};
  if (!message) return res.status(400).json({ error: "メッセージが必要です" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "サーバーにGemini APIキーが設定されていません。" });
  }

  // 商品コンテキストを構築
  const productContext = product ? `
【相談対象の商品情報】
- 商品名: ${product.name || "未設定"}
- 社内管理名: ${product.internalName || "未設定"}
- カテゴリ: ${product.category || "未設定"}
- 内容量: ${product.volume || "未設定"}
- 賞味期限設定: ${product.bestBefore || "未設定"}
- 保存方法: ${product.storage || "未設定"}
- 原材料: ${(product.ingredients || []).filter(i => i.name).map(i => i.name + (i.weight ? `(${i.weight}g)` : "")).join("、") || "未設定"}
- 製造者名: ${product.manufacturerName || "未設定"}
- 製造者住所: ${product.manufacturerAddress || "未設定"}
- 検出アレルゲン: ${(product.allergens || []).join("、") || "なし"}
` : "";

  // 会話履歴を構築（最新10件まで）
  const recentHistory = (history || []).slice(-10);
  const contents = [];

  if (productContext) {
    contents.push({
      role: "user",
      parts: [{ text: productContext + "\n\nこの商品についてアドバイスをお願いします。" }]
    });
    contents.push({
      role: "model",
      parts: [{ text: "はい、商品情報を確認しました。何でもご質問ください。" }]
    });
  }

  for (const h of recentHistory) {
    if (h.role === "user" || h.role === "assistant") {
      contents.push({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }]
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: message }]
  });

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.3,
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      return res.status(502).json({ error: err.error?.message || `Gemini APIエラー (HTTP ${geminiRes.status})` });
    }

    const json = await geminiRes.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) return res.status(422).json({ error: "AIが回答を生成できませんでした。" });

    return res.status(200).json({ answer: text });
  } catch (err) {
    console.error("ai-consult error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
