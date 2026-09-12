import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, UserRound } from "lucide-react";

import { SOBRE } from "@/content/paginas/sobre";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { BUSINESS, SITE_URL, WHATSAPP_LINK } from "@/lib/business";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Testimonios } from "@/components/sections/Testimonios";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/kit/PageHero";
import { SectionIndex } from "@/components/kit/SectionIndex";
import { Cifras } from "@/components/kit/Cifras";
import { FinalCTA, NextStep } from "@/components/kit/FinalCTA";
import { MismasManos } from "@/components/visuales/MismasManos";

/**
 * QUIÉN ESTÁ DETRÁS, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/sobre-nosotros` y `/en/about`.
 *
 * El `@id` de la persona es el MISMO que usa la portada. Si cada página
 * declarara su propia Person, Google vería tres Luis Jaller distintos y la
 * experiencia demostrable —que es justo lo que esta página existe para
 * probar— quedaría repartida entre tres entidades sin peso ninguna.
 *
 * QUÉ CAMBIÓ EN LA FASE 3, Y POR QUÉ
 * ----------------------------------
 * Era la página con menos personalidad del sitio: siete bloques centrados, uno
 * detrás de otro, con el tono de una hoja de vida en la página que tiene que
 * sonar a persona. Ahora:
 *
 * · La tesis de la marca deja de ser una frase del H1 y pasa a ser un objeto
 *   que se toca: la pieza firma «Las mismas manos», con el diseño a un lado,
 *   el código que lo produce al otro y la «/» del logotipo como manija.
 * · Las cifras cuentan una sola vez al entrar en vista, con el mismo contador
 *   que la portada. Eran cadenas —«3+»— y una cadena no se puede contar.
 * · La bitácora sustituye a la rejilla de cuatro tarjetas: un carril con lo que
 *   está en línea, cada fila con su dominio abrible, y la verificación de Meta
 *   con su fecha real. Sin fechas inventadas para los proyectos.
 * · «Cómo trabajo» enlaza a «qué no hago» de la página de software, que es
 *   donde la voz honesta del sitio está más completa.
 * · Las recomendaciones de LinkedIn, que vivían solo en la portada, entran
 *   aquí: es la página donde alguien viene a decidir si se fía.
 */
