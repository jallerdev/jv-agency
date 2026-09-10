"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { TESTIMONIALS, initialsOf } from "@/lib/testimonials";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { cn } from "@/lib/utils";

const COPY = {
  eyebrow: { es: "Lo que dicen", en: "What they say" },
  titulo: {
    es: "No lo digo yo. Lo dicen ellos.",
    en: "It's not me saying it. It's them.",
  },
  acento: { es: "Lo dicen ellos.", en: "It's them." },
  entradilla: {
    es: "Recomendaciones públicas de LinkedIn, escritas por gente con la que trabajé. Cada una enlaza a su perfil: no hay que creerme, hay que comprobarlo.",
    en: "Public LinkedIn recommendations, written by people I worked with. Each one links to their profile: don't take my word for it, check it.",
  },
  verOriginal: { es: "Ver original en inglés", en: "Show Spanish translation" },
  verTraducida: { es: "Ver traducción", en: "Show original" },
  traducida: { es: "Traducida del inglés", en: "Translated from English" },
  verificar: { es: "Verificar en LinkedIn", en: "Verify on LinkedIn" },
} as const;

/**
 * Las recomendaciones.
 *
 * DOS TARJETAS ANCHAS, no una rejilla de seis. Hay dos recomendaciones reales;
 * meterlas en una rejilla pensada para seis deja cuatro huecos, y un hueco en
 * una rejilla de testimonios se lee como «no tiene más».
 *
 * SIN ESTRELLAS Y SIN NOTA MEDIA. No hay reseñas de Google, así que no hay
 * promedio que mostrar. Inventar cinco estrellas aquí sería exactamente el
 * tipo de afirmación que el sitio lleva meses quitando —y además `AggregateRating`
 * sobre reseñas propias es de las cosas que Google penaliza.
 *
 * EL BOTÓN DE ORIGINAL importa más de lo que parece: las dos están escritas en
 * inglés y lo que se lee arriba es una traducción. Sin poder ver el original,
 * el lector tiene que confiar en que la traducción es fiel —y el argumento de
 * esta sección es justamente que no hace falta confiar.
 */
export function Testimonios({ idioma }: { idioma: Idioma }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Seccion id="testimonios">
      <EncabezadoSeccion
        contenido={{
          eyebrow: COPY.eyebrow,
          titulo: COPY.titulo,
          acento: COPY.acento,
          entradilla: COPY.entradilla,
        }}
        idioma={idioma}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <Tarjeta key={t.author} t={t} idioma={idioma} />
        ))}
      </div>
    </Seccion>
  );
}

function Tarjeta({
  t,
  idioma,
}: {
  t: (typeof TESTIMONIALS)[number];
  idioma: Idioma;
}) {
  const [original, setOriginal] = useState(false);
  const hayOriginal = Boolean(t.original);

  /* En inglés, la cita «traducida» es el original: no hay nada que traducir. */
  const texto = idioma === "en" && t.original ? t.original : original && t.original ? t.original : t.quote;
  const mostrandoOriginal = texto === t.original;

  return (
    <figure className="jv-card flex flex-col p-8">
      <blockquote className="flex-1 text-pretty text-lg leading-relaxed text-ink-soft">
        “{texto}”
      </blockquote>

      {hayOriginal && idioma === "es" && (
        <button
          type="button"
          onClick={() => setOriginal((v) => !v)}
          className="tap-target mt-5 inline-flex w-fit items-center gap-2 self-start rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps hover:border-brand hover:text-brand"
          aria-pressed={mostrandoOriginal}
        >
          {mostrandoOriginal ? COPY.verTraducida[idioma] : COPY.verOriginal[idioma]}
        </button>
      )}

      <figcaption className="jv-rule mt-8 flex items-center gap-4 pt-6">
        {/* Iniciales sobre naranja al 12%: no hay foto de estas personas y
            ponerles una de banco sería atribuirles una cara que no es suya. */}
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-quiet font-mono text-sm text-brand"
        >
          {initialsOf(t)}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink">{t.author}</p>
          <p className="truncate text-sm text-ink-muted">{t.role}</p>
        </div>

        {t.url && (
          <a
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "tap-target inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2",
              "font-mono text-xs uppercase tracking-[0.12em] text-ink-muted",
              "transition-colors duration-base ease-ps hover:border-brand hover:text-brand"
            )}
          >
            {COPY.verificar[idioma]}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
