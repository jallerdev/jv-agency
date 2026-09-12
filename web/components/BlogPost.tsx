import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Github, Linkedin } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Logo } from "@/components/Logo";
import { Breadcrumbs } from "@/components/kit/Breadcrumbs";
import { PriceTag } from "@/components/kit/Precio";
import { IndiceArticulo } from "@/components/visuales/IndiceArticulo";
import { BLOG } from "@/content/paginas/blog";
import type { Idioma } from "@/content/types";
import { AUTHOR, POSTS, type BlogPost as Post } from "@/lib/blog";
import { money, PISOS } from "@/lib/quote";
import { enlaceReal } from "@/lib/rutas";
import { BUSINESS } from "@/lib/business";

/**
 * EL ARMAZÓN DE UN ARTÍCULO
 * ──────────────────────────────────────────────────────────────────────────
 * QUÉ CAMBIÓ EN LA FASE 5, Y POR QUÉ
 * ----------------------------------
 * Era una columna de 768 px con el titular, la fecha y el texto. Para un
 * artículo de ocho minutos con siete apartados y tres tablas, eso es un muro:
 * no se sabe cuánto queda, no se puede saltar a la tabla de precios, y al
 * final no hay ni quién lo escribió ni qué leer después.
 *
 * · Barra de lectura arriba, con animación por scroll de CSS: ni un listener.
 * · Índice con seguimiento, construido LEYENDO los `h2` del propio artículo.
 *   Once índices escritos a mano se habrían desincronizado al primer retoque.
 * · La «respuesta corta» —que los once artículos ya traían como primer
 *   párrafo— pasa a recuadro, que es lo que un resumen de IA cita.
 * · Ficha de autor, dos relacionados y el siguiente artículo.
 * · El cierre deja de ser el mismo en los once: cada categoría remata donde
 *   corresponde.
 *
 * LA TIPOGRAFÍA SIGUE SIENDO `.legal`, que es la de las páginas legales, y es
 * lo correcto: son el mismo problema —prosa larga que hay que poder leer— y
 * dos hojas de prosa distintas serían dos sitios donde arreglar la medida.
 */

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

const T = {
  es: {
    indice: "En este artículo",
    actualizado: "Revisado el",
    escribe: "Lo escribe",
    siguiente: "Siguiente artículo",
    relacionados: "Para seguir leyendo",
    verPrecios: "Ver todos los precios publicados",
    verSeo: "Ver el servicio de posicionamiento",
    verWeb: "Ver diseño de páginas web",
  },
  en: {
    indice: "In this article",
    actualizado: "Reviewed on",
    escribe: "Written by",
    siguiente: "Next article",
    relacionados: "Keep reading",
    verPrecios: "See every published price",
    verSeo: "See the SEO service",
    verWeb: "See web design",
  },
} as const;

/**
 * A dónde remata cada categoría.
 *
 * Los once artículos cerraban con el mismo bloque de «¿necesitas una web?».
 * Quien acaba de leer ocho minutos sobre cuánto cuesta el SEO no necesita que
 * le ofrezcan una página: necesita el servicio del que acaba de leer. El
 * cierre genérico se queda para las guías, que sí pueden acabar en cualquier
 * parte.
 */
const REMATE: Record<string, { href: Record<Idioma, string>; clave: "verPrecios" | "verSeo" | "verWeb" }> = {
  Precios: { href: { es: "/precios", en: "/en/pricing" }, clave: "verPrecios" },
  Decisión: {
    href: { es: "/servicios/diseno-de-paginas-web", en: "/en/services/web-design" },
    clave: "verWeb",
  },
  Guías: {
    href: { es: "/servicios/posicionamiento-seo", en: "/en/services/seo" },
    clave: "verSeo",
  },
};

