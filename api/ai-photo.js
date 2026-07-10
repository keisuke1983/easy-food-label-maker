// Vercel Serverless Function — FoodPilot AI 写真解析（Google Gemini版）
// 環境変数 GEMINI_API_KEY をVercelプロジェクト設定で登録してください

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { base64 } = req.body || {};
  if (!base64) return res.status(400).json({ error: "base64 画像データが必要です" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "サーバーにAPIキーが設定されていません。Vercelの環境変数 GEMINI_API_KEY を設定してください。" });
  }

  // "data:image/jpeg;base64,xxxxx" → mimeType と rawBase64 に分離
  const match = base64.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return res.status(400).json({ error: "画像フォーマットが不正です" });
  const [, mimeType, rawBase64] = match;

  const prompt = "この画像は日本の食品パッケージ・食品表示ラベルです。以下の項目を読み取ってJSON形式のみで回答してください（説明文不要）。読み取れない項目は空文字にしてください。\n{\"name\":\"商品名\",\"volume\":\"内容量\",\"bestBefore\":\"賞味期限\",\"storage\":\"保存方法\",\"manufacturerName\":\"製造者名\",\"manufacturerAddress\":\"製造者住所\",\"ingredients\":[{\"name\":\"原材料名\",\"weight\":\"\"}],\"category\":\"カテゴリ（菓子/パン/惣菜/飲料/調味料/乾物/冷凍食品/その他）\"}";

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: rawBase64 } }
            ]
          }],
          generationConfig: { maxOutputTokens: 1024, temperature: 0.1 }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      return res.status(502).json({ error: err.error?.message || `Gemini APIエラー (HTTP ${geminiRes.status})` });
    }

    const json = await geminiRes.json();
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(422).json({ error: "AIが有効なデータを返しませんでした。食品表示ラベルや原材料表が写っている写真を使用してください。" });
    }

    return res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error("ai-photo error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
