import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

type MailSettings = {
  from: string;
  host: string;
  port: number;
  user: string;
  pass: string;
};

function mailSettings(): MailSettings {
  const from = process.env.NOTIFICATION_FROM_EMAIL?.trim() ?? "";
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  const user = process.env.SMTP_USER?.trim() ?? "";
  const pass = (process.env.SMTP_PASS ?? "").replace(/\s+/g, "");
  if (!from || !host || !user || !pass || !Number.isFinite(port)) {
    throw new Error("Email delivery is not configured.");
  }
  return { from, host, port, user, pass };
}

export async function sendEmail(to: string, subject: string, text: string) {
  const settings = mailSettings();
  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    requireTLS: settings.port === 587,
    auth: { user: settings.user, pass: settings.pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
  await transporter.sendMail({
    from: `${siteConfig.name} <${settings.from}>`,
    to,
    subject,
    text,
  });
}

function smsFrom(): string {
  const configured = process.env.SMS_FROM?.trim();
  return (configured || siteConfig.phoneTel).replace(/^\+/, "");
}

export async function sendSms(toDigits: string, body: string) {
  const provider = (process.env.SMS_PROVIDER?.trim() || "termii").toLowerCase();
  const apiKey = process.env.SMS_API_KEY?.trim() ?? "";
  if (!apiKey && provider !== "twilio") {
    throw new Error("Text delivery is not configured.");
  }

  if (provider === "twilio") {
    const sid = process.env.TWILIO_ACCOUNT_SID?.trim() ?? "";
    const token = process.env.TWILIO_AUTH_TOKEN?.trim() ?? "";
    if (!sid || !token) throw new Error("Text delivery is not configured.");
    const params = new URLSearchParams({
      To: `+${toDigits}`,
      From: `+${smsFrom()}`,
      Body: body,
    });
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    if (!response.ok) throw new Error("Text delivery failed.");
    return;
  }

  const url = process.env.SMS_API_URL?.trim() ?? "";
  if (!url || !apiKey) throw new Error("Text delivery is not configured.");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: toDigits,
      from: smsFrom(),
      sms: body,
      type: "plain",
      channel: process.env.SMS_CHANNEL?.trim() || "generic",
      api_key: apiKey,
    }),
  });
  const payload = (await response.json().catch(() => null)) as { code?: string } | null;
  if (!response.ok || (payload?.code && payload.code !== "ok")) {
    throw new Error("Text delivery failed.");
  }
}

export async function notifyCustomer(input: {
  email?: string;
  phone?: string;
  subject: string;
  emailText: string;
  smsText: string;
}) {
  if (input.email) await sendEmail(input.email, input.subject, input.emailText);
  if (input.phone) await sendSms(input.phone, input.smsText);
}

export async function notifyKitchen(subject: string, text: string) {
  const recipients = new Set<string>();
  const from = process.env.NOTIFICATION_FROM_EMAIL?.trim();
  if (from) recipients.add(from);
  recipients.add(siteConfig.email);
  for (const recipient of recipients) {
    await sendEmail(recipient, subject, text);
  }
}
