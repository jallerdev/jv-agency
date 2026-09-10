import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AGENDAR } from "@/content/paginas/agendar";
import { AGENDA } from "@/content/home/agenda";
import type { Idioma } from "@/content/types";
import { SITE_URL, BUSINESS } from "@/lib/business";
import { enlaceReal } from "@/lib/rutas";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { ScheduleCall } from "@/components/ScheduleCall";

/**
 * LA PÁGINA DE AGENDAR
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/agendar` y `/en/book-a-call`.
 *
 * NO LLEVA BARRA DE CTA MÓVIL, igual que `/contacto`: una barra fija que dice
 * «agenda tu llamada» encima de la página donde ya estás agendando tapa el
 * campo que estás escribiendo y no ofrece nada que no esté ya en pantalla.
 *
 * EL FORMULARIO ES EL MISMO OBJETO que cierra la portada —`ScheduleCall`, con
 * su `freebusy`, su 409 por franja ocupada y su respaldo a WhatsApp—. Aquí no
 * se duplica ni una línea de esa lógica: cambia el marco, no la máquina.
 *
 * EL FORMULARIO VA PRIMERO Y ARRIBA. Quien entra por esta URL ya decidió: le
 * mandaron el enlace o le dio al botón de la cabecera. Ponerle tres párrafos
 * de argumentos encima sería volver a venderle algo que ya compró.
 */
export function PaginaAgendar({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ReservationPage",
    url: `${SITE_URL}${ruta}`,
    inLanguage: idioma,
    name: AGENDAR.titulo[idioma],
    description: AGENDAR.entradilla[idioma],
    about: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_URL}${ruta}`,
      result: {
        "@type": "Reservation",
        name: idioma === "es" ? "Llamada de diagnóstico" : "Diagnostic call",
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header idioma={idioma} />
      <main id="contenido">
        {/* ── Encabezado y formulario, lado a lado ────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-32 md:px-12 md:pt-40">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <Reveal className="lg:sticky lg:top-32">
              <Badge>{AGENDAR.badge[idioma]}</Badge>
              {/* No usa `--text-hero` como `/contacto` y es por el sitio, no
                  por gusto: allá el titular va centrado en 896 px y aquí vive
                  en una columna de 500, así que la misma cifra —hasta 4,5rem—
                  lo parte en tres renglones y empuja las tres razones fuera de
                  pantalla. A 3,25rem de tope entra en dos y el formulario, que
                  es a lo que se viene, se queda arriba del pliegue. */}
              <h1 className="mt-6 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05]">
                {AGENDAR.titulo[idioma]}{" "}
                <span className="text-brand">{AGENDAR.tituloAcento[idioma]}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
                {AGENDAR.entradilla[idioma]}
              </p>

              {/* Las tres razones son las mismas de la portada y salen del
                  mismo archivo. Repetirlas aquí a mano habría sido garantizar
                  que en dos meses dijeran cosas distintas. */}
              <ul className="mt-10 flex flex-col divide-y divide-line border-y border-line">
                {AGENDA.puntos.map((p) => (
                  <li key={p.titulo.es} className="py-5">
                    <h2 className="jv-titulo text-base">{p.titulo[idioma]}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {p.cuerpo[idioma]}
                    </p>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-ink-soft">
                {AGENDAR.alternativa.texto[idioma]}{" "}
                <Link
                  href={enlaceReal(AGENDAR.alternativa.href[idioma])}
                  className="jv-enlace inline-flex items-center gap-1 font-semibold text-brand"
                >
                  {AGENDAR.alternativa.enlace[idioma]}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                </Link>
              </p>
            </Reveal>

            <Reveal>
              <ScheduleCall idioma={idioma} />
            </Reveal>
          </div>
        </section>

        {/* ── Qué pasa después de reservar ────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
          <Reveal>
            <h2 className="jv-titulo text-[clamp(1.5rem,3vw,2.25rem)]">
              {AGENDAR.despuesTitulo[idioma]}
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {AGENDAR.despues.map((d, i) => (
              <Reveal key={d.titulo.es} index={i} as="li">
                <article className="jv-card flex h-full flex-col p-7">
                  <span aria-hidden className="jv-eyebrow text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="jv-titulo mt-4">{d.titulo[idioma]}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                    {d.cuerpo[idioma]}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="mt-10 text-sm text-ink-muted">
              {idioma === "es"
                ? `Si algo falla, escríbeme a ${BUSINESS.email}.`
                : `If anything goes wrong, write to me at ${BUSINESS.email}.`}
            </p>
          </Reveal>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
    </>
  );
}
