import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { OrderCta } from "@/components/OrderCta";
import { SectionHeading } from "@/components/SectionHeading";
import {
  audiences,
  courierPartners,
  heroSlides,
  highlights,
  menuCategories,
  orderSteps,
  siteConfig,
} from "@/lib/site";

export default function HomePage() {
  const previewCategories = menuCategories.slice(0, 4);

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="border-b border-brand-green/10 bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-brand-green/10 px-4 py-7 sm:px-6 lg:px-8">
          {highlights.map((item) => (
            <div key={item.label} className="px-3 first:pl-0 last:pr-0 sm:px-6">
              <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {item.label}
              </dt>
              <dd className="font-display mt-1 text-sm font-bold text-brand-green sm:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={siteConfig.tagline}
            title="Built for scale — personal enough for one"
            description={`Whether you are feeding five hundred staff or treating yourself after a long day, ${siteConfig.name} meets you where you are.`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audiences.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-brand-green group-hover:text-brand-orange">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-brand-orange">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wash py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Menu highlights"
              title="Crowd favorites from our kitchen"
              description="Explore full categories on the menu page — pricing shared on request for bulk and wholesale."
            />
            <Link href="/menu" className="shrink-0 text-sm font-bold text-brand-orange hover:underline">
              View full menu →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {previewCategories.map((category) => (
              <Link
                key={category.id}
                href={`/menu#${category.id}`}
                className="group grid overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[11rem_1fr]"
              >
                <div className="relative h-44 sm:h-full sm:min-h-40">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(min-width: 640px) 176px, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-brand-green">{category.name}</h3>
                  <p className="mt-1 text-sm text-brand-muted">{category.description}</p>
                  <ul className="mt-3 space-y-1">
                    {category.items.slice(0, 2).map((item) => (
                      <li key={item.name} className="text-sm font-semibold text-brand-green/90">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="From order to doorstep"
            description="We keep the process simple so HR, admin, retail buyers, and individual customers can order with confidence."
            align="center"
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {orderSteps.map((item) => (
              <li key={item.step} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-green/10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10 font-display text-sm font-extrabold text-brand-orange">
                  {item.step}
                </span>
                <h3 className="font-display mt-2 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-brand-muted">
            Delivery across {siteConfig.city} via partners including {courierPartners.slice(0, -1).join(", ")}, and
            more.{" "}
            <Link href="/delivery" className="font-bold text-brand-orange hover:underline">
              See delivery details
            </Link>
          </p>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
