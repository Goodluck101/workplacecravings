import { randomUUID } from "node:crypto";
import { clientIp, limited, rejected, sameSite } from "@/lib/api-guard";
import { cleanText, normalizeEmail, normalizePhone, type AccountType } from "@/lib/contacts";
import { notifyCustomer, notifyKitchen } from "@/lib/notify";
import { createRegistration } from "@/lib/records";
import { displayPhone, siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  accountType?: string;
  name?: string;
  companyName?: string;
  method?: string;
  email?: string;
  phone?: string;
  website?: string;
};

export async function POST(request: Request) {
  if (!sameSite(request)) return rejected("This registration could not be accepted.", 403);
  if (limited(clientIp(request))) {
    return rejected("Please wait a few minutes before trying again.", 429);
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return rejected("Enter your details and try again.", 400);
  }

  if (body.website) return Response.json({ ok: true });

  const accountType: AccountType | null =
    body.accountType === "person" || body.accountType === "company" ? body.accountType : null;
  const name = cleanText(String(body.name ?? ""), 120);
  const companyName = cleanText(String(body.companyName ?? ""), 160);
  const email = body.method === "email" ? normalizeEmail(String(body.email ?? "")) : null;
  const phone = body.method === "phone" ? normalizePhone(String(body.phone ?? "")) : null;

  if (!accountType || !name) return rejected("Add your name and choose person or company.", 400);
  if (accountType === "company" && !companyName) return rejected("Add the company name.", 400);
  if (body.method === "email" && !email) return rejected("Enter a valid email address.", 400);
  if (body.method === "phone" && !phone) return rejected("Enter a valid phone number.", 400);
  if (!email && !phone) return rejected("Register with an email address or a phone number.", 400);

  const label = companyName || name;
  const sms = `${siteConfig.name}: ${label}, your registration is confirmed. You can order on our website or on WhatsApp.`;
  const emailText = [
    `Hello ${name},`,
    "",
    `Your ${accountType === "company" ? "company" : "personal"} registration with ${siteConfig.name} is confirmed.`,
    companyName ? `Company: ${companyName}` : "",
    "",
    "You can place orders on our website. WhatsApp ordering is still available if you prefer it.",
    "",
    siteConfig.name,
    siteConfig.location,
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    const result = await createRegistration(
      {
        id: randomUUID(),
        accountType,
        name,
        companyName: companyName || undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
        createdAt: new Date().toISOString(),
      },
      async () => {
        await notifyCustomer({
          email: email ?? undefined,
          phone: phone ?? undefined,
          subject: `Registration confirmed — ${siteConfig.name}`,
          emailText,
          smsText: sms,
        });
        try {
          await notifyKitchen(
            `New registration — ${label}`,
            [
              `Name: ${name}`,
              companyName ? `Company: ${companyName}` : "",
              email ? `Email: ${email}` : "",
              phone ? `Phone: ${displayPhone(phone)}` : "",
              `Type: ${accountType}`,
            ]
              .filter(Boolean)
              .join("\n"),
          );
        } catch (error) {
          console.error(error);
        }
      },
    );

    if (result === "exists") {
      return rejected("This email or phone is already registered. You can place an order with it.", 409);
    }
  } catch (error) {
    console.error(error);
    return rejected(
      "We could not send your confirmation, so the registration was not completed. Please try again, or order on WhatsApp.",
      502,
    );
  }

  return Response.json({
    ok: true,
    emailed: Boolean(email),
    texted: Boolean(phone),
  });
}
