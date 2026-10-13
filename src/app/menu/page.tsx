import type { Metadata } from "next";
import Image from "next/image";
import { OrderCta } from "@/components/OrderCta";
import { SectionHeading } from "@/components/SectionHeading";
import { menuCategories, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    `Shawarma, burgers, small chops, ice cream, parfait, and combo meals for individuals and bulk orders in ${siteConfig.city}.`,
};

export default function MenuPage() {
  return (
    <>
      <section className="page-hero py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our menu"
            title="Fresh picks for every appetite"
            description="Menu items and pricing may vary by season and order size. Contact us for corporate menus, event trays, and wholesale catalogs."
          />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          {menuCategories.map((category, index) => (
            <article
              key={category.id}
              id={category.id}
              className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2"
            >
              <div
                className={`relative h-72 overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand-green/10 sm:h-96 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl font-extrabold text-brand-green">{category.name}</h2>
                <p className="mt-2 text-brand-muted">{category.description}</p>
                <ul className="mt-6 divide-y divide-brand-green/10">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-brand-green">{item.name}</h3>
                        <p className="mt-1 text-sm text-brand-muted">{item.description}</p>
                      </div>
                      {item.note && (
                        <span className="shrink-0 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
                          {item.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <OrderCta />
    </>
  );
}
