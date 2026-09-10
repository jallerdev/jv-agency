import { ChevronDown, ArrowUpRight } from "lucide-react";

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
 *
 * La tarjeta ya NO es un enlace entero. Lo era, y dentro llevaba el <details>
 * del original: abrir el original disparaba la navegación a LinkedIn, y un
 * control interactivo dentro de un enlace no es marcado válido. Ahora la
 * tarjeta es un documento y la verificación es un enlace con nombre propio,
 * que además dice a dónde lleva.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  // Con una sola recomendación, una rejilla de tres columnas la deja huérfana.
  const cols =
    TESTIMONIALS.length === 1
      ? "max-w-2xl"
      : TESTIMONIALS.length === 2
        ? "md:grid-cols-2 max-w-5xl"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    /* Fondo propio: es el respiro tonal entre el papel de Quién está detrás y
       el papel del FAQ. Sin él, la sección era la séptima banda crema seguida. */
    <section
      id="testimonios"
      /* Sin tono ni filetes propios: esta seccion vive DENTRO de una banda
         —comparte capitulo con «quien esta detras»— y la banda ya pone el
         tono. Cuando traia los suyos se apilaban dos tintes y aparecia una
         linea a media banda, justo donde el padding superior es cero. */
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal distance="lg">
          <div className="max-w-2xl">
            <Badge>Lo que dicen</Badge>
            <h2 className="mt-6 font-display text-3xl/[1.15] text-balance text-ink sm:text-[2.5rem]/[1.1]">
              No lo digo yo.{" "}
              <span className="text-primary-dark">Lo dicen ellos.</span>
            </h2>
            <p className="mt-5 max-w-[48ch] font-body text-lg leading-relaxed text-ink-soft">
              Recomendaciones públicas de gente con la que he trabajado, escritas en sus perfiles
              de LinkedIn. Están enlazadas para que cualquiera las verifique.
            </p>
          </div>
        </Reveal>

        <div className={`mt-14 grid items-start gap-5 ${cols}`}>
          {TESTIMONIALS.map((t, i) => {
            /* Una recomendación corta al lado de una larga deja media tarjeta
               vacía. En vez de estirar el hueco, la corta se compone más
               grande: el texto llena la caja y de paso se lee como destacado,
               que es lo que hace un editor con una cita breve y buena. */
            const short = t.quote.length < 420;
            return (
            <Reveal key={t.author + i} index={i}>
              <article className="relative flex flex-col jv-card p-6 shadow-soft sm:p-8">
                {/* La comilla es tipográfica, no un icono de librería: es el
                    mismo serif del sitio a tamaño de titular. Como abre la
                    cita, el texto ya no lleva comillas en línea. */}
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[3.5rem] leading-[0.5] text-accent/40"
                >
                  &ldquo;
                </span>

                <blockquote
                  className={`mt-6 font-body text-ink ${
                    short ? "leading-[1.75] lg:text-[1.15rem] lg:leading-[1.6]" : "leading-[1.75]"
                  }`}
                  {...(t.url ? { cite: t.url } : {})}
                >
                  {t.quote}
                </blockquote>

                {/* Si venía en otro idioma se dice, y el original queda a la
                    mano: la traducción sirve al lector, el original es la
                    prueba y no se esconde. */}
                {t.original && (
                  <details className="group/og mt-5">
                    <summary className="tap-target -ml-2 inline-flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 jv-eyebrow text-ink-soft underline decoration-line decoration-dotted underline-offset-4 transition-surface duration-quick ease-state hover:text-primary-dark hover:decoration-primary/50 [&::-webkit-details-marker]:hidden">
                      <ChevronDown
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-base ease-state group-open/og:rotate-180"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Traducida del inglés · ver original
                    </summary>
                    <blockquote
                      lang={t.originalLang}
                      {...(t.url ? { cite: t.url } : {})}
                      className="mt-3 whitespace-pre-line border-l-2 border-white/50 pl-4 font-body text-sm italic leading-relaxed text-ink-soft"
                    >
                      {t.original}
                    </blockquote>
                  </details>
                )}

                <footer className="pt-7">
                  <div className="flex items-center gap-3 jv-rule pt-5">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-dark font-display text-sm tracking-wide text-on-accent ring-1 ring-inset ring-line"
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
                  </div>

                  {/* De dónde salió. Sin la fuente, un testimonio es una frase
                      que se pudo escribir solo: decir de dónde viene y enlazar
                      al perfil es lo que lo vuelve verificable. El enlace dice
                      a dónde lleva, en vez de una flecha suelta al 40%. */}
                  {t.url ? (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="tap-target group/src mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-background/60 px-4 jv-eyebrow text-primary-dark transition-surface duration-quick ease-state hover:border-primary/40 hover:bg-primary/10"
                    >
                      Verificar en {t.source}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-base ease-state group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="mt-4 jv-eyebrow text-ink-soft">
                      Vía {t.source}
                    </p>
                  )}
                </footer>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
