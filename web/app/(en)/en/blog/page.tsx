import type { Metadata } from "next";

import { BlogIndice } from "@/components/paginas/BlogIndice";
import { BLOG_META } from "@/content/paginas/blog";
import { SITE_NAME, SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: BLOG_META.title.en,
  description: BLOG_META.description.en,
  alternates: {
    canonical: "/en/blog",
    languages: { "es-CO": "/blog", en: "/en/blog", "x-default": "/blog" },
  },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: BLOG_META.ogDescription.en,
    url: `${SITE_URL}/en/blog`,
    type: "website",
    locale: "en_US",
  },
};

export default function BlogIndexPage() {
  return <BlogIndice idioma="en" />;
}
