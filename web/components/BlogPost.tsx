import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { BlogPost as Post } from "@/lib/blog";

const FECHA = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Armazón de un artículo. Reutiliza la clase `.legal` de globals.css para la
// tipografía en vez de duplicar estilos de prosa.
export function BlogPost({ post, children }: { post: Post; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-body text-sm text-ink-soft transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" /> Volver al blog
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">
          {post.category}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{post.title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm text-ink-soft/80">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            <time dateTime={post.publishedAt}>
              {FECHA.format(new Date(post.publishedAt))}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {post.readingMinutes} min de lectura
          </span>
        </div>

        <div className="legal mt-10">{children}</div>

        <aside className="mt-16 rounded-2xl border border-ink/10 bg-ink/[0.03] p-7">
          <h2 className="font-display text-xl text-ink">¿Necesitas una web para tu negocio?</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
            Diseñamos y desarrollamos sitios para PYMEs de LATAM. Cuéntanos qué necesitas y te
            damos un estimado sin compromiso.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/cotizador"
              className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Cotizar mi proyecto
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Hablar con nosotros
            </Link>
          </div>
        </aside>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
