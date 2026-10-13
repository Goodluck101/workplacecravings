import { siteConfig } from "@/lib/site";

export type AccountType = "person" | "company";

export function normalizeEmail(input: string): string | null {
  const email = input.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return null;
  return email;
}

export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("0")) {
    digits = `${siteConfig.phoneCountryCode}${digits.slice(1)}`;
  }
  if (!digits.startsWith(siteConfig.phoneCountryCode)) return null;
  const national = digits.slice(siteConfig.phoneCountryCode.length);
  if (national.length !== siteConfig.phoneNationalLength) return null;
  return digits;
}

export function cleanText(input: string, max: number): string {
  return input.replace(/\s+/g, " ").trim().slice(0, max);
}
