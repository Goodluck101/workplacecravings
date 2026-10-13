import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site";

type OrderCtaProps = {
  variant?: "banner" | "inline";
};

export function OrderCta({ variant = "banner" }: OrderCtaProps) {
  const waUrl = whatsappUrl(`Hello ${siteConfig.name}, I'd like to place an order.`);

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition hover:bg-brand-orange-dark"
        >
          WhatsApp Order
        </a>
        <Link
          href="/order"
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-green/20 px-6 py-3 text-sm font-bold text-brand-green transition hover:border-brand-green hover:bg-brand-cream"
        >
          Order on the site
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-green/20 px-6 py-3 text-sm font-bold text-brand-green transition hover:border-brand-green hover:bg-brand-cream"
        >
          Request a quote
        </Link>
      </div>
    );
  }

  return (
    <section className="band-dark py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Ready when you are
          </p>
          <h2 className="font-display mt-2 text-2xl font-extrabold sm:text-3xl">
            Feed your team, event, or craving today
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/75">
            Individual meals, bulk corporate orders, and wholesale for retailers — we deliver across {siteConfig.city}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-orange-dark"
          >
            Order on WhatsApp
          </a>
          <Link
            href="/order"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Order on the site
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
