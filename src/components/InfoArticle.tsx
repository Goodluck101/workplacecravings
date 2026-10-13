import Link from "next/link";
import type { InfoPage } from "@/lib/info";
import { noticeText } from "@/lib/info";

type InfoArticleProps = {
  page: InfoPage;
};

export function InfoArticle({ page }: InfoArticleProps) {
  return (
    <article>
      <header className="page-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{page.eyebrow}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-brand-green sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{page.summary}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Last updated {page.updated}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 sm:px-6">
        {page.blocks.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2
                key={index}
                id={block.id}
                className="font-display scroll-mt-28 pt-4 text-2xl font-extrabold text-brand-green"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "p") {
            return (
              <p key={index} className="text-base leading-relaxed text-brand-green/90">
                {block.text}
              </p>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-brand-green/90">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === "faq") {
            return (
              <div key={index} className="space-y-3">
                {block.items.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-brand-green/10 bg-white p-5">
                    <summary className="cursor-pointer font-display text-base font-bold text-brand-green">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            );
          }
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item) => (
                <li key={item.href + item.label} className="rounded-2xl border border-brand-green/10 bg-white p-4">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-brand-green hover:text-brand-orange"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="font-display font-bold text-brand-green hover:text-brand-orange">
                      {item.label}
                    </Link>
                  )}
                  <p className="mt-1 text-sm text-brand-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          );
        })}
        {page.disclaimer && (
          <p className="border-t border-brand-green/10 pt-6 text-sm leading-relaxed text-brand-muted">{noticeText}</p>
        )}
      </div>
    </article>
  );
}
