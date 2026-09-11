import type { Metadata } from "next";

import { Articulo, metadataDe, paramsDe } from "@/components/paginas/BlogArticulo";

import { CuantoCuestaPost } from "../_posts/cuanto-cuesta";
import { NecesitaWebPost } from "../_posts/necesita-web";
import { WebOInstagramPost } from "../_posts/web-o-instagram";
import { WebRestaurantePost } from "../_posts/web-restaurante";
import { CuantoDemoraPost } from "../_posts/cuanto-demora";
import { CuantoCuestaChatbotPost } from "../_posts/cuanto-cuesta-chatbot";
import { CuantoCuestaSeoPost } from "../_posts/cuanto-cuesta-seo";
import { AparecerEnGoogleMapsPost } from "../_posts/aparecer-en-google-maps";
import { NoApareceEnGooglePost } from "../_posts/no-aparece-en-google";
import { DominioYHostingPost } from "../_posts/dominio-y-hosting";
import { QueEsUnaLandingPagePost } from "../_posts/que-es-una-landing-page";

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
  "como-aparecer-en-google-maps": AparecerEnGoogleMapsPost,
  "por-que-mi-pagina-no-aparece-en-google": NoApareceEnGooglePost,
  "cuanto-cuesta-un-dominio-y-un-hosting-en-colombia": DominioYHostingPost,
  "que-es-una-landing-page": QueEsUnaLandingPagePost,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Articulo slug={slug} idioma="es" contenido={CUERPOS} />;
}
