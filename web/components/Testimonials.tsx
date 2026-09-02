import { Quote, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { TESTIMONIALS, initialsOf } from "@/lib/testimonials";

/**
 * Prueba social. Se renderiza SOLO si hay testimonios de verdad: una sección
 * de testimonios vacía, o con frases genéricas de relleno, hace más daño que
 * no tenerla — el lector reconoce el relleno y deja de creer el resto.
 *
 * Sin datos estructurados de reseña a propósito: Google no muestra estrellas
 * cuando la empresa reseñada controla las reseñas en su propio sitio. Ver la
 * explicación larga en `lib/testimonials.ts`.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  // Con una sola recomendación, una rejilla de tres columnas la deja huérfana.
  const cols =
    TESTIMONIALS.length === 1
      ? "max-w-2xl"
      : TESTIMONIALS.length === 2
        ? "md:grid-cols-2 max-w-4xl"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="testimonios" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <Badge>Lo que dicen</Badge>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
              No lo decimos nosotros.
              <br />
              <span className="text-metal">Lo dicen ellos.</span>
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
              Recomendaciones públicas de gente con la que he trabajado, escritas en sus perfiles
              de LinkedIn. Están enlazadas para que cualquiera las verifique.
            </p>
          </div>
        </Reveal>

        <div className={`mt-14 grid gap-5 ${cols}`}>
          {TESTIMONIALS.map((t, i) => {
            const Card = t.url ? "a" : "article";
            return (
              <Reveal key={t.author + i} delay={i * 90}>
                <Card
                  {...(t.url
                    ? { href: t.url, target: "_blank", rel: "noopener noreferrer nofollow" }
                    : {})}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
                >
                  <Quote className="h-7 w-7 shrink-0 text-accent/50" aria-hidden="true" />

                  <blockquote
                    className="mt-5 flex-1 font-body leading-relaxed text-ink-soft"
                    {...(t.original ? { cite: t.url } : {})}
                  >
                    “{t.quote}”
                  </blockquote>

                  {/* Si venia en otro idioma se dice, y el original queda a la
                      mano: la traduccion sirve al lector, el original es la
                      prueba y no se esconde. */}
                  {t.original && (
                    <details className="mt-3">
                      <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-[.12em] text-ink-soft transition-colors hover:text-ink">
                        Traducida del inglés · ver original
                      </summary>
                      <p className="mt-2 font-body text-sm italic leading-relaxed text-ink-soft/80">
                        “{t.original}”
                      </p>
                    </details>
                  )}

                  <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm text-surface"
                    >
                      {initialsOf(t)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <cite className="block font-body font-semibold not-italic text-ink">
                        {t.author}
                      </cite>
                      <span className="block font-body text-sm leading-snug text-ink-soft">
                        {t.role}
                      </span>
                    </span>
                    {/* De dónde salió. Sin la fuente, un testimonio es una frase
                        que se pudo escribir solo: decir "vía LinkedIn" y enlazar
                        al perfil es lo que lo vuelve verificable. */}
                    <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[.12em] text-ink-soft">
                      {t.source}
                      {t.url && (
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
