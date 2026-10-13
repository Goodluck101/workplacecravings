import Link from "next/link";
import { Logo } from "@/components/Logo";
import { companyFooterLinks, impactFooterLinks, legalFooterLinks } from "@/lib/info";
import { contactEmails, siteConfig } from "@/lib/site";

function footerHref(item: { slug?: string; href?: string }) {
  return item.href ?? `/${item.slug}`;
}

const linkColumns = [
  { title: "Impact & Sustainability", links: impactFooterLinks, span: "lg:col-span-3" },
  { title: "Company", links: companyFooterLinks, span: "lg:col-span-2" },
  { title: "Legal", links: legalFooterLinks, span: "lg:col-span-3" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-dark mt-auto text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10">
              <Logo className="h-24 w-auto sm:h-28" />
            </Link>
            <p className="mt-4 text-sm text-white/70">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">{siteConfig.description}</p>
          </div>

          {linkColumns.map((column) => (
            <div key={column.title} className={column.span}>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={footerHref(link)} className="text-sm text-white/80 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">Contact</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-white/85 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
            <li className="whitespace-nowrap">{siteConfig.location}</li>
            <li>
              <a href={`tel:${siteConfig.phoneTel}`} className="whitespace-nowrap transition hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            {contactEmails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="whitespace-nowrap transition hover:text-white">
                  {email}
                </a>
              </li>
            ))}
            <li className="whitespace-nowrap">{siteConfig.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
