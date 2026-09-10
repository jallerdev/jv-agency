import type { Metadata } from "next";

import { PaginaChatbot } from "@/components/paginas/Chatbot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "WhatsApp chatbot for businesses in Colombia | JV Agencia",
  description:
    "A WhatsApp chatbot that answers on its own, captures leads, books appointments and takes orders. I'm a technology provider verified by Meta: I do the connection myself, with no middleman.",
  alternates: {
    canonical: "/en/services/whatsapp-chatbot",
    languages: {
      "es-CO": "/servicios/chatbot-whatsapp",
      en: "/en/services/whatsapp-chatbot",
      "x-default": "/servicios/chatbot-whatsapp",
    },
  },
  openGraph: {
    title: "WhatsApp chatbot for businesses in Colombia | JV Agencia",
    description: "Your WhatsApp answers on its own, at any hour. Technology provider verified by Meta.",
    url: `${SITE_URL}/en/services/whatsapp-chatbot`,
    type: "website",
    locale: "en_US",
  },
};

export default function WhatsappChatbot() {
  return <PaginaChatbot idioma="en" ruta="/en/services/whatsapp-chatbot" />;
}
