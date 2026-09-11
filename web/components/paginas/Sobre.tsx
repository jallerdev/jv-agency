import { Github, Linkedin, ArrowUpRight } from "lucide-react";

import { SOBRE } from "@/content/paginas/sobre";
import type { Idioma } from "@/content/types";
import { enlaceReal } from "@/lib/rutas";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BarraMovil } from "@/components/BarraMovil";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotonCuentame } from "@/components/Cuentame";

/**
 * QUIÉN ESTÁ DETRÁS, EN LOS DOS IDIOMAS
 * ──────────────────────────────────────────────────────────────────────────
 * Un componente para `/sobre-nosotros` y `/en/about`.
 *
 * El `@id` de la persona es el MISMO que usa la portada. Si cada página
 * declarara su propia Person, Google vería tres Luis Jaller distintos y la
 * experiencia demostrable —que es justo lo que esta página existe para
 * probar— quedaría repartida entre tres entidades sin peso ninguna.
 */
export function PaginaSobre({
  idioma,
  ruta,
}: {
  idioma: Idioma;
  ruta: string;
}) {
  const f = SOBRE.fundador;
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
            <Badge>{SOBRE.badge[idioma]}</Badge>
            <h1 className="mt-6 text-[length:var(--text-hero)]">
              {SOBRE.titulo[idioma]}{" "}
              <span className="text-brand">{SOBRE.tituloAcento[idioma]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {SOBRE.entradilla[idioma]}
            </p>
          </Reveal>
        </section>

        {/* ── Cifras ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-10 md:px-12">
          <Reveal>
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {SOBRE.cifras.map((c) => (
                <div key={c.valor} className="jv-card p-6 text-center">
                  <dd className="font-display text-3xl tabular-nums text-brand md:text-4xl">
                    {c.valor}
                  </dd>
                  <dt className="mt-2 text-sm text-ink-soft">{c.etiqueta[idioma]}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ── El fundador ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:px-12">
          <Reveal>
            <div className="jv-card grid grid-cols-1 gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
              {/* El monograma, no una foto de banco: no hay foto real de esta
                  persona y poner una de archivo sería atribuirle una cara que
                  no es la suya. */}
              <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border border-line bg-raised">
                <Logo className="h-16 w-auto text-ink" />
              </div>
              <div>
                <h2 className="text-[length:var(--text-display)]">{f.nombre}</h2>
                <p className="jv-eyebrow mt-1 text-accent-ink">{f.rol[idioma]}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{f.bio[idioma]}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" strokeWidth={2} /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={f.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" strokeWidth={2} /> GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={f.portafolio} target="_blank" rel="noopener noreferrer">
                      {f.verPortafolio[idioma]}{" "}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Cómo trabajo ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-[length:var(--text-display)]">{SOBRE.enfoqueTitulo[idioma]}</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SOBRE.enfoque.map((e, i) => (
              <Reveal key={e.titulo.es} delay={i * 100}>
                <article className="jv-card jv-card-int h-full p-7">
                  <span className="font-mono text-sm tabular-nums text-brand">0{i + 1}</span>
                  <h3 className="jv-titulo mt-3">{e.titulo[idioma]}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{e.cuerpo[idioma]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Qué domino ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-[length:var(--text-display)]">{SOBRE.stackTitulo[idioma]}</h2>
            <p className="mt-4 text-ink-soft">{SOBRE.stackEntradilla[idioma]}</p>
          </Reveal>
          {/* Dos bloques y no uno: lo que se cotiza arriba, lo que es
              experiencia abajo y dicho como tal. Es el arreglo de la
              contradicción con la página de software. */}
          <h3 className="jv-eyebrow mt-10 text-ink">{SOBRE.stackSubtituloEncargo[idioma]}</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOBRE.stack
              .filter((s) => s.encargo)
              .map((s) => (
                <div key={s.grupo.es} className="jv-card p-6">
                  <h4 className="jv-eyebrow text-ink">{s.grupo[idioma]}</h4>
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

          <h3 className="jv-eyebrow mt-12 text-ink">{SOBRE.stackSubtituloTambien[idioma]}</h3>
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
            {SOBRE.stackNotaTambien[idioma]}
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOBRE.stack
              .filter((s) => !s.encargo)
              .map((s) => (
                <div key={s.grupo.es} className="jv-card border-dashed p-6">
                  <h4 className="jv-eyebrow text-ink-soft">{s.grupo[idioma]}</h4>
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
        </section>

        {/* ── Algunos proyectos ───────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-[length:var(--text-display)]">{SOBRE.proyectosTitulo[idioma]}</h2>
            <p className="mt-4 text-ink-soft">{SOBRE.proyectosEntradilla[idioma]}</p>
            {/* Los sectores del NDA ya están confirmados, así que esto pasa de
                marcador a texto publicado. Dice el sector y calla el cliente,
                que es lo que un acuerdo de confidencialidad permite. */}
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {SOBRE.proyectosSectores[idioma]}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOBRE.proyectos.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 100}>
                <article className="jv-card jv-card-int h-full p-7">
                  <span className="jv-chip jv-chip-off text-xs">{p.etiqueta[idioma]}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {p.nombre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.cuerpo[idioma]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Cierre ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center md:px-12">
          <Reveal>
            <h2 className="text-[length:var(--text-display)]">{SOBRE.cierre.titulo[idioma]}</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">{SOBRE.cierre.cuerpo[idioma]}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href={enlaceReal(SOBRE.cierre.href[idioma])}>{SOBRE.cierre.cta[idioma]}</a>
              </Button>
              <BotonCuentame />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton idioma={idioma} />
      <BarraMovil idioma={idioma} />
    </>
  );
}
