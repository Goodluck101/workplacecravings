"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cookieBannerCopy } from "@/lib/info";
import {
  cookieStorageKey,
  defaultCookieChoice,
  type CookieChoice,
} from "@/lib/cookies";

function readChoice(): CookieChoice | null {
  try {
    const raw = localStorage.getItem(cookieStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieChoice;
    if (parsed.essential !== true) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookieChoice(choice: Omit<CookieChoice, "essential" | "updatedAt">) {
  const stored: CookieChoice = {
    essential: true,
    preferences: choice.preferences,
    analytics: choice.analytics,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(cookieStorageKey, JSON.stringify(stored));
  window.dispatchEvent(new Event("wc-cookie-choice"));
  return stored;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readChoice() === null);
    const onChange = () => setVisible(readChoice() === null);
    window.addEventListener("wc-cookie-choice", onChange);
    return () => window.removeEventListener("wc-cookie-choice", onChange);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-brand-green/10 bg-white p-5 shadow-2xl shadow-brand-green/20 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-base font-bold text-brand-green">{cookieBannerCopy.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-muted">{cookieBannerCopy.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-stretch">
          <button
            type="button"
            className="rounded-full bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-brand-orange-dark"
            onClick={() => {
              saveCookieChoice({ preferences: true, analytics: true });
              setVisible(false);
            }}
          >
            {cookieBannerCopy.accept}
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-green/15 px-4 py-2 text-sm font-bold text-brand-green hover:bg-brand-cream"
            onClick={() => {
              saveCookieChoice(defaultCookieChoice);
              setVisible(false);
            }}
          >
            {cookieBannerCopy.essential}
          </button>
          <Link
            href="/cookies/configure"
            className="text-center text-sm font-bold text-brand-orange hover:underline"
          >
            {cookieBannerCopy.configure}
          </Link>
        </div>
      </div>
    </div>
  );
}
