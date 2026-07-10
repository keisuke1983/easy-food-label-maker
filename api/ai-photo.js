// Vercel Serverless Function — FoodPilot AI 写真解析
// 環境変数 OPENAI_API_KEY をVercelプロジェクト設定で登録してください

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { base64 } = req.body || {};
  if (!base64) return res.status(400).json({ error: "base64 画像データが必要です" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "サーバーにAPIキーが設定されていません。Vercelの環境変数 OPENAI_API_KEY を設定してください。" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 1200,
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: "この画像は日本の食品パッケージ・食品表示ラベルです。以下の項目を読み取ってJSON形式のみで回答してください（説明文不要）。読み取れない項目は空文字にしてください。\n{\"name\":\"商品名\",\"volume\":\"内容量\",\"bestBefore\":\"賞味期限\",\"storage\":\"保存方法\",\"manufacturerName\":\"製造者名\",\"manufacturerAddress\":\"製造者住所\",\"ingredients\":[{\"name\":\"原材料名\",\"weight\":\"\"}],\"category\":\"カテゴリ（菓子/パン/惣菜/飲料/調味料/乾物/冷凍食品/その他）\"}"
            },
            {
              type: "image_url",
              image_url: { url: base64, detail: "high" }
            }
          ]
        }]
      })
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.json().catch(() => ({}));
      return res.status(502).json({ error: err.error?.message || `OpenAI APIエラー (HTTP ${openaiRes.status})` });
    }

    const json = await openaiRes.json();
    const content = json.choices?.[0]?.message?.content || "";
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return res.status(422).json({ error: "AIが有効なデータを返しませんでした。食品表示ラベルや原材料表が写っている写真を使用してください。" });
    }

    return res.status(200).json(JSON.parse(match[0]));
  } catch (err) {
    console.error("ai-photo error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
