import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AGENDAR } from "@/content/paginas/agendar";
import { AGENDA } from "@/content/home/agenda";
import type { Idioma } from "@/content/types";
import { SITE_URL, BUSINESS } from "@/lib/business";
import { enlaceReal, rutaEnOtroIdioma } from "@/lib/rutas";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ScheduleCall } from "@/components/ScheduleCall";

/**
 * LA PÁGINA DE AGENDAR — PÁGINA DE FOCO
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/agendar` y `/en/book-a-call`.
 *
 * NO LLEVA LA CABECERA NI EL PIE DEL SITIO, y es el cambio de fondo: esta
 * página existe para hacer UNA cosa. El mega-menú de servicios, las cuatro
 * columnas del pie y la barra de CTA móvil son otras dieciocho puertas puestas
 * alrededor de la única que se quiere que alguien cruce. Se quedan el
 * logotipo, la salida —«Volver»— y el cambio de idioma, que son las tres cosas
 * que no se le pueden quitar a nadie.
 *
 * EL FORMULARIO ES EL HÉROE Y VA ANTES QUE LOS ARGUMENTOS EN MÓVIL. Quien
 * entra por esta URL ya decidió: le mandaron el enlace o le dio al botón de la
 * cabecera. El orden del DOM lo pone justo después del titular, así que en un
 * teléfono se ve sin desplazarse; en escritorio, la rejilla lo manda a su
 * columna y las tres razones se leen al lado.
 *
 * EL FORMULARIO ES EL MISMO OBJETO que cierra la portada —`ScheduleCall`, con
 * su `freebusy`, su 409 por franja ocupada y su respaldo a WhatsApp—. Aquí no
 * se duplica ni una línea de esa lógica: cambia el marco, no la máquina.
 */
export function PaginaAgendar({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const es = idioma === "es";

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
        name: es ? "Llamada de diagnóstico" : "Diagnostic call",
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
      <CabeceraFoco idioma={idioma} ruta={ruta} />

      <main id="contenido">
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-10 md:px-12 md:pb-24 md:pt-14">
          {/* La rejilla coloca a mano en escritorio para que el ORDEN DEL DOM
              pueda ser el del teléfono: titular, formulario, razones. Con el
              orden visual de escritorio —titular, razones, formulario— habría
              que bajar media pantalla en un móvil para ver el campo del
              nombre, en la página cuyo único trabajo es que se llene. */}
          {/* `grid-rows-[auto_1fr]`: el formulario cruza las dos filas y es más alto
              que el titular más las razones, así que el sobrante hay que
              mandarlo a algún sitio. Repartido entre las dos filas —que es lo
              que hace `auto auto`— abría doscientos píxeles de nada entre la
              entradilla y «Hablas conmigo». */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:grid-rows-[auto_1fr] lg:gap-16">
            <header className="lg:col-start-1 lg:row-start-1">
              <p className="jv-eyebrow text-brand">{AGENDAR.badge[idioma]}</p>
              {/* Sin Reveal: este es el LCP. */}
              <h1 className="mt-4 text-balance text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05]">
                {AGENDAR.titulo[idioma]}{" "}
                <span className="text-brand">{AGENDAR.tituloAcento[idioma]}</span>
              </h1>
              <p className="mt-5 max-w-[46ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {AGENDAR.entradilla[idioma]}
              </p>
            </header>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-10">
                <ScheduleCall idioma={idioma} comoTitulo="h2" />
              </div>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              {/* Las tres razones son las mismas de la portada y salen del
                  mismo archivo. Repetirlas aquí a mano habría sido garantizar
                  que en dos meses dijeran cosas distintas. */}
              <ul className="flex flex-col divide-y divide-line border-y border-line">
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
            </div>
          </div>
        </section>

        {/* ── Qué pasa después de reservar ────────────────────────────── */}
        <section className="border-t border-line bg-tint">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
            <Reveal>
              <h2 className="text-balance text-[length:var(--text-h2)]">
                {AGENDAR.despuesTitulo[idioma]}
              </h2>
            </Reveal>
            <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-3">
              {AGENDAR.despues.map((d, i) => (
                <Reveal key={d.titulo.es} index={i} as="li" className="bg-canvas p-7">
                  <span aria-hidden className="jv-eyebrow text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="jv-titulo mt-4">{d.titulo[idioma]}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">
                    {d.cuerpo[idioma]}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <p className="mt-8 text-sm text-ink-muted">
                {es
                  ? `Si algo falla, escríbeme a ${BUSINESS.email}.`
                  : `If anything goes wrong, write to me at ${BUSINESS.email}.`}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <PieFoco idioma={idioma} />
    </>
  );
}

/**
 * La cabecera de una página de foco: marca, salida y cambio de idioma.
 *
 * NO ES FIJA, y eso también es parte del foco. Una barra pegada arriba se come
 * ochenta píxeles de un teléfono justo en la página donde el formulario tiene
 * que verse sin desplazarse. Aquí se desplaza con la página y devuelve esos
 * píxeles al campo del nombre.
 */
function CabeceraFoco({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const otro = rutaEnOtroIdioma(ruta);
  const inicio = idioma === "es" ? "/" : "/en";

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-6 py-4 md:px-12">
        <Link
          href={inicio}
          aria-label={idioma === "es" ? "JV Agencia — Inicio" : "JV Agencia — Home"}
          className="shrink-0"
        >
          <Logo className="h-7 w-auto text-ink" />
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {otro && (
            <Link
              href={otro}
              hrefLang={idioma === "es" ? "en" : "es"}
              aria-label={idioma === "es" ? "Ver en inglés" : "Ver en español"}
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps hover:text-ink"
            >
              <span className={idioma === "es" ? "text-ink" : undefined}>ES</span>
              <span aria-hidden className="text-line">
                /
              </span>
              <span className={idioma === "en" ? "text-ink" : undefined}>EN</span>
            </Link>
          )}

          <Link
            href={inicio}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-soft transition-colors duration-base ease-ps hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {idioma === "es" ? "Volver" : "Back"}
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * El pie mínimo: lo que la ley pide y nada más.
 *
 * El pie del sitio tiene cuatro columnas con dieciocho enlaces. Puesto debajo
 * de un formulario a medio llenar, es una lista de sitios mejores a los que
 * irse. Aquí quedan los tres enlaces legales, que no son opcionales, y la
 * línea de la marca.
 */
function PieFoco({ idioma }: { idioma: Idioma }) {
  const legales = [
    { texto: idioma === "es" ? "Privacidad" : "Privacy", href: "/privacidad" },
    { texto: idioma === "es" ? "Términos" : "Terms", href: "/terminos" },
    { texto: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:px-12">
        <p className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {BUSINESS.tradeName} · {BUSINESS.address.city},{" "}
          {BUSINESS.address.region}
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-1 md:ml-auto">
          {legales.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center font-mono text-xs text-ink-muted transition-colors duration-base ease-ps hover:text-ink"
              >
                {l.texto}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
