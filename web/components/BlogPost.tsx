import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BLOG } from "@/content/paginas/blog";
import type { Idioma } from "@/content/types";
import type { BlogPost as Post } from "@/lib/blog";
import { money, PISOS } from "@/lib/quote";
import { enlaceReal } from "@/lib/rutas";

/**
 * La fecha, escrita como la escribe cada lengua: «13 de agosto de 2026» y
 * «13 August 2026». Formatearla siempre en es-CO dejaba el mes en castellano
 * dentro de un artículo en inglés.
 */
const FECHA = {
  es: new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  en: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
} as const;

// Armazón de un artículo. Reutiliza la clase `.legal` de globals.css para la
// tipografía en vez de duplicar estilos de prosa.
export function BlogPost({
  post,
  idioma,
  children,
}: {
  post: Post;
  idioma: Idioma;
  children: ReactNode;
}) {
  const indice = idioma === "es" ? "/blog" : "/en/blog";

  return (
    <>
      <Header idioma={idioma} />
      <main id="contenido" className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <Link
          href={indice}
          className="-my-2 inline-flex min-h-11 items-center gap-2 py-2 font-body text-sm text-ink-soft transition-colors hover:text-accent-ink"
        >
          <ArrowLeft className="size-4" /> {BLOG.volver[idioma]}
        </Link>

        <p className="mt-8 jv-eyebrow text-accent-ink">{post.category[idioma]}</p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{post.title[idioma]}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            <time dateTime={post.updatedAt ?? post.publishedAt}>
              {FECHA[idioma].format(new Date(post.updatedAt ?? post.publishedAt))}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {post.readingMinutes} {BLOG.lectura[idioma]}
          </span>
        </div>

        <div className="legal mt-10">{children}</div>

        <aside className="mt-16 rounded-2xl border border-line bg-ink/[0.03] p-7">
          <h2 className="font-body text-xl font-semibold text-ink">{BLOG.cierre.titulo[idioma]}</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
            {BLOG.cierre.cuerpo[idioma].replace("{piso}", money(PISOS.landing, idioma))}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={enlaceReal(idioma === "es" ? "/precios" : "/en/pricing")}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-on-accent transition-colors hover:bg-primary-hover"
            >
              {BLOG.cierre.precios[idioma]}
            </Link>
            <Link
              href={idioma === "es" ? "/#agenda" : "/en#agenda"}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-5 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              {BLOG.cierre.hablar[idioma]}
            </Link>
          </div>
        </aside>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}
