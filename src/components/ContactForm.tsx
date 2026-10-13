"use client";

import { useState } from "react";
import { orderTypes, siteConfig, whatsappUrl } from "@/lib/site";

type OrderType = "individual" | "corporate" | "wholesale" | "other";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const orderType = String(data.get("orderType") || "individual") as OrderType;
    const message = String(data.get("message") || "");
    const phone = String(data.get("phone") || "");

    const lines = [
      `Hello ${siteConfig.name},`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Order type: ${orderType}`,
      "",
      message,
    ];

    const text = lines.join("\n");
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="font-display text-xl font-bold text-brand-green">Send an inquiry</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Submitting copies your message and opens our WhatsApp chat. Paste it there to send the order.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold text-brand-green">Your name</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-semibold text-brand-green">Phone number</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={`+${siteConfig.phoneCountryCode}`}
            className="mt-1 w-full rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">Order type</span>
        <select
          name="orderType"
          className="mt-1 w-full rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2"
          defaultValue={orderTypes[0].value}
        >
          {orderTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm">
        <span className="font-semibold text-brand-green">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder={`What would you like to order? Include delivery area in ${siteConfig.city}, date, and headcount if applicable.`}
          className="mt-1 w-full resize-y rounded-xl border border-brand-green/15 px-4 py-2.5 outline-none ring-brand-orange focus:ring-2"
        />
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand-orange py-3 text-sm font-bold text-white transition hover:bg-brand-orange-dark sm:w-auto sm:px-8"
      >
        Continue on WhatsApp
      </button>

      {submitted && (
        <p className="mt-4 text-sm text-brand-muted" role="status">
          If WhatsApp did not open, allow pop-ups or use the header button. Paste your message into the chat if it is not already there.
        </p>
      )}
    </form>
  );
}
