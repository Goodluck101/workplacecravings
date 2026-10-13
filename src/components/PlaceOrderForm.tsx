"use client";

import Link from "next/link";
import { useState } from "react";
import { contactEmails, siteConfig, whatsappUrl } from "@/lib/site";

type AccountType = "person" | "company";

const fieldClass =
  "mt-1 w-full rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2";

export function PlaceOrderForm() {
  const [accountType, setAccountType] = useState<AccountType>("person");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ reference: string; emailed: boolean; texted: boolean } | null>(null);
  const waUrl = whatsappUrl(`Hello ${siteConfig.name}, I'd like to place an order.`);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType,
          name: data.get("name"),
          companyName: data.get("companyName"),
          email: data.get("email"),
          phone: data.get("phone"),
          area: data.get("area"),
          details: data.get("details"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        reference?: string;
        emailed?: boolean;
        texted?: boolean;
      };
      if (!response.ok || !payload.reference) {
        setError(payload.error || "The order could not be completed.");
        return;
      }
      setResult({
        reference: payload.reference,
        emailed: Boolean(payload.emailed),
        texted: Boolean(payload.texted),
      });
    } catch {
      setError("The order could not be completed. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    const sent = [
      result.emailed ? `an email from ${contactEmails[contactEmails.length - 1]}` : "",
      result.texted ? `a text from ${siteConfig.phoneDisplay}` : "",
    ].filter(Boolean);
    return (
      <div className="rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8" role="status">
        <h2 className="font-display text-xl font-bold text-brand-green">Order received</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          Reference <span className="font-bold text-brand-green">{result.reference}</span>. We sent {sent.join(" and ")}.
          We will confirm the menu, timing, and fee before the kitchen starts.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-bold text-brand-green">Order on the website</h2>
      <p className="mt-1 text-sm leading-relaxed text-brand-muted">
        Registered members can order with the email or phone on their registration. If you have not registered, add a
        phone number so we can contact you. You can still{" "}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-orange hover:underline">
          order on WhatsApp
        </a>
        .
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-brand-green">Ordering as</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <Choice pressed={accountType === "person"} onClick={() => setAccountType("person")}>
            A person
          </Choice>
          <Choice pressed={accountType === "company"} onClick={() => setAccountType("company")}>
            A company
          </Choice>
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold text-brand-green">Your name</span>
          <input required name="name" autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="font-semibold text-brand-green">Phone number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={`+${siteConfig.phoneCountryCode}`}
            className={fieldClass}
          />
        </label>
      </div>

      {accountType === "company" && (
        <label className="mt-4 block text-sm">
          <span className="font-semibold text-brand-green">Company name</span>
          <input required name="companyName" autoComplete="organization" className={fieldClass} />
        </label>
      )}

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">Email</span>
        <input name="email" type="email" autoComplete="email" className={fieldClass} />
      </label>

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">Delivery area in {siteConfig.city}</span>
        <input name="area" autoComplete="street-address" className={fieldClass} />
      </label>

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">What would you like to order?</span>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="Items, quantity or headcount, and the time you need them."
          className={`${fieldClass} resize-y`}
        />
      </label>

      <p className="mt-3 text-sm text-brand-muted">
        No registration yet? <Link href="/register" className="font-bold text-brand-orange hover:underline">Register with email or phone</Link>.
      </p>

      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-brand-orange py-3 text-sm font-bold text-white transition hover:bg-brand-orange-dark disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Sending confirmation…" : "Place order"}
      </button>
    </form>
  );
}

function Choice({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-bold ${
        pressed ? "bg-brand-green text-white" : "bg-brand-cream text-brand-green"
      }`}
    >
      {children}
    </button>
  );
}
