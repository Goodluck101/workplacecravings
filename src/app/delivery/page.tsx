import type { Metadata } from "next";
import Link from "next/link";
import { OrderCta } from "@/components/OrderCta";
import { SectionHeading } from "@/components/SectionHeading";
import { courierPartners, deliveryFaqs, deliveryTips, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    `Doorstep delivery across ${siteConfig.city} via trusted courier partners.`,
};

export default function DeliveryPage() {
  return (
    <>
      <section className="page-hero py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Delivery"
            title="From our kitchen to your doorstep"
            description={`${siteConfig.name} delivers to homes, offices, campuses, and event venues in ${siteConfig.location} — powered by reliable courier services.`}
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-brand-green">Courier partners</h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-muted">
            We work with trusted third-party delivery platforms operating in {siteConfig.city}, including:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {courierPartners.map((name) => (
              <li
                key={name}
                className="rounded-full border border-brand-green/15 bg-white px-4 py-2 text-sm font-semibold text-brand-green"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-brand-muted">
            Available platforms may vary by location, order size, and time of day. When you order via{" "}
            <Link href="/contact" className="font-bold text-brand-orange hover:underline">
              WhatsApp or contact
            </Link>
            , we confirm the best delivery option for your order.
          </p>
        </div>
      </section>

      <section className="bg-brand-green py-14 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-extrabold">Delivery tips for a smooth experience</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {deliveryTips.map((tip) => (
              <li key={tip} className="rounded-xl bg-white/10 p-4 text-sm text-white/90">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" title="Common questions" />
          <dl className="mt-10 space-y-6">
            {deliveryFaqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-brand-green/10 p-5">
                <dt className="font-display font-bold text-brand-green">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
