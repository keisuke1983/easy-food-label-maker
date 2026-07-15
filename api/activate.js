// Vercel Serverless Function — FoodPilot ライセンス認証
// 対応する3種類のキー:
//   1. モニターコード  : TRIAL_CODE 環境変数と照合 → trial プラン
//   2. Stripe セッションID (cs_xxx...) : Stripe API で決済確認 → starter/pro プラン
//   3. 手動ライセンスキー (FP-xxx) : VALID_LICENSES 環境変数と照合 → starter/pro プラン
//
// 環境変数一覧:
//   TRIAL_CODE      : モニター参加コード（例: MONITOR2026）
//   STRIPE_SECRET_KEY : Stripe秘密鍵（cs_xxx 検証に使用）
//   VALID_LICENSES  : JSON文字列 {"FP-STARTER-XXXX":"starter","FP-PRO-YYYY":"pro"}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { key } = req.body || {};
  if (!key || typeof key !== "string") {
    return res.status(400).json({ ok: false, error: "キーを入力してください" });
  }

  const trimmedKey = key.trim();

  // ── 1. モニター参加コード ─────────────────────────────────────────────
  const trialCode = process.env.TRIAL_CODE;
  if (trialCode && trimmedKey === trialCode) {
    return res.status(200).json({ ok: true, plan: "trial" });
  }

  // ── 2. Stripe セッションID (cs_live_xxx / cs_test_xxx) ───────────────
  if (trimmedKey.startsWith("cs_live_") || trimmedKey.startsWith("cs_test_")) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return res.status(500).json({ ok: false, error: "Stripe設定が未完了です。管理者にお問い合わせください。" });
    }
    try {
      const stripeRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(trimmedKey)}`,
        { headers: { "Authorization": `Bearer ${stripeKey}`, "Stripe-Version": "2024-04-10" } }
      );
      const session = await stripeRes.json();

      if (!stripeRes.ok) {
        console.error("Stripe session fetch error:", JSON.stringify(session));
        return res.status(400).json({ ok: false, error: "決済セッションが確認できませんでした。" });
      }

      if (session.payment_status !== "paid") {
        return res.status(400).json({ ok: false, error: "決済が完了していません（未払い）。" });
      }

      const plan = session.metadata?.plan;
      if (!plan || !["starter", "pro"].includes(plan)) {
        return res.status(400).json({ ok: false, error: "プラン情報が取得できませんでした。" });
      }

      return res.status(200).json({ ok: true, plan });
    } catch (err) {
      console.error("Stripe verification error:", err);
      return res.status(500).json({ ok: false, error: "Stripe APIへの接続に失敗しました。しばらくしてから再試行してください。" });
    }
  }

  // ── 3. 手動ライセンスキー (VALID_LICENSES) ────────────────────────────
  const rawEnv = process.env.VALID_LICENSES;
  if (!rawEnv) {
    // 開発環境フォールバック
    if (trimmedKey === "FP-TEST-0000") {
      return res.status(200).json({ ok: true, plan: "pro" });
    }
    return res.status(500).json({ ok: false, error: "サーバー設定が未完了です。管理者にお問い合わせください。" });
  }

  let licenses;
  try {
    licenses = JSON.parse(rawEnv);
  } catch {
    return res.status(500).json({ ok: false, error: "サーバー設定が不正です。" });
  }

  const plan = licenses[trimmedKey];
  if (!plan) {
    return res.status(400).json({ ok: false, error: "ライセンスキーが正しくありません。" });
  }

  return res.status(200).json({ ok: true, plan });
}