export function BlogPost({
  post,
  idioma,
  children,
}: {
  post: Post;
  idioma: Idioma;
  children: ReactNode;
}) {
  const t = T[idioma];
  const base = idioma === "es" ? "/blog" : "/en/blog";
  const revisado = post.updatedAt ?? post.publishedAt;

  /* Los relacionados: primero los de su misma categoría, y si no llegan a dos,
     se completa con los más recientes. Nunca él mismo. */
  const otros = POSTS.filter((p) => p.slug.es !== post.slug.es);
  const relacionados = [
    ...otros.filter((p) => p.category.es === post.category.es),
    ...otros.filter((p) => p.category.es !== post.category.es),
  ].slice(0, 2);

  /* El siguiente, por orden del manifiesto, dando la vuelta al final. Si ya
     salió como relacionado, se avanza: la rejilla de tres no puede enseñar el
     mismo artículo dos veces —y React se quejaba de la clave repetida—. */
  const i = POSTS.findIndex((p) => p.slug.es === post.slug.es);
  let siguiente = POSTS[(i + 1) % POSTS.length];
  for (let n = 2; relacionados.some((r) => r.slug.es === siguiente.slug.es); n++) {
    siguiente = POSTS[(i + n) % POSTS.length];
    if (n > POSTS.length) break;
  }

  const remate = REMATE[post.category.es];

  return (
    <>
      {/* La barra de lectura. `aria-hidden`: el progreso de scroll no es
          información para quien no ve la pantalla, y anunciarlo sería ruido. */}
      <span aria-hidden className="jv-lectura" />

      <Header idioma={idioma} />
      <main id="contenido">
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1280px] px-6 pb-14 pt-[calc(var(--header-h)+2rem)] md:px-12 md:pb-16 md:pt-[calc(var(--header-h)+3rem)]">
            <Breadcrumbs
              migas={[{ texto: BLOG.rotulo[idioma], href: base }, { texto: post.title[idioma] }]}
              idioma={idioma}
            />

            <p className="jv-eyebrow mt-10 text-brand">{post.category[idioma]}</p>
            {/* Sin Reveal: este es el LCP. */}
            <h1 className="mt-4 max-w-[20ch] text-balance text-[length:var(--text-display)]">
              {post.title[idioma]}
            </h1>
            <p className="mt-6 max-w-[62ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {post.description[idioma]}
            </p>

            <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-ink-muted">
              <span>
                {t.actualizado} <time dateTime={revisado}>{FECHA[idioma].format(new Date(revisado))}</time>
              </span>
              <span aria-hidden>·</span>
              <span>
                {post.readingMinutes} {BLOG.lectura[idioma]}
              </span>
              <span aria-hidden>·</span>
              <span>{AUTHOR.name}</span>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
          {/* Las dos columnas CENTRADAS, no estiradas: el cuerpo mide 34 rem por la
              medida de lectura, así que un `1fr` a su izquierda dejaba
              trescientos ochenta píxeles de nada entre el texto y el índice.
              Con las dos pistas fijas y la rejilla centrada, la página se lee
              como un libro abierto. */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[34rem_16rem] lg:justify-center lg:gap-16">
            {/* EL CUERPO, con la medida de lectura mandando sobre la rejilla.
                En `rem` y no en `ch`: el `ch` es el ancho del glifo «0» de la
                primera fuente disponible y aquí caía al valor de reserva —68ch
                daban 612 px, unas ochenta letras por línea, doce más de las que
                el encargo permite—. 34 rem son 544 px y, con el cuerpo a 16 px,
                unas setenta. */}
            <article className="jv-cuerpo legal max-w-[34rem]" id="jv-articulo">
              {children}
            </article>

            {/* El índice, a la derecha y pegado. Va DESPUÉS del cuerpo en el
                DOM: en un teléfono, siete enlaces antes del primer párrafo son
                siete líneas entre el titular y lo que se vino a leer. */}
            <aside className="order-first lg:order-none">
              <div className="lg:sticky lg:top-28">
                <IndiceArticulo selector="#jv-articulo" titulo={t.indice} />
              </div>
            </aside>
          </div>

          {/* ── La ficha de autor ──────────────────────────────────────── */}
          <div className="mt-16 max-w-[34rem] lg:mx-auto lg:ml-[calc(50%-25rem)]">
            <div className="jv-card flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
              {/* El monograma y no un retrato: el sitio no tiene foto de Luis
                  y una de banco en la firma de un artículo sería atribuirle
                  una cara que no es la suya. */}
              <span className="jv-bloom grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-md)] border border-line">
                <Logo className="h-7 w-auto text-brand" />
              </span>

              <div className="min-w-0">
                <p className="jv-eyebrow text-ink-muted">{t.escribe}</p>
                <p className="mt-2 font-semibold text-ink">{AUTHOR.name}</p>
                <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                  {idioma === "es"
                    ? `Diseñador web y desarrollador. Trabajo desde ${BUSINESS.address.city}, ${BUSINESS.address.region}, y lo que escribo acá es lo mismo que cobro.`
                    : `Web designer and developer. I work from ${BUSINESS.address.city}, ${BUSINESS.address.region}, and what I write here is what I charge.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={AUTHOR.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jv-chip jv-chip-off min-h-11 gap-2 text-sm hover:border-brand hover:text-brand"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={2} aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/jallerdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jv-chip jv-chip-off min-h-11 gap-2 text-sm hover:border-brand hover:text-brand"
                  >
                    <Github className="h-4 w-4" strokeWidth={2} aria-hidden />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── El remate, según la categoría ──────────────────────────── */}
          <aside className="mt-6 max-w-[34rem] lg:mx-auto lg:ml-[calc(50%-25rem)]">
            <div className="jv-card p-6 sm:p-7">
              <h2 className="jv-titulo">{BLOG.cierre.titulo[idioma]}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {BLOG.cierre.cuerpo[idioma].replace("{piso}", money(PISOS.landing, idioma))}
              </p>
              <PriceTag id="landing" idioma={idioma} tam="sm" className="mt-5" />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={enlaceReal(idioma === "es" ? "/agendar" : "/en/book-a-call")}
                  className="jv-boton text-sm"
                >
                  {BLOG.cierre.hablar[idioma]}
                </Link>
                {remate && (
                  <Link
                    href={enlaceReal(remate.href[idioma])}
                    className="jv-boton-2 text-sm"
                  >
                    {t[remate.clave]}
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* ── Qué leer después ───────────────────────────────────────── */}
          <section className="jv-rule mt-16 pt-12">
            <h2 className="jv-eyebrow text-ink-muted">{t.relacionados}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[...relacionados, siguiente].slice(0, 3).map((p, n) => (
                <li key={p.slug.es}>
                  <Link
                    href={`${base}/${p.slug[idioma]}`}
                    className="jv-card jv-card-int jv-lift group flex h-full flex-col p-6"
                  >
                    <span className="jv-eyebrow text-brand">
                      {n === 2 ? t.siguiente : p.category[idioma]}
                    </span>
                    <span className="jv-titulo jv-subrayado mt-3">{p.title[idioma]}</span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {p.excerpt[idioma]}
                    </span>
                    <span className="jv-rule mt-5 flex items-center gap-2 pt-4 font-mono text-xs text-ink-muted">
                      {p.readingMinutes} {BLOG.lectura[idioma]}
                      <ArrowRight
                        className="ml-auto h-3.5 w-3.5 text-brand transition-transform duration-base ease-ps group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
