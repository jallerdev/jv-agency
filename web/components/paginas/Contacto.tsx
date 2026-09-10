import { ArrowUpRight, CalendarCheck, Mail } from "lucide-react";

import { CONTACTO } from "@/content/paginas/contacto";
import type { Idioma } from "@/content/types";
import { BUSINESS, WHATSAPP_LINK, SITE_URL } from "@/lib/business";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { ScheduleCall } from "@/components/ScheduleCall";

/**
 * LA PÁGINA DE CONTACTO
 * ──────────────────────────────────────────────────────────────────────────
 * Faltaba una URL a la que mandar a alguien que pregunta «¿cómo te contacto?».
 * El diálogo existía y la sección de agenda existía, pero las dos vivían
 * dentro de otra página: la respuesta era «baja hasta el final de la portada»,
 * que no es una respuesta.
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
    },
  };

  const destino: Record<string, string> = {
    llamada: "#agenda",  /* la propia página ya trae el formulario debajo */
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
        {/* ── Encabezado ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-10 pt-32 text-center md:px-12 md:pt-40">
          <Reveal>
            <Badge>{CONTACTO.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {CONTACTO.titulo[idioma]}{" "}
              <span className="text-brand">{CONTACTO.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
              {CONTACTO.entradilla[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Las tres vías ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pb-16 md:px-12">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CONTACTO.vias.map((v, i) => {
              const Marca = Icono[v.id as keyof typeof Icono];
              const href = destino[v.id];
              const externo = href.startsWith("http") || href.startsWith("mailto");
              return (
                <Reveal key={v.id} index={i} as="li">
                  <article className="jv-card jv-card-int group relative flex h-full flex-col p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] bg-brand-quiet text-brand">
                      <Marca className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </span>
                    <h2 className="jv-titulo mt-6">{v.titulo[idioma]}</h2>
                    <p className="mt-3 flex-1 text-pretty text-ink-soft">{v.cuerpo[idioma]}</p>

                    {/* La acción y la nota en DOS renglones, no en una fila
                        repartida: a tres columnas la fila deja 150 px por lado
                        y parte «Abrir WhatsApp» en dos líneas y «Respondo en
                        menos de 24 h» en dos más. Apiladas caben enteras a
                        cualquier ancho. */}
                    <span className="jv-rule mt-6 flex flex-col gap-2 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        {v.accion[idioma]}
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 transition-transform duration-base ease-ps group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                      <span className="jv-eyebrow text-ink-muted">{v.nota[idioma]}</span>
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

        {/* ── La agenda y la ficha del estudio ────────────────────────── */}
        <section id="agenda" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 pb-24 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <Reveal className="lg:sticky lg:top-32">
              <h2 className="text-[length:var(--text-display)]">
                {CONTACTO.agendaTitulo[idioma]}
              </h2>
              <p className="mt-5 max-w-[42ch] text-pretty text-ink-soft">
                {CONTACTO.agendaEntradilla[idioma]}
              </p>

              <h3 className="jv-eyebrow mt-12 text-ink-muted">{CONTACTO.fichaTitulo[idioma]}</h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {CONTACTO.ficha.map((f) => (
                  <div
                    key={f.k.es}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                  >
                    <dt className="jv-eyebrow text-ink-muted">{f.k[idioma]}</dt>
                    <dd className="text-sm text-ink-soft">{f.v[idioma]}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-1">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="jv-enlace inline-flex min-h-11 items-center self-start text-ink"
                >
                  {BUSINESS.email}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jv-enlace inline-flex min-h-11 items-center self-start text-ink"
                >
                  {BUSINESS.whatsappDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal>
              <ScheduleCall idioma={idioma} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}
