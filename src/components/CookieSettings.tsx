"use client";

import { useEffect, useState } from "react";
import { saveCookieChoice } from "@/components/CookieConsent";
import { cookieCategories, cookieStorageKey, type CookieChoice } from "@/lib/cookies";
import { legalUpdated } from "@/lib/info";
import { siteConfig } from "@/lib/site";

export function CookieSettings() {
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(cookieStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CookieChoice;
      setPreferences(Boolean(parsed.preferences));
      setAnalytics(Boolean(parsed.analytics));
      setSavedAt(parsed.updatedAt);
    } catch {
      setSavedAt("");
    }
  }, []);

  function persist(next: { preferences: boolean; analytics: boolean }, note: string) {
    const stored = saveCookieChoice(next);
    setPreferences(stored.preferences);
    setAnalytics(stored.analytics);
    setSavedAt(stored.updatedAt);
    setMessage(note);
  }

  return (
    <article>
      <header className="page-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Privacy</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-brand-green sm:text-5xl">
            Configure the cookies
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            Choose what this browser may remember. Strictly necessary storage stays on so we can keep this choice.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Last updated {legalUpdated}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        {cookieCategories.map((category) => {
          const checked = category.id === "essential" ? true : category.id === "preferences" ? preferences : analytics;
          return (
            <label
              key={category.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-brand-green/10 bg-white p-5"
            >
              <span>
                <span className="font-display block font-bold text-brand-green">{category.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-brand-muted">{category.description}</span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-brand-orange"
                checked={checked}
                disabled={category.required}
                onChange={(event) => {
                  if (category.id === "preferences") setPreferences(event.target.checked);
                  if (category.id === "analytics") setAnalytics(event.target.checked);
                }}
              />
            </label>
          );
        })}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-orange-dark"
            onClick={() => persist({ preferences, analytics }, "Your choice has been saved in this browser.")}
          >
            Save choice
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-green/15 px-5 py-2.5 text-sm font-bold text-brand-green hover:bg-brand-cream"
            onClick={() => persist({ preferences: false, analytics: false }, "Only essential storage is on.")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-green/15 px-5 py-2.5 text-sm font-bold text-brand-green hover:bg-brand-cream"
            onClick={() => persist({ preferences: true, analytics: true }, "All categories are on.")}
          >
            Accept all
          </button>
        </div>
        {message && (
          <p className="text-sm font-semibold text-brand-green" role="status">
            {message}
          </p>
        )}
        {savedAt && (
          <p className="text-xs text-brand-muted">Last saved {new Date(savedAt).toLocaleString(siteConfig.locale)}.</p>
        )}
      </div>
    </article>
  );
}
