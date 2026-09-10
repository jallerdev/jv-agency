import type { Metadata } from "next";

import { BlogIndice } from "@/components/paginas/BlogIndice";
import { BLOG_META } from "@/content/paginas/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: BLOG_META.title.es,
  description: BLOG_META.description.es,
  alternates: {
    canonical: "/blog",
    languages: { "es-CO": "/blog", en: "/en/blog", "x-default": "/blog" },
  },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: BLOG_META.ogDescription.es,
    url: `${SITE_URL}/blog`,
    type: "website",
    locale: "es_LA",
  },
};

export default function BlogIndexPage() {
  return <BlogIndice idioma="es" />;
}
