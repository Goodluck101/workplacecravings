import type { Metadata } from "next";
import Image from "next/image";
import { OrderCta } from "@/components/OrderCta";
import { SectionHeading } from "@/components/SectionHeading";
import { corporateBenefits, menuCategories, siteConfig, wholesaleBenefits } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Business",
  description:
    `Corporate catering, institutional bulk orders, and wholesale supply for retailers across ${siteConfig.city}.`,
};

export default function BusinessPage() {
  const catering = menuCategories.find((category) => category.id === "combos");

  return (
    <>
      <section className="relative overflow-hidden bg-brand-green py-16 text-white sm:py-20">
        {catering && (
        <Image
          src={catering.image}
          alt={catering.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green/85 to-brand-green/40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            B2B & wholesale
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Fuel productivity with food people look forward to
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {siteConfig.name} partners with corporate organizations, schools, NGOs, event planners,
            and retailers who need dependable food at scale.
          </p>
        </div>
      </section>

      <section id="corporate" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionHeading
            eyebrow="Corporate & institutions"
            title="Large-quantity orders, professionally handled"
            description="From weekly staff lunches to one-off celebrations, we align with your timelines and workplace culture."
          />
          <ul className="space-y-3">
            {corporateBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 rounded-xl bg-brand-cream px-4 py-3 text-sm text-brand-green"
              >
                <span className="mt-0.5 font-bold text-brand-orange" aria-hidden>
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="wholesale" className="section-wash scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionHeading
            eyebrow="Retailers"
            title="Wholesale supply at partner-friendly rates"
            description="Stock what sells — shawarma ingredients and ready items, frozen treats, parfait, and snack lines depending on availability."
          />
          <ul className="space-y-3">
            {wholesaleBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 rounded-xl bg-white px-4 py-3 text-sm text-brand-green ring-1 ring-brand-green/10"
              >
                <span className="mt-0.5 font-bold text-brand-orange" aria-hidden>
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            title="Let's plan your next order"
            description={`Share expected headcount, preferred items, delivery location in ${siteConfig.city}, and date. We'll respond with options and pricing.`}
          />
          <div className="mt-8 flex justify-center">
            <OrderCta variant="inline" />
          </div>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
