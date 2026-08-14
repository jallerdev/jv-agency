import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPost } from "@/components/BlogPost";
import { AUTHOR, findPost, POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

import { CuantoCuestaPost } from "../_posts/cuanto-cuesta";
import { NecesitaWebPost } from "../_posts/necesita-web";
import { WebOInstagramPost } from "../_posts/web-o-instagram";
import { WebRestaurantePost } from "../_posts/web-restaurante";
import { CuantoDemoraPost } from "../_posts/cuanto-demora";

// SSG completa: cada post se prerenderiza en el build.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = findPost(params.slug);
  if (!post) return { title: "No encontrado" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [AUTHOR.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// Cada post es un componente con el contenido en JSX — permite tablas y
// enlaces sin depender de un parser de markdown.
const CONTENT_BY_SLUG: Record<string, () => React.JSX.Element> = {
  "cuanto-cuesta-una-pagina-web-en-colombia": CuantoCuestaPost,
  "mi-negocio-necesita-pagina-web": NecesitaWebPost,
  "pagina-web-o-solo-instagram": WebOInstagramPost,
  "que-debe-tener-la-pagina-web-de-un-restaurante": WebRestaurantePost,
  "cuanto-se-demora-hacer-una-pagina-web": CuantoDemoraPost,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) notFound();
  const Content = CONTENT_BY_SLUG[post.slug];
  if (!Content) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    inLanguage: "es",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.readingMinutes * 250,
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
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
      <BlogPost post={post}>
        <Content />
      </BlogPost>
    </>
  );
}
