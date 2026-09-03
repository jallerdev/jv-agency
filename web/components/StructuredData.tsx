import { BUSINESS, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/business";

// JSON-LD para SEO y motores de IA (GEO). Un @graph con Organization,
// WebSite y ProfessionalService que comparten el mismo negocio.
export function StructuredData() {
  const sameAs = SOCIAL_LINKS.map((s) => s.url);

  // Los campos vacíos se OMITEN, no se emiten en blanco: un `streetAddress: ""`
  // en el JSON-LD es un dato malo, y aquí está vacío a propósito porque J&V no
  // tiene local y la dirección exacta es un domicilio particular.
  const postalAddress = {
    "@type": "PostalAddress",
    ...(BUSINESS.address.street ? { streetAddress: BUSINESS.address.street } : {}),
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    ...(BUSINESS.address.postalCode ? { postalCode: BUSINESS.address.postalCode } : {}),
    addressCountry: BUSINESS.address.countryCode,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: BUSINESS.legalNameOfficial,
        url: SITE_URL,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        taxID: BUSINESS.taxId,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
        image: `${SITE_URL}/og.png`,
        address: postalAddress,
        founder: { "@type": "Person", name: BUSINESS.legalNameOfficial },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        description:
          "Estudio de diseño y desarrollo web, software a medida, chatbots de WhatsApp y SEO para PYMEs en Latinoamérica.",
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        priceRange: "$$",
        address: postalAddress,
        // Negocio de área de servicio: no hay local que visitar. Se declara la
        // zona cubierta, que es lo que Google espera cuando no hay dirección.
        areaServed: [
          { "@type": "Country", name: "Colombia" },
          { "@type": "Place", name: BUSINESS.areaServed },
        ],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        sameAs,
        knowsAbout: [
          "Desarrollo web",
          "Automatización de WhatsApp",
          "WhatsApp Business Platform",
          "SEO",
          "Posicionamiento web",
          "Software a medida",
          "Diseño web",
          "Diseño UI/UX",
          "Mantenimiento web",
        ],
        // El catálogo es lo que le dice a Google QUÉ vendemos, no solo quién
        // somos. Tiene que coincidir con los servicios de la portada y con las
        // líneas del cotizador: si no coinciden, el dato estructurado miente.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de JV Agencia",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desarrollo web",
                description:
                  "Landing pages, webs corporativas y tiendas online con diseño propio.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Chatbot de WhatsApp",
                alternateName: "Automatización de WhatsApp",
                description:
                  "Respuestas automáticas, captura de interesados, agendamiento de citas, pedidos y avisos sobre la WhatsApp Business Platform.",
                url: `${SITE_URL}/servicios/chatbot-whatsapp`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SEO y posicionamiento",
                description:
                  "SEO técnico entregado con el sitio y planes mensuales de posicionamiento local.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Software a medida",
                description: "Apps web, sistemas internos y plataformas hechas a medida.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Diseño web / UI",
                description: "Interfaz y experiencia de usuario para web y producto digital.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mantenimiento y soporte",
                description:
                  "Planes mensuales de vigilancia, respaldos, cambios de contenido y mejoras continuas.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es JSON estático generado en el servidor.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
