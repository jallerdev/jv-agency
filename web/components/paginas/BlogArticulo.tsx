import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BlogPost } from "@/components/BlogPost";
import type { Idioma } from "@/content/types";
import { AUTHOR, findPost, POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

/**
 * UN ARTÍCULO, EN CUALQUIERA DE LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * `/blog/[slug]` y `/en/blog/[slug]` son la misma página con distinto idioma y
 * distinto slug, así que la metadata, los dos JSON-LD y el armazón viven aquí
 * y cada ruta solo dice en qué lengua está y de dónde saca el cuerpo.
 *
 * EL CUERPO NO ES COMPARTIDO y no puede serlo: cada artículo es prosa escrita
 * a mano en su lengua, con sus tablas y sus enlaces. Por eso el mapa de
 * componentes lo pone la ruta y no este archivo.
 */

/** Los parámetros estáticos de un idioma: sus slugs, no los del otro. */
export function paramsDe(idioma: Idioma) {
  return POSTS.map((p) => ({ slug: p.slug[idioma] }));
}

export async function metadataDe(slug: string, idioma: Idioma): Promise<Metadata> {
  const post = findPost(slug, idioma);
  if (!post) return { title: idioma === "es" ? "No encontrado" : "Not found" };

  const base = idioma === "es" ? "/blog" : "/en/blog";
  const ruta = `${base}/${post.slug[idioma]}`;
  const url = `${SITE_URL}${ruta}`;

  return {
    title: post.title[idioma],
    description: post.description[idioma],
    keywords: [...post.keywords[idioma]],
    alternates: {
      canonical: ruta,
      /* Recíproco y por artículo: el par no se puede declarar en el mapa
         estático de `lib/rutas.ts` porque los posts se añaden escribiendo, no
         editando el mapa. Sale del propio manifiesto. */
      languages: {
        "es-CO": `/blog/${post.slug.es}`,
        en: `/en/blog/${post.slug.en}`,
        "x-default": `/blog/${post.slug.es}`,
      },
    },
    openGraph: {
      title: post.title[idioma],
      description: post.description[idioma],
      url,
      type: "article",
      locale: idioma === "es" ? "es_LA" : "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [AUTHOR.name],
      tags: [...post.keywords[idioma]],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title[idioma],
      description: post.description[idioma],
    },
  };
}

export function Articulo({
  slug,
  idioma,
  contenido,
}: {
  slug: string;
  idioma: Idioma;
  contenido: Record<string, () => React.JSX.Element>;
}) {
  const post = findPost(slug, idioma);
  if (!post) notFound();
  const Cuerpo = contenido[post.slug[idioma]];
  if (!Cuerpo) notFound();

  const base = idioma === "es" ? "/blog" : "/en/blog";
  const url = `${SITE_URL}${base}/${post.slug[idioma]}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title[idioma],
    description: post.description[idioma],
    inLanguage: idioma === "es" ? "es" : "en",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: post.keywords[idioma].join(", "),
    articleSection: post.category[idioma],
    wordCount: post.readingMinutes * 250,
    isPartOf: { "@id": `${SITE_URL}${base}#blog` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${base}` },
      { "@type": "ListItem", position: 3, name: post.title[idioma], item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPost post={post} idioma={idioma}>
        <Cuerpo />
      </BlogPost>
    </>
  );
}
