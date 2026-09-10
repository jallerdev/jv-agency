import type { Metadata } from "next";

import { Articulo, metadataDe, paramsDe } from "@/components/paginas/BlogArticulo";

import { CuantoCuestaPost } from "../_posts/cuanto-cuesta";
import { NecesitaWebPost } from "../_posts/necesita-web";
import { WebOInstagramPost } from "../_posts/web-o-instagram";
import { WebRestaurantePost } from "../_posts/web-restaurante";
import { CuantoDemoraPost } from "../_posts/cuanto-demora";
import { CuantoCuestaChatbotPost } from "../_posts/cuanto-cuesta-chatbot";
import { CuantoCuestaSeoPost } from "../_posts/cuanto-cuesta-seo";

// SSG completa: cada post se prerenderiza en el build.
export function generateStaticParams() {
  return paramsDe("es");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metadataDe(slug, "es");
}

// Cada post es un componente con el contenido en JSX — permite tablas y
// enlaces sin depender de un parser de markdown.
const CUERPOS: Record<string, () => React.JSX.Element> = {
  "cuanto-cuesta-una-pagina-web-en-colombia": CuantoCuestaPost,
  "mi-negocio-necesita-pagina-web": NecesitaWebPost,
  "pagina-web-o-solo-instagram": WebOInstagramPost,
  "que-debe-tener-la-pagina-web-de-un-restaurante": WebRestaurantePost,
  "cuanto-se-demora-hacer-una-pagina-web": CuantoDemoraPost,
  "cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia": CuantoCuestaChatbotPost,
  "cuanto-cuesta-el-seo-en-colombia": CuantoCuestaSeoPost,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Articulo slug={slug} idioma="es" contenido={CUERPOS} />;
}
