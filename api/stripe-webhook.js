// Vercel Serverless Function — FoodPilot Stripe Webhook受信
// 必要な環境変数:
//   STRIPE_SECRET_KEY      : sk_live_xxx
//   STRIPE_WEBHOOK_SECRET  : whsec_xxx（Stripeダッシュボード→Webhooks で取得）
//
// Stripeダッシュボードで登録するWebhook URL:
//   https://あなたのドメイン/api/stripe-webhook
//
// 購読するイベント:
//   checkout.session.completed
//   customer.subscription.deleted

import { createHmac, timingSafeEqual } from "crypto";

// Vercel: JSONボディの自動パースを無効にしてraw bodyを受け取る
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function verifyStripeSignature(rawBody, sigHeader, secret) {
  // Stripe-Signature: t=タイムスタンプ,v1=HMAC
  const parts = {};
  sigHeader.split(",").forEach(part => {
    const idx = part.indexOf("=");
    if (idx > 0) parts[part.slice(0, idx)] = part.slice(idx + 1);
  });

  const ts = parts["t"];
  const v1 = parts["v1"];
  if (!ts || !v1) throw new Error("Stripe-Signatureヘッダーが不正です");

  // タイムスタンプが5分以上古い場合は拒否
  if (Math.abs(Date.now() / 1000 - parseInt(ts, 10)) > 300) {
    throw new Error("リクエストが古すぎます（タイムスタンプ超過）");
  }

  const signedPayload = `${ts}.${rawBody.toString()}`;
  const expected = createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");

  // タイミング攻撃を防ぐ定数時間比較
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(v1, "hex");
  if (expectedBuf.length !== receivedBuf.length || !timingSafeEqual(expectedBuf, receivedBuf)) {
    throw new Error("署名が一致しません");
  }

  return JSON.parse(rawBody.toString());
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    return res.status(400).json({ error: "ボディの読み取りに失敗しました" });
  }

  const sigHeader = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  if (webhookSecret && sigHeader) {
    try {
      event = verifyStripeSignature(rawBody, sigHeader, webhookSecret);
    } catch (err) {
      console.error("Webhook署名検証失敗:", err.message);
      return res.status(400).json({ error: `署名エラー: ${err.message}` });
    }
  } else {
    // 開発環境 or Webhook Secret未設定時: 署名検証をスキップ
    try {
      event = JSON.parse(rawBody.toString());
    } catch {
      return res.status(400).json({ error: "JSON解析に失敗しました" });
    }
  }

  console.log(`Stripe webhook: ${event.type} (id=${event.id})`);

  // ─── checkout.session.completed: 決済完了 ───
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const plan      = session.metadata?.plan;
    const email     = session.customer_details?.email;
    const sessionId = session.id; // これがライセンスキー

    console.log(`決済完了: plan=${plan}, email=${email}, sessionId=${sessionId}`);

    // ライセンスキー = sessionId (cs_xxx...)
    // activate.js でStripe APIを直接呼び出して検証するため、DBは不要
    // 必要に応じてここでメール送信や外部DBへの記録を追加できます
  }

  // ─── customer.subscription.deleted: サブスクリプションキャンセル ───
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    console.log(`サブスクリプションキャンセル: id=${subscription.id}, customer=${subscription.customer}`);
    // TODO: 該当ユーザーのプランをfreeに戻す処理（Supabase連携時に実装）
  }

  // ─── invoice.payment_failed: 支払い失敗 ───
  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;
    console.log(`支払い失敗: customer=${invoice.customer}, email=${invoice.customer_email}`);
  }

  return res.status(200).json({ received: true });
}
