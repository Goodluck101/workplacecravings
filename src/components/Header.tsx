"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { navLinks, siteConfig, whatsappUrl } from "@/lib/site";

const orderHref = whatsappUrl(`Hello ${siteConfig.name}, I'd like to place an order.`);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_1px_0_rgba(27,45,42,0.08)] backdrop-blur-md">
      <div className="h-0.5 bg-gradient-to-r from-brand-orange via-brand-orange/50 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-20 w-auto sm:h-24" priority />
        </Link>

        <nav
          className={`absolute left-0 right-0 top-full border-b border-brand-green/10 bg-white px-4 py-4 shadow-lg lg:static lg:flex lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            open ? "block" : "hidden lg:flex"
          }`}
          aria-label="Main"
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-green/10 text-brand-green"
                        : "text-brand-muted hover:bg-brand-cream hover:text-brand-green"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-orange/25 transition hover:bg-brand-orange-dark lg:inline-flex"
          >
            Order on WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-brand-green lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-brand-green/10 px-4 pb-4 lg:hidden">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full justify-center rounded-full bg-brand-orange px-4 py-3 text-sm font-bold text-white"
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
