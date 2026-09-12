import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PriceTag } from "@/components/kit/Precio";
import type { Idioma } from "@/content/types";

/**
 * LA PÁGINA QUE NO EXISTE
 * ──────────────────────────────────────────────────────────────────────────
 * No había ninguna: un 404 en este sitio devolvía la pantalla de fábrica de
 * Next —«404. This page could not be found.», en inglés, sobre fondo blanco,
 * sin cabecera, sin pie y sin una sola salida—. Quien llega aquí lo hace por
 * un enlace viejo, una URL mal copiada o un resultado de búsqueda
 * desactualizado: gente que SÍ quería entrar, y se encontraba la puerta
 * cerrada y sin timbre.
 *
 * EL CUERPO ES UNO Y LAS RAÍCES SON DOS. El sitio tiene dos layouts raíz
 * —`app/(es)` y `app/(en)`, porque el `lang` del <html> tiene que decir la
 * verdad en cada idioma—, así que hacen falta dos `not-found.tsx`: uno por
 * grupo, cada uno dentro de su layout. Lo que no hace falta es escribir la
 * página dos veces.
 *
 * SE PROBÓ `global-not-found.tsx`, que es lo que la documentación de Next
 * recomienda para este caso, y no mejora nada aquí: con dos layouts raíz, Next
 * lo envuelve igual en el layout que corresponda y además añade su propia
 * cáscara, así que salen un <html> y un <body> dentro de otros. Medido con
 * `curl` contra el build de producción, no solo en desarrollo. Con dos
 * `not-found.tsx` normales el resultado es el mismo en pantalla y sin bandera
 * experimental de por medio.
 *
 * EL TEXTO ES LA VOZ DEL SITIO Y ES UNA PROPUESTA. «Esta página no existe. Los
 * precios sí» dice en cinco palabras lo mismo que la marca lleva diciendo en
 * cuarenta páginas, y de paso manda a donde hay algo que ver.
 *
 * LA «/» SE DIBUJA, y es el único adorno. Es el motivo de la marca —el mismo
 * trazo del logotipo y de la manija de «las mismas manos»— trazándose una vez
 * al cargar. Con movimiento reducido nace dibujada.
 *
 * TRES SALIDAS Y NO UNA LISTA DE VEINTE: precios, servicios y la llamada. Un
 * mapa del sitio entero en un 404 es pedirle a alguien que ya se perdió que
 * elija entre veinte puertas.
 */

/**
 * Los textos del 404, en las dos lenguas. La versión en castellano es la que
 * Luis tiene que aprobar o cambiar: no hay ninguna cifra ni promesa dentro, así
 * que tocarla no afecta a nada más del sitio.
 */
const T = {
  es: {
    error: "Error 404",
    titulo: "Esta página no existe.",
    acento: "Los precios sí.",
    cuerpo:
      "Llegaste por un enlace viejo o por una dirección mal copiada. Nada se perdió: lo que buscabas está a un clic de aquí.",
    precios: "Ver los precios",
    servicios: "Ver los servicios",
    agendar: "Agendar una llamada",
    pie: "Una página web queda lista en cinco días. Los demás precios están publicados.",
    hrefPrecios: "/precios",
    hrefServicios: "/servicios/diseno-de-paginas-web",
    hrefAgendar: "/agendar",
  },
  en: {
    error: "Error 404",
    titulo: "This page doesn't exist.",
    acento: "The prices do.",
    cuerpo:
      "You got here from an old link or a mistyped address. Nothing is lost: what you were looking for is one click away.",
    precios: "See the prices",
    servicios: "See the services",
    agendar: "Book a call",
    pie: "A website is live in five days. The rest of the prices are published.",
    hrefPrecios: "/en/pricing",
    hrefServicios: "/en/services/web-design",
    hrefAgendar: "/en/book-a-call",
  },
} as const;

export function NoEncontrada({ idioma }: { idioma: Idioma }) {
  const t = T[idioma];

  return (
    <>
      <Header idioma={idioma} />
      <main id="contenido">
        <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-[calc(var(--header-h)+4rem)] md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <div>
            <p className="jv-eyebrow text-brand">{t.error}</p>
            <h1 className="mt-4 max-w-[16ch] text-balance text-[length:var(--text-hero)]">
              {t.titulo} <span className="block text-brand">{t.acento}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {t.cuerpo}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={t.hrefPrecios} className="jv-boton">
                {t.precios} <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link href={t.hrefServicios} className="jv-boton-2">
                {t.servicios}
              </Link>
              <Link href={t.hrefAgendar} className="jv-boton-2">
                {t.agendar}
              </Link>
            </div>

            <div className="jv-rule mt-10 max-w-[52ch] pt-6">
              <p className="text-sm leading-relaxed text-ink-soft">{t.pie}</p>
              <PriceTag id="landing" idioma={idioma} tam="sm" className="mt-4" />
            </div>
          </div>

          {/* La «/» de la marca, trazándose. Es el único adorno de la página y
              es el motivo de la casa, no una ilustración de archivo. */}
          <figure aria-hidden className="jv-404 hidden justify-self-center lg:block">
            <svg viewBox="0 0 200 260" className="h-auto w-full max-w-[14rem]" fill="none">
              <path
                className="jv-404__trazo"
                d="M150 20 L50 240"
                stroke="var(--brand-500)"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </svg>
          </figure>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}
