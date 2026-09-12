import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/kit/Breadcrumbs";
import { PortadaArticulo, type TramaPortada } from "@/components/kit/PortadaArticulo";
import { FiltroBlog, type ArticuloVista } from "@/components/visuales/FiltroBlog";
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
 *
 * QUÉ CAMBIÓ EN LA FASE 5, Y POR QUÉ
 * ----------------------------------
 * Eran once filas de texto idénticas en una columna: rótulo, titular,
 * entradilla, fecha. Nada distinguía un artículo de otro hasta leerlo, y el de
 * precios —el que trae más gente— pesaba lo mismo que el último.
 *
 * · Cada artículo estrena PORTADA TIPOGRÁFICA: su cifra clave en grande sobre
 *   una trama de su categoría. Sin una sola foto de banco y sin una sola
 *   petición de red: son degradados de CSS.
 * · El más reciente va DESTACADO y ancho, porque es el que se acaba de
 *   revisar.
 * · Cuatro filtros con su conteo. No desmontan nada: los once artículos siguen
 *   en el HTML con el filtro puesto.
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

/**
 * Qué trama le toca a cada categoría. Se busca por la clave en castellano
 * —que es la misma en los dos idiomas dentro del manifiesto— para que la
 * versión en inglés no se quede sin textura.
 */
const TRAMA_POR_CATEGORIA: Record<string, TramaPortada> = {
  Precios: "precios",
  Decisión: "decision",
  Guías: "guias",
};

const TODOS: Record<Idioma, string> = { es: "Todos", en: "All" };

/* Lo que oye quien filtra con lector de pantalla. Con singular propio: «1
   artículos» es el detalle por el que una frase generada suena a máquina. */
const RECUENTO: Record<Idioma, { uno: string; varios: string }> = {
  es: { uno: "1 artículo", varios: "{n} artículos" },
  en: { uno: "1 article", varios: "{n} articles" },
};

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

  /** El más reciente por fecha de revisión: es el que se acaba de mirar.
   *
   *  DESEMPATE POR FECHA DE PUBLICACIÓN, y hace falta: los once se revisaron
   *  el mismo día, así que sin segundo criterio el destacado lo decidía el
   *  orden del archivo —y salía el último de la lista, no el más importante—. */
  const fechaDe = (p: (typeof POSTS)[number]) => p.updatedAt ?? p.publishedAt;
  const ordenados = [...POSTS].sort((a, b) => {
    if (fechaDe(a) !== fechaDe(b)) return fechaDe(a) < fechaDe(b) ? 1 : -1;
    return a.publishedAt < b.publishedAt ? 1 : -1;
  });
  const [destacado, ...resto] = ordenados;

  /** Lo que cruza a cliente: cadenas ya resueltas, nunca objetos de idioma. */
  const aVista = (p: (typeof POSTS)[number]): ArticuloVista => {
    const fecha = fechaDe(p);
    return {
      slug: p.slug[idioma],
      href: `${base}/${p.slug[idioma]}`,
      titulo: p.title[idioma],
      entradilla: p.excerpt[idioma],
      categoria: p.category[idioma],
      trama: TRAMA_POR_CATEGORIA[p.category.es] ?? "guias",
      /* La cifra del artículo, o su tiempo de lectura. Nunca una inventada. */
      cifra: p.cifra?.[idioma] ?? `${p.readingMinutes} ${BLOG.minutos[idioma]}`,
      fecha: FECHA[idioma].format(new Date(fecha)),
      fechaISO: fecha,
      minutos: `${p.readingMinutes} ${BLOG.lectura[idioma]}`,
    };
  };

  const vistaDestacado = aVista(destacado);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        <header className="border-b border-line">
          <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-[calc(var(--header-h)+2rem)] md:px-12 md:pb-20 md:pt-[calc(var(--header-h)+3rem)]">
            <Breadcrumbs migas={[{ texto: BLOG.rotulo[idioma] }]} idioma={idioma} />

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-end lg:gap-16">
              <div>
                <p className="jv-eyebrow text-brand">{BLOG.rotulo[idioma]}</p>
                {/* Sin Reveal: este es el LCP. */}
                <h1 className="mt-4 text-balance text-[length:var(--text-display)]">
                  {BLOG.titulo[idioma]}
                </h1>
                <p className="mt-6 max-w-[52ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  {BLOG.entradilla[idioma]}
                </p>
              </div>

              {/* EL DESTACADO ES EL MÁS RECIENTE POR FECHA DE REVISIÓN, no por
                  fecha de publicación: en un blog cuyo artículo estrella se
                  reescribe cada vez que se mueve un precio, lo recién revisado
                  vale más que lo recién escrito. */}
              <Link
                href={vistaDestacado.href}
                className="jv-card jv-card-int jv-lift group flex flex-col overflow-hidden"
              >
                <PortadaArticulo
                  cifra={vistaDestacado.cifra}
                  categoria={vistaDestacado.categoria}
                  trama={vistaDestacado.trama}
                />
                <span className="flex flex-col p-6 sm:p-7">
                  <span className="jv-titulo jv-subrayado text-[length:var(--text-h3)]">
                    {vistaDestacado.titulo}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {vistaDestacado.entradilla}
                  </span>
                  <span className="jv-rule mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 font-mono text-xs text-ink-muted">
                    <time dateTime={vistaDestacado.fechaISO}>{vistaDestacado.fecha}</time>
                    <span>{vistaDestacado.minutos}</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-brand">
                      {BLOG.leer[idioma]}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <FiltroBlog
              articulos={resto.map(aVista)}
              todos={TODOS[idioma]}
              recuento={RECUENTO[idioma]}
            />
          </Reveal>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
