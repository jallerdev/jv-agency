import type { Metadata } from "next";

import { Articulo, metadataDe, paramsDe } from "@/components/paginas/BlogArticulo";

import { WebsiteCostPost } from "../_posts/how-much-does-a-website-cost-in-colombia";
import { NeedAWebsitePost } from "../_posts/does-my-business-need-a-website";
import { WebsiteOrInstagramPost } from "../_posts/website-or-just-instagram";
import { RestaurantWebsitePost } from "../_posts/what-a-restaurant-website-needs";
import { HowLongPost } from "../_posts/how-long-does-it-take-to-build-a-website";
import { WhatsAppChatbotCostPost } from "../_posts/how-much-does-a-whatsapp-chatbot-cost-in-colombia";
import { SeoCostPost } from "../_posts/how-much-does-seo-cost-in-colombia";
import { HowToShowUpOnGoogleMapsPost } from "../_posts/how-to-show-up-on-google-maps";
import { WhyMyWebsiteDoesntShowUpPost } from "../_posts/why-my-website-doesnt-show-up-on-google";
import { DomainAndHostingCostPost } from "../_posts/how-much-do-a-domain-and-hosting-cost-in-colombia";
import { WhatIsALandingPagePost } from "../_posts/what-is-a-landing-page";

// SSG completa: cada post se prerenderiza en el build.
export function generateStaticParams() {
  return paramsDe("en");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metadataDe(slug, "en");
}

/* Los cuerpos van por slug INGLÉS: es la clave con la que `Articulo` los
   busca, y usar el castellano acá haría que las siete rutas devolvieran 404
   sin que nada fallara en el build. */
const CUERPOS: Record<string, () => React.JSX.Element> = {
  "how-much-does-a-website-cost-in-colombia": WebsiteCostPost,
  "does-my-business-need-a-website": NeedAWebsitePost,
  "website-or-just-instagram": WebsiteOrInstagramPost,
  "what-a-restaurant-website-needs": RestaurantWebsitePost,
  "how-long-does-it-take-to-build-a-website": HowLongPost,
  "how-much-does-a-whatsapp-chatbot-cost-in-colombia": WhatsAppChatbotCostPost,
  "how-much-does-seo-cost-in-colombia": SeoCostPost,
  "how-to-show-up-on-google-maps": HowToShowUpOnGoogleMapsPost,
  "why-my-website-doesnt-show-up-on-google": WhyMyWebsiteDoesntShowUpPost,
  "how-much-do-a-domain-and-hosting-cost-in-colombia": DomainAndHostingCostPost,
  "what-is-a-landing-page": WhatIsALandingPagePost,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Articulo slug={slug} idioma="en" contenido={CUERPOS} />;
}
