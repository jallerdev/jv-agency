import { ArrowUpRight, CalendarCheck, Mail } from "lucide-react";

import { CONTACTO } from "@/content/paginas/contacto";
import type { Idioma } from "@/content/types";
import { BUSINESS, WHATSAPP_LINK, SITE_URL } from "@/lib/business";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { Reveal } from "@/components/Reveal";
import { ScheduleCall } from "@/components/ScheduleCall";
import { PageHero } from "@/components/kit/PageHero";
import { HoraLocal } from "@/components/visuales/HoraLocal";

/**
 * LA PÁGINA DE CONTACTO
 * ──────────────────────────────────────────────────────────────────────────
 * Faltaba una URL a la que mandar a alguien que pregunta «¿cómo te contacto?».
 * El diálogo existía y la sección de agenda existía, pero las dos vivían
 * dentro de otra página: la respuesta era «baja hasta el final de la portada»,
 * que no es una respuesta.
 *
 * QUÉ LA SEPARA DE /agendar, QUE ERA EL DIAGNÓSTICO
 * ------------------------------------------------
 * Las dos enseñaban el mismo formulario y casi los mismos tres beneficios, así
 * que sobraba una. Ahora tienen trabajos distintos: **contacto es para ELEGIR
 * CANAL** —tres vías, cada una con su promesa de respuesta, y la hora de
 * Turbaco diciendo si hay alguien ahí ahora mismo—; /agendar es una página de
 * foco con una sola tarea. El formulario sigue aquí porque cerrar desde donde
 * ya estás vale más que un salto más, pero deja de ser el argumento: es la
 * tercera opción de las tres, no la única.
 *
 * LA PIEZA FIRMA ES LA HORA LOCAL. El encargo pedía un mapa SVG con el pin en
 * Turbaco; el motivo de no hacerlo está escrito en `HoraLocal.tsx`. En una
 * palabra: un mapa dibujado a ojo es un adorno con forma de dato.
 *
 * NO HAY BARRA DE CTA MÓVIL AQUÍ, y es a propósito: una barra fija que dice
 * «agenda tu llamada» encima de la página donde ya estás agendando tapa el
 * campo que estás escribiendo y no ofrece nada nuevo.
 */
export function PaginaContacto({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}${ruta}`,
    inLanguage: idioma,
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        availableLanguage: ["es", "en"],
        areaServed: "CO",
      },
      /* El mismo horario que enseña la pieza de la hora local, que es el que
         Luis confirmó. Sale de `BUSINESS.horario` para que la página y el dato
         estructurado no puedan decir cosas distintas. */
      openingHoursSpecification: BUSINESS.horario.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dias,
        opens: h.abre,
        closes: h.cierra,
      })),
    },
  };

  const destino: Record<string, string> = {
    llamada: "#agenda" /* la propia página ya trae el formulario debajo */,
    whatsapp: WHATSAPP_LINK,
    correo: `mailto:${BUSINESS.email}`,
  };

  const Icono = { llamada: CalendarCheck, whatsapp: WhatsAppGlyph, correo: Mail };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        <PageHero
          variante="servicio"
          idioma={idioma}
          migas={[{ texto: CONTACTO.badge[idioma] }]}
          eyebrow={CONTACTO.badge[idioma]}
          titulo={
            <>
              {CONTACTO.titulo[idioma]}{" "}
              <span className="text-brand">{CONTACTO.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={CONTACTO.entradilla[idioma]}
          aparte={<HoraLocal idioma={idioma} />}
        />

        {/* ── Las tres vías ───────────────────────────────────────────── */}
        <section
          id="canales"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {CONTACTO.canalesTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {CONTACTO.canalesEntradilla[idioma]}
            </p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CONTACTO.vias.map((v, i) => {
              const Marca = Icono[v.id as keyof typeof Icono];
              const href = destino[v.id];
              const externo = href.startsWith("http") || href.startsWith("mailto");
              return (
                <Reveal key={v.id} index={i} as="li" className="h-full">
                  {/* LA PROMESA VA ARRIBA Y EL GLIFO EN LÍNEA CON EL TITULAR.
                      Antes esto era azulejo de color con icono, titular debajo
                      y cuerpo debajo: el naipe genérico que el detector marca
                      como `icon-tile-stack`, tres veces seguidas. Además el
                      azulejo no distinguía nada —los tres eran el mismo
                      cuadrado naranja—, mientras que lo que de verdad separa
                      una vía de otra es CUÁNDO contesta. Esa línea sube a
                      donde se lee primero. */}
                  <article className="jv-card jv-card-int group relative flex h-full flex-col p-7 md:p-8">
                    <p className="jv-eyebrow text-brand">{v.nota[idioma]}</p>

                    <h3 className="jv-titulo mt-4 flex items-start gap-3">
                      <Marca
                        className="mt-0.5 h-6 w-6 shrink-0 text-ink-muted transition-colors duration-base ease-ps group-hover:text-brand"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span>{v.titulo[idioma]}</span>
                    </h3>

                    <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-soft">
                      {v.cuerpo[idioma]}
                    </p>

                    <span className="jv-rule mt-7 inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
                      {v.accion[idioma]}
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 transition-transform duration-base ease-ps group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>

                    {/* El enlace cubre la tarjeta entera; el nombre accesible
                        sale del título, no de «Abrir WhatsApp», que repetido
                        tres veces no dice a dónde va. */}
                    <a
                      href={href}
                      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="absolute inset-0 rounded-[inherit]"
                      aria-label={`${v.titulo[idioma]} — ${v.accion[idioma]}`}
                    >
                      <span className="sr-only">{v.titulo[idioma]}</span>
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ── La credencial del estudio y la agenda ───────────────────── */}
        <section
          id="agenda"
          className="border-t border-line bg-tint"
        >
          <div className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <h2 className="text-balance text-[length:var(--text-h2)]">
                    {CONTACTO.agendaTitulo[idioma]}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    {CONTACTO.agendaEntradilla[idioma]}
                  </p>

                  <FichaEstudio idioma={idioma} />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <ScheduleCall idioma={idioma} />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}

/**
 * «El estudio», como credencial y no como tabla.
 *
 * Eran cuatro filas de `<dl>` sueltas debajo del titular y se leían como una
 * ficha técnica de producto. Son las cuatro cosas que alguien quiere saber
 * antes de escribir —quién contesta, dónde está, a quién atiende y en qué
 * idiomas—, así que van montadas como un documento: lomo de marca al canto,
 * las filas dentro y las dos direcciones reales al pie, tocables.
 */
function FichaEstudio({ idioma }: { idioma: Idioma }) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[--radius-lg] border border-line bg-canvas">
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-brand-300 via-brand to-brand-700"
      />

      <div className="p-6 pl-7">
        <h3 className="jv-eyebrow text-ink-muted">{CONTACTO.fichaTitulo[idioma]}</h3>

        <dl className="mt-5 flex flex-col gap-4">
          {CONTACTO.ficha.map((f) => (
            <div key={f.k.es}>
              <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
                {f.k[idioma]}
              </dt>
              <dd className="mt-1 text-sm text-ink">{f.v[idioma]}</dd>
            </div>
          ))}
        </dl>

        <div className="jv-rule mt-6 flex flex-col gap-1 pt-5">
          <a
            href={`mailto:${BUSINESS.email}`}
            className="jv-enlace inline-flex min-h-11 items-center self-start font-mono text-xs text-ink"
          >
            {BUSINESS.email}
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="jv-enlace inline-flex min-h-11 items-center self-start font-mono text-xs text-ink"
          >
            {BUSINESS.whatsappDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
