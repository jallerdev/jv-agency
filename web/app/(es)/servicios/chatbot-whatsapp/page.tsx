import type { Metadata } from "next";

import { PaginaChatbot } from "@/components/paginas/Chatbot";
import { SITE_URL } from "@/lib/site";

/**
 * Existe por un hallazgo de la investigación de septiembre de 2026: la palabra
 * «chatbot» no aparecía NI UNA VEZ en todo el sitio, mientras el mercado
 * colombiano busca exactamente eso —los que salen primeros se llaman Chatbot
 * Colombia, Bots Colombia, Botiffy—. Se estaba vendiendo el producto correcto
 * con el nombre equivocado.
 */
export const metadata: Metadata = {
  title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
  description:
    "Chatbot de WhatsApp que contesta solo, capta interesados, agenda citas y toma pedidos. Soy proveedor de tecnología verificado por Meta: la conexión la hago yo, sin intermediarios.",
  alternates: {
    canonical: "/servicios/chatbot-whatsapp",
    languages: {
      "es-CO": "/servicios/chatbot-whatsapp",
      en: "/en/services/whatsapp-chatbot",
      "x-default": "/servicios/chatbot-whatsapp",
    },
  },
  openGraph: {
    title: "Chatbot de WhatsApp para empresas en Colombia | JV Agencia",
    description:
      "Tu WhatsApp contesta solo, a cualquier hora. Proveedor de tecnología verificado por Meta.",
    url: `${SITE_URL}/servicios/chatbot-whatsapp`,
    type: "website",
    locale: "es_LA",
  },
};

export default function ChatbotWhatsapp() {
  return <PaginaChatbot idioma="es" ruta="/servicios/chatbot-whatsapp" />;
}
