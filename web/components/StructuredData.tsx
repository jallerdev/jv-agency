import { BUSINESS, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/business";

// JSON-LD para SEO y motores de IA (GEO). Un @graph con Organization,
// WebSite y ProfessionalService que comparten el mismo negocio.
export function StructuredData() {
  const sameAs = SOCIAL_LINKS.map((s) => s.url);

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.countryCode,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: BUSINESS.legalName,
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
        founder: { "@type": "Person", name: BUSINESS.legalName },
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
          "Estudio de diseño y desarrollo web y software a medida para PYMEs en Latinoamérica.",
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        priceRange: "$$",
        address: postalAddress,
        areaServed: BUSINESS.areaServed,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        sameAs,
        knowsAbout: [
          "Desarrollo web",
          "Software a medida",
          "Diseño web",
          "Diseño UI/UX",
          "Mantenimiento web",
        ],
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
