// Vercel Serverless Function — FoodPilot AI棚スキャン（Groq Vision版）
// 環境変数 GROQ_API_KEY をVercelプロジェクト設定で登録してください

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { base64, productNames } = req.body || {};
  if (!base64) return res.status(400).json({ error: "画像データが必要です" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "サーバーにGroq APIキーが設定されていません。" });

  const match = base64.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return res.status(400).json({ error: "画像フォーマットが不正です" });
  const [, mimeType, pureBase64] = match;

  const knownProducts = Array.isArray(productNames) && productNames.length > 0
    ? `\n\n【登録済み商品名（マッチング参考）】\n${productNames.slice(0, 30).map(n => `- ${n}`).join("\n")}`
    : "";

  const PROMPT = `この棚・倉庫・保管場所の写真を解析し、見えている商品・資材・食材の在庫を数えてください。${knownProducts}

以下のJSON配列形式のみで回答してください（説明文・\`\`\`不要）:

[
  {
    "detectedName": "商品名・品名（できるだけ具体的に）",
    "quantity": 数量（整数）,
    "unit": "単位（袋/個/本/箱/缶/枚/kg/L等）",
    "confidence": 確信度（0〜100の整数）
  }
]

【ガイドライン】
- 同じ商品は1エントリにまとめ、合計数を記載
- 登録済み商品名に近いものは優先して合わせる
- 数が判別しにくい場合は低いconfidenceを設定
- 見えない・判断できないものは含めない
- 最低1件、最大20件まで`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${pureBase64}` } },
          ],
        }],
        max_tokens: 1024,
        temperature: 0.1,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      console.error("Groq Vision error:", groqRes.status, JSON.stringify(err));
      return res.status(502).json({ error: err.error?.message || `Groq APIエラー (HTTP ${groqRes.status})` });
    }

    const json = await groqRes.json();
    const text = json.choices?.[0]?.message?.content || "";
    const arrMatch = text.match(/\[[\s\S]*\]/);
    if (!arrMatch) return res.status(422).json({ error: "AIが有効なデータを返しませんでした。棚や商品が写っている写真を使用してください。" });

    const items = JSON.parse(arrMatch[0]);
    if (!Array.isArray(items)) return res.status(422).json({ error: "解析結果の形式が不正です。" });

    return res.status(200).json(items.map(item => ({
      detectedName: String(item.detectedName || "不明"),
      quantity: Math.max(0, parseInt(item.quantity) || 0),
      unit: String(item.unit || "個"),
      confidence: Math.min(100, Math.max(0, parseInt(item.confidence) || 50)),
    })));
  } catch (err) {
    console.error("ai-shelf error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
