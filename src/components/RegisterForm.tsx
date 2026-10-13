"use client";

import Link from "next/link";
import { useState } from "react";
import { contactEmails, siteConfig } from "@/lib/site";

type AccountType = "person" | "company";
type Method = "email" | "phone";

const fieldClass =
  "mt-1 w-full rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2";

export function RegisterForm() {
  const [accountType, setAccountType] = useState<AccountType>("person");
  const [method, setMethod] = useState<Method>("email");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<"email" | "phone" | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType,
          method,
          name: data.get("name"),
          companyName: data.get("companyName"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error || "Registration could not be completed.");
        return;
      }
      setDone(method);
    } catch {
      setError("Registration could not be completed. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8" role="status">
        <h2 className="font-display text-xl font-bold text-brand-green">You are registered</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          {done === "email"
            ? `A confirmation email is on its way from ${contactEmails[contactEmails.length - 1]}.`
            : `A confirmation text is on its way from ${siteConfig.phoneDisplay}.`}
        </p>
        <Link href="/order" className="mt-6 inline-flex rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white">
          Place an order
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-bold text-brand-green">Create a registration</h2>
      <p className="mt-1 text-sm text-brand-muted">
        People and companies can register with an email address or a phone number. WhatsApp ordering stays available.
      </p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-brand-green">I am registering as</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <Choice pressed={accountType === "person"} onClick={() => setAccountType("person")}>
            A person
          </Choice>
          <Choice pressed={accountType === "company"} onClick={() => setAccountType("company")}>
            A company
          </Choice>
        </div>
      </fieldset>

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">Your name</span>
        <input required name="name" autoComplete="name" className={fieldClass} />
      </label>

      {accountType === "company" && (
        <label className="mt-4 block text-sm">
          <span className="font-semibold text-brand-green">Company name</span>
          <input required name="companyName" autoComplete="organization" className={fieldClass} />
        </label>
      )}

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-brand-green">Register with</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <Choice pressed={method === "email"} onClick={() => setMethod("email")}>
            Email
          </Choice>
          <Choice pressed={method === "phone"} onClick={() => setMethod("phone")}>
            Phone number
          </Choice>
        </div>
      </fieldset>

      {method === "email" ? (
        <label className="mt-4 block text-sm">
          <span className="font-semibold text-brand-green">Email</span>
          <input required name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>
      ) : (
        <label className="mt-4 block text-sm">
          <span className="font-semibold text-brand-green">Phone number</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={`+${siteConfig.phoneCountryCode}`}
            className={fieldClass}
          />
        </label>
      )}

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
        {pending ? "Sending confirmation…" : "Register"}
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
