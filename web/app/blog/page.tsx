import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AUTHOR, POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Blog — Guías sobre páginas web para negocios | JV Agencia",
  description:
    "Precios reales, plazos y criterios para decidir sobre la web de tu negocio. Sin tecnicismos y sin vender humo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description:
      "Precios reales, plazos y criterios para decidir sobre la web de tu negocio.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const FECHA = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  url: `${SITE_URL}/blog`,
  name: `Blog de ${SITE_NAME}`,
  description:
    "Precios reales, plazos y criterios para decidir sobre la web de tu negocio.",
  inLanguage: "es",
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${p.slug}`,
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt ?? p.publishedAt,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    keywords: p.keywords.join(", "),
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Blog</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          Lo que deberías saber antes de pagar por una web
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
          Precios reales, plazos honestos y criterios para decidir. Escrito para dueños de
          negocio, no para desarrolladores.
        </p>

        <div className="mt-14 flex flex-col gap-4">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-ink/10 p-7 transition-colors hover:border-accent/40 hover:bg-ink/[0.02]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {p.category}
              </p>
              <h2 className="mt-3 font-display text-2xl text-ink">{p.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-xs text-ink-soft/70">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <time dateTime={p.publishedAt}>{FECHA.format(new Date(p.publishedAt))}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {p.readingMinutes} min
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-accent">
                  Leer <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