export function PaginaSobre({ idioma, ruta }: { idioma: Idioma; ruta: string }) {
  const f = SOBRE.fundador;
  const es = idioma === "es";
  const url = `${SITE_URL}${ruta}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url,
    inLanguage: idioma,
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@id": `${SITE_URL}${BUSINESS.personId}`,
      "@type": "Person",
      name: BUSINESS.founderName,
      jobTitle: f.rol[idioma],
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url,
      sameAs: [f.linkedin, f.github, f.portafolio],
      knowsAbout: SOBRE.conocimientos[idioma],
    },
  };

  const enlaces = [
    { texto: "LinkedIn", href: f.linkedin, Glifo: Linkedin },
    { texto: "GitHub", href: f.github, Glifo: Github },
    { texto: f.verPortafolio[idioma], href: f.portafolio, Glifo: UserRound },
  ];

  const indice = [
    { id: "quien", texto: es ? "Quién responde" : "Who replies" },
    { id: "manos", texto: es ? "Las mismas manos" : "The same hands" },
    { id: "trabajo", texto: SOBRE.enfoqueTitulo[idioma] },
    { id: "testimonios", texto: es ? "Recomendaciones" : "Recommendations" },
    { id: "stack", texto: SOBRE.stackTitulo[idioma] },
  ];

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
          migas={[{ texto: es ? "Sobre nosotros" : "About" }]}
          eyebrow={SOBRE.badge[idioma]}
          titulo={
            <>
              {SOBRE.titulo[idioma]}{" "}
              <span className="block text-brand">{SOBRE.tituloAcento[idioma]}</span>
            </>
          }
          entradilla={SOBRE.entradilla[idioma]}
          indice={<SectionIndex entradas={indice} idioma={idioma} variante="chip" />}
          aparte={<Retrato idioma={idioma} />}
          acciones={
            <>
              <Button size="lg" variant="primary" asChild>
                <Link href={enlaceReal(es ? "/agendar" : "/en/book-a-call")}>
                  {es ? "Agenda una llamada" : "Book a call"}{" "}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  {es ? "Escríbeme por WhatsApp" : "Message me on WhatsApp"}
                </a>
              </Button>
            </>
          }
        />

        {/* ── Las cifras ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1280px] px-6 pt-16 md:px-12 md:pt-20">
          <Cifras
            idioma={idioma}
            cifras={SOBRE.cifras.map((c) => ({
              valor: c.valor,
              prefijo: c.prefijo,
              sufijo: c.sufijo,
              cuenta: c.cuenta,
              etiqueta: c.etiqueta[idioma],
            }))}
          />
        </section>

        {/* ── Quién responde ──────────────────────────────────────────── */}
        <section
          id="quien"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2 className="text-balance text-[length:var(--text-h2)]">{f.nombre}</h2>
                <p className="jv-eyebrow mt-2 text-accent-ink">{f.rol[idioma]}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="max-w-[62ch] text-pretty text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                {f.bio[idioma]}
              </p>

              {/* LO QUE NO SE PUEDE NOMBRAR, DICHO POR SECTOR. Estaba en la
                  bitácora, que se quitó, y es la única frase de esa sección que
                  no vive en ningún otro sitio del sitio —los cuatro proyectos
                  abiertos ya están en el portafolio de la portada y la
                  credencial de Meta, en su hero—. Se queda aquí porque contesta
                  «¿y qué más has hecho?» sin romper un NDA, que es lo que un
                  cliente pregunta justo después de leer la bio. */}
              <p className="jv-rule mt-8 max-w-[62ch] pt-6 text-sm leading-relaxed text-ink-muted">
                {SOBRE.proyectosSectores[idioma]}
              </p>

              {/* Los tres enlaces como pastillas con glifo: el mismo mueble que
                  la portada. Texto suelto con una flecha detrás deja la flecha
                  colgando sola en cuanto la columna se estrecha. */}
              <ul className="mt-9 flex flex-wrap gap-3">
                {enlaces.map(({ texto, href, Glifo }) => (
                  <li key={texto}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="jv-chip jv-chip-off group min-h-11 gap-2.5 pr-4 text-[0.9375rem] hover:border-brand hover:text-brand"
                    >
                      <Glifo className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                      {texto}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={2}
                        className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-base ease-ps group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Pieza firma: las mismas manos ───────────────────────────── */}
        <section id="manos" className="border-y border-line bg-tint">
          {/* Contenedor más estrecho que el resto de la página, y a propósito:
              con los 1280 de las demás secciones quedaban doscientos píxeles
              de nada entre el titular y la pieza. Una banda de firma se mira,
              no se recorre. */}
          <div className="mx-auto max-w-[1120px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-16">
              <Reveal>
                <h2 className="text-balance text-[length:var(--text-display)]">
                  {SOBRE.manos.titulo[idioma]}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                  {SOBRE.manos.entradilla[idioma]}
                </p>
                <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-ink-muted">
                  {SOBRE.manos.nota[idioma]}
                </p>
              </Reveal>

              <Reveal delay={120} variant="scale">
                <MismasManos idioma={idioma} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Cómo trabajo ────────────────────────────────────────────── */}
        <section
          id="trabajo"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOBRE.enfoqueTitulo[idioma]}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line md:grid-cols-3">
            {SOBRE.enfoque.map((e, i) => (
              <Reveal key={e.titulo.es} delay={i * 90} className="bg-canvas p-7 md:p-8">
                <span className="font-mono text-sm tabular-nums text-brand">0{i + 1}</span>
                <h3 className="jv-titulo mt-3">{e.titulo[idioma]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{e.cuerpo[idioma]}</p>
              </Reveal>
            ))}
          </div>

          {/* La otra mitad del oficio: lo que este estudio dice que no. Vive
              entera en la página de software y se enlaza en vez de resumirse:
              media lista de «qué no hago» es peor que ninguna. */}
          <Reveal delay={120}>
            <p className="mt-8 max-w-[62ch] leading-relaxed text-ink-soft">
              {SOBRE.noHagoAntes[idioma]}
              <Link
                href={`${enlaceReal(
                  es ? "/servicios/software-a-la-medida" : "/en/services/custom-software",
                )}#no-hago`}
                className="jv-enlace font-semibold text-brand"
              >
                {SOBRE.noHagoEnlace[idioma]}
              </Link>
              {SOBRE.noHagoDespues[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Recomendaciones de LinkedIn ─────────────────────────────── */}
        <Testimonios idioma={idioma} />

        {/* ── Qué domino ──────────────────────────────────────────────── */}
        <section
          id="stack"
          className="mx-auto max-w-[1280px] scroll-mt-28 px-6 py-20 md:px-12 md:py-24"
        >
          <Reveal>
            <h2 className="text-balance text-[length:var(--text-display)]">
              {SOBRE.stackTitulo[idioma]}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {SOBRE.stackEntradilla[idioma]}
            </p>
          </Reveal>

          {/* Dos bloques y no uno: lo que se cotiza arriba, lo que es
              experiencia abajo y dicho como tal. Es el arreglo de la
              contradicción con la página de software. */}
          <Reveal>
            <h3 className="jv-eyebrow mt-12 text-ink-muted">
              {SOBRE.stackSubtituloEncargo[idioma]}
            </h3>
          </Reveal>
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SOBRE.stack
              .filter((s) => s.encargo)
              .map((s) => (
                <Reveal key={s.grupo.es} className="bg-canvas p-6">
                  <h4 className="jv-eyebrow text-ink-muted">{s.grupo[idioma]}</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <li key={it} className="jv-chip jv-chip-off text-xs">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
          </div>

          <Reveal>
            <h3 className="jv-eyebrow mt-14 text-ink-muted">
              {SOBRE.stackSubtituloTambien[idioma]}
            </h3>
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
              {SOBRE.stackNotaTambien[idioma]}
            </p>
          </Reveal>
          <Reveal>
            <div className="jv-card mt-5 grid grid-cols-1 gap-6 border-dashed p-6 sm:grid-cols-2 sm:gap-10 sm:p-7">
              {SOBRE.stack
                .filter((s) => !s.encargo)
                .map((s) => (
                  <div key={s.grupo.es}>
                    <h4 className="jv-eyebrow text-ink-muted">{s.grupo[idioma]}</h4>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li key={it} className="jv-chip jv-chip-off text-xs">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </Reveal>
        </section>

        <FinalCTA
          idioma={idioma}
          titulo={SOBRE.cierre.titulo[idioma]}
          cuerpo={SOBRE.cierre.cuerpo[idioma]}
          siguiente={<NextStep id="landing" idioma={idioma} />}
        />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}

/**
 * EL RETRATO QUE NO ES UNA FOTO DE BANCO
 * ──────────────────────────────────────────────────────────────────────────
 * El encargo pide aquí una foto real de Luis en su sitio de trabajo. No
 * existe, y el propio encargo dice qué hacer entonces: marcarlo, nunca una
 * imagen de archivo. Así que la placa lleva el monograma sobre el florón de
 * marca —la misma decisión que toma la portada— y el marcador de que falta la
 * foto sale en desarrollo y no en producción: quien está mirando el sitio no
 * tiene por qué leer las notas internas del estudio.
 */
function Retrato({ idioma }: { idioma: Idioma }) {
  return (
    <figure>
      <div className="jv-card overflow-hidden">
        <div className="jv-bloom grid aspect-square place-items-center border-b border-line">
          <Logo className="h-24 w-auto text-brand sm:h-28" />
        </div>
        <figcaption className="px-6 py-5">
          <p className="font-semibold text-ink">{SOBRE.retrato.pie[idioma]}</p>
          <p className="mt-1 font-mono text-xs leading-relaxed text-ink-muted">
            {SOBRE.retrato.nota[idioma]}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}
