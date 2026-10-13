import { randomUUID } from "node:crypto";
import { clientIp, limited, rejected, sameSite } from "@/lib/api-guard";
import { cleanText, normalizeEmail, normalizePhone, type AccountType } from "@/lib/contacts";
import { notifyCustomer, notifyKitchen } from "@/lib/notify";
import { createOrder, memberMatch, referenceCode } from "@/lib/records";
import { displayPhone, siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  accountType?: string;
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  area?: string;
  details?: string;
  website?: string;
};

export async function POST(request: Request) {
  if (!sameSite(request)) return rejected("This order could not be accepted.", 403);
  if (limited(clientIp(request))) {
    return rejected("Please wait a few minutes before trying again.", 429);
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return rejected("Enter the order details and try again.", 400);
  }

  if (body.website) return Response.json({ ok: true, reference: "" });

  const accountType: AccountType | null =
    body.accountType === "person" || body.accountType === "company" ? body.accountType : null;
  const name = cleanText(String(body.name ?? ""), 120);
  const companyName = cleanText(String(body.companyName ?? ""), 160);
  const email = normalizeEmail(String(body.email ?? ""));
  const phone = normalizePhone(String(body.phone ?? ""));
  const area = cleanText(String(body.area ?? ""), 160);
  const details = cleanText(String(body.details ?? ""), 2000);

  if (!accountType || !name) return rejected("Add your name and choose person or company.", 400);
  if (accountType === "company" && !companyName) return rejected("Add the company name.", 400);
  if (!details) return rejected("Tell us what you would like to order.", 400);
  if (String(body.email ?? "").trim() && !email) return rejected("Enter a valid email address.", 400);
  if (String(body.phone ?? "").trim() && !phone) return rejected("Enter a valid phone number.", 400);

  const member = await memberMatch(email ?? undefined, phone ?? undefined);
  if (!member && !phone) {
    return rejected("Add a phone number so we can contact you, or register before ordering with email only.", 400);
  }

  const reference = referenceCode();
  const label = companyName || name;
  const sms = `${siteConfig.name}: Order ${reference} received for ${label}. We will confirm details before the kitchen starts.`;
  const emailText = [
    `Hello ${name},`,
    "",
    `We have received your order. Reference ${reference}.`,
    "",
    details,
    area ? `Delivery area: ${area}` : "",
    "",
    "We will confirm the menu, timing, and fee before the kitchen starts. You can still reach us on WhatsApp if you prefer.",
    "",
    siteConfig.name,
    siteConfig.location,
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    await createOrder(
      {
        id: randomUUID(),
        reference,
        accountType,
        name,
        companyName: companyName || undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
        registered: Boolean(member),
        area,
        details,
        createdAt: new Date().toISOString(),
      },
      async () => {
        await notifyCustomer({
          email: email ?? undefined,
          phone: phone ?? undefined,
          subject: `Order ${reference} received — ${siteConfig.name}`,
          emailText,
          smsText: sms,
        });
        try {
          await notifyKitchen(
            `New website order ${reference}`,
            [
              `Reference: ${reference}`,
              `Name: ${name}`,
              companyName ? `Company: ${companyName}` : "",
              email ? `Email: ${email}` : "",
              phone ? `Phone: ${displayPhone(phone)}` : "",
              member ? "Registered member" : "Guest order",
              area ? `Area: ${area}` : "",
              "",
              details,
            ]
              .filter((line) => line !== "")
              .join("\n"),
          );
        } catch (error) {
          console.error(error);
        }
      },
    );
  } catch (error) {
    console.error(error);
    return rejected(
      "We could not send your confirmation, so the order was not completed. Please try again, or order on WhatsApp.",
      502,
    );
  }

  return Response.json({
    ok: true,
    reference,
    emailed: Boolean(email),
    texted: Boolean(phone),
  });
}
