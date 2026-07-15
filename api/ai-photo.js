// Vercel Serverless Function — FoodPilot AI 写真解析（Groq Vision版）
// 環境変数 GROQ_API_KEY をVercelプロジェクト設定で登録してください

const PROMPT = `この日本の食品パッケージ・ラベルの写真から、日本語の食品表示法に基づく情報を抽出してください。

【重要なルール】
- 日本語テキストが存在する場合は必ず日本語を優先してください（英語表記は無視）
- 「品名」欄の値をnameに使用してください（ブランド名ではなく品名）
- 「原材料名」欄をそのまま読み取り、「、」で分割してください
- 「販売者」「製造者」「加工者」いずれかの会社名と住所を抽出してください
- 該当情報がない場合は空文字("")にしてください

以下のJSON形式のみで回答してください（説明文・\`\`\`不要）:

{
  "name": "品名（例: りんごジュース（濃縮還元））",
  "volume": "内容量（例: 1000ml、100g）",
  "bestBefore": "賞味期限の記載場所・方法（例: 上部に記載、製造日より180日）",
  "storage": "保存方法の全文（日本語）",
  "ingredients": ["原材料1（日本語）", "原材料2", "原材料3"],
  "allergensManual": "アレルゲン表示の全文（日本語）",
  "manufacturerName": "製造者または販売者の会社名（日本語）",
  "manufacturerPostal": "郵便番号（数字のみ、例: 1060032）",
  "manufacturerAddress": "住所（日本語、郵便番号を除く）",
  "manufacturerPhone": "電話番号",
  "kcal": "エネルギーの数値のみ（例: 46）",
  "protein": "たんぱく質の数値のみ",
  "fat": "脂質の数値のみ",
  "carbs": "炭水化物の数値のみ",
  "salt": "食塩相当量の数値のみ"
}`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { base64 } = req.body || {};
  if (!base64) return res.status(400).json({ error: "base64 画像データが必要です" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "サーバーにGroq APIキーが設定されていません。" });

  const match = base64.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return res.status(400).json({ error: "画像フォーマットが不正です" });
  const [, mimeType, pureBase64] = match;

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
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(422).json({ error: "AIが有効なデータを返しませんでした。食品表示ラベルが写っている写真を使用してください。" });

    const parsed = JSON.parse(jsonMatch[0]);

    const ingredients = (parsed.ingredients || [])
      .filter(n => typeof n === "string" && n.trim())
      .map(n => ({ id: Math.random().toString(36).slice(2), name: n.trim(), weight: "" }));
    if (ingredients.length === 0) ingredients.push({ id: Math.random().toString(36).slice(2), name: "", weight: "" });

    const result = {
      name: parsed.name || "",
      volume: parsed.volume || "",
      bestBefore: parsed.bestBefore || "",
      storage: parsed.storage || "",
      storageCustom: "",
      ingredients,
      allergensMode: parsed.allergensManual ? "manual" : "auto",
      allergensManual: parsed.allergensManual || "",
      manufacturerName: parsed.manufacturerName || "",
      manufacturerPostal: (parsed.manufacturerPostal || "").replace(/[^0-9]/g, ""),
      manufacturerAddress: parsed.manufacturerAddress || "",
      manufacturerPhone: parsed.manufacturerPhone || "",
    };

    if (parsed.kcal || parsed.protein || parsed.fat || parsed.carbs || parsed.salt) {
      result.nutritionMode = "manual";
      result.nutritionManual = {
        kcal: parsed.kcal || "",
        protein: parsed.protein || "",
        fat: parsed.fat || "",
        carbs: parsed.carbs || "",
        salt: parsed.salt || "",
      };
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("ai-photo error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
