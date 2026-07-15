// Vercel Serverless Function — FoodPilot Stripe Checkoutセッション作成
// 必要な環境変数（Vercelプロジェクト設定で登録）:
//   STRIPE_SECRET_KEY   : sk_live_xxx または sk_test_xxx
//   STRIPE_PRICE_STARTER: Stripeダッシュボードの price_xxx（スタンダードプランの料金ID）
//   STRIPE_PRICE_PRO    : Stripeダッシュボードの price_xxx（プロプランの料金ID）

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan, origin } = req.body || {};

  const PRICE_IDS = {
    starter: process.env.STRIPE_PRICE_STARTER,
    pro:     process.env.STRIPE_PRICE_PRO,
  };

  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return res.status(400).json({ error: `プラン「${plan}」の料金IDが設定されていません。Vercel環境変数を確認してください。` });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "STRIPE_SECRET_KEY が未設定です。Vercel環境変数を確認してください。" });
  }

  const appOrigin = (origin || "https://foodpilot.vercel.app").replace(/\/$/, "");

  try {
    const body = new URLSearchParams({
      mode:                       "subscription",
      "line_items[0][price]":     priceId,
      "line_items[0][quantity]":  "1",
      // 決済完了後のリダイレクト先 — セッションIDがライセンスキーになる
      success_url:   `${appOrigin}/?stripe_session={CHECKOUT_SESSION_ID}`,
      cancel_url:    `${appOrigin}/`,
      "metadata[plan]": plan,
      // 領収書メール自動送信
      "payment_method_collection": "always",
    });

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type":  "application/x-www-form-urlencoded",
        "Stripe-Version": "2024-04-10",
      },
      body: body.toString(),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe error:", stripeRes.status, JSON.stringify(session));
      return res.status(502).json({ error: session.error?.message || `Stripe APIエラー (HTTP ${stripeRes.status})` });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("stripe-checkout error:", err);
    return res.status(500).json({ error: err.message || "サーバーエラーが発生しました" });
  }
}
