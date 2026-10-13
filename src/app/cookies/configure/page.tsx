import type { Metadata } from "next";
import { CookieSettings } from "@/components/CookieSettings";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Configure the cookies",
  description: `Choose which cookie categories this browser may store for ${siteConfig.name}.`,
};

export default function ConfigureCookiesPage() {
  return <CookieSettings />;
}
