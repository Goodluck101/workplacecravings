import type { Metadata } from "next";
import Link from "next/link";
import { blogIndex } from "@/lib/info";

export const metadata: Metadata = {
  title: blogIndex.title,
  description: blogIndex.description,
};

export default function BlogPage() {
  return (
    <article>
      <header className="page-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Journal</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-brand-green sm:text-5xl">
            {blogIndex.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{blogIndex.summary}</p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        {blogIndex.posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-brand-green/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-orange/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
              {post.date} · {post.readingMinutes} min read
            </p>
            <h2 className="font-display mt-2 text-2xl font-extrabold text-brand-green">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
