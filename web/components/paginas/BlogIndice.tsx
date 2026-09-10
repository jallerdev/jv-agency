import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BLOG, BLOG_META } from "@/content/paginas/blog";
import type { Idioma } from "@/content/types";
import { AUTHOR, POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

/**
 * EL ÍNDICE DEL BLOG, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/blog` y `/en/blog`. Las dos rutas son envoltorios que
 * solo aportan su `metadata`.
 *
 * LA FECHA QUE SE ENSEÑA ES `updatedAt`, NO `publishedAt`. En «¿cuánto cuesta
 * una página web?» —que se revisa cada vez que se mueven los precios— lo útil
 * es cuándo se revisó por última vez: un precio de hace dos años con fecha de
 * hace dos años se descarta solo, y con fecha de ayer, engaña. `publishedAt`
 * sigue yendo entero al schema, que es donde Google lo quiere.
 */
const FECHA = {
  es: new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
  en: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }),
} as const;

export function BlogIndice({ idioma }: { idioma: Idioma }) {
  const base = idioma === "es" ? "/blog" : "/en/blog";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${base}#blog`,
    url: `${SITE_URL}${base}`,
    name: BLOG_META.nombre[idioma],
    description: BLOG_META.ogDescription[idioma],
    inLanguage: idioma === "es" ? "es" : "en",
    blogPost: POSTS.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}${base}/${p.slug[idioma]}`,
      headline: p.title[idioma],
      description: p.description[idioma],
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      keywords: p.keywords[idioma].join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header idioma={idioma} />
      <main id="contenido" className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <p className="jv-eyebrow text-accent-ink">{BLOG.rotulo[idioma]}</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{BLOG.titulo[idioma]}</h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-soft">
          {BLOG.entradilla[idioma]}
        </p>

        <div className="mt-14 flex flex-col gap-4">
          {POSTS.map((p) => {
            const fecha = p.updatedAt ?? p.publishedAt;
            return (
              <Link
                key={p.slug[idioma]}
                href={`${base}/${p.slug[idioma]}`}
                className="group rounded-2xl border border-line p-7 transition-colors hover:border-accent/40 hover:bg-ink/[0.02]"
              >
                {/* Iba con la clase `jv-eyebrowst`, que no existe: una errata
                    de una letra dejaba el rótulo sin versalitas ni tracking y
                    no la delataba nada, porque el color sí se aplicaba. */}
                <p className="jv-eyebrow text-accent-ink">{p.category[idioma]}</p>
                <h2 className="mt-3 font-display text-2xl text-ink">{p.title[idioma]}</h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                  {p.excerpt[idioma]}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-xs text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    <time dateTime={fecha}>{FECHA[idioma].format(new Date(fecha))}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {p.readingMinutes} {BLOG.minutos[idioma]}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-accent-ink">
                    {BLOG.leer[idioma]}{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}
