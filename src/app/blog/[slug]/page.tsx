import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="page-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            {post.date} · {post.readingMinutes} min read
          </p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-brand-green sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">{post.description}</p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 sm:px-6">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-brand-green/90">
            {paragraph}
          </p>
        ))}
        <Link href="/blog" className="inline-flex text-sm font-bold text-brand-orange hover:underline">
          Back to the blog
        </Link>
      </div>
    </article>
  );
}
