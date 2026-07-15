// Vercel Serverless Function — FoodPilot AIダッシュボードブリーフィング（Groq版）
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { summary } = req.body || {};
  if (!summary) return res.status(400).json({ error: "summaryが必要です" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY未設定" });

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
          {
            role: "system",
            content: `あなたは食品メーカーのAI商品管理アシスタントです。毎朝、担当者に今日の優先タスクを簡潔に伝えます。
データに基づいて具体的・実践的なアドバイスを150〜220文字の日本語で伝えてください。
・前置き・挨拶不要。要点のみ。
・緊急度の高い項目を最初に挙げる。
・「〜してください」など行動を促す表現を使う。`,
          },
          {
            role: "user",
            content: `【今日の商品管理状況】\n${summary}\n\n今日の優先アクションを端的に教えてください。`,
          },
        ],
        max_tokens: 300,
        temperature: 0.45,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      console.error("ai-briefing Groq error:", groqRes.status, JSON.stringify(err));
      return res.status(502).json({ error: err.error?.message || `Groq APIエラー (HTTP ${groqRes.status})` });
    }

    const json = await groqRes.json();
    const text = json.choices?.[0]?.message?.content?.trim() || "";
    if (!text) return res.status(422).json({ error: "AIが応答を返しませんでした" });
    return res.status(200).json({ text });
  } catch (err) {
    console.error("ai-briefing error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラー" });
  }
}
