import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">404</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold text-brand-green">
        This page is not on the menu
      </h1>
      <p className="mt-3 text-brand-muted">
        The link may be outdated. Head back home or browse what we serve.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white hover:bg-brand-orange-dark"
        >
          Home
        </Link>
        <Link
          href="/menu"
          className="rounded-full border-2 border-brand-green/15 px-6 py-3 text-sm font-bold text-brand-green hover:bg-brand-cream"
        >
          View menu
        </Link>
      </div>
    </section>
  );
}
