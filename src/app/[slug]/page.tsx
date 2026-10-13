import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoArticle } from "@/components/InfoArticle";
import { infoPageList, infoPages, type InfoSlug } from "@/lib/info";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findPage(slug: string) {
  if (slug in infoPages) return infoPages[slug as InfoSlug];
  return undefined;
}

export function generateStaticParams() {
  return infoPageList.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};
  return { title: page.label, description: page.description };
}

export default async function InfoRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();
  return <InfoArticle page={page} />;
}
