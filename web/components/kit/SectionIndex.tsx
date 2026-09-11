"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { Idioma } from "@/content/types";

/**
 * «En esta página»: el índice con seguimiento de scroll.
 *
 * POR QUÉ EXISTE
 * --------------
 * Diseño web tiene catorce secciones y quince preguntas; SEO y software, entre
 * trece y quince. Sin índice no hay forma de saber cuánto queda ni de saltar a
 * «precio», que es a lo que va la mitad de la gente. Solo aparece con SEIS
 * secciones o más: en una página corta, un índice es un estorbo.
 *
 * CÓMO SE COMPORTA
 * ----------------
 * En escritorio grande (≥1280px) es un riel fijo a la izquierda. En todo lo
 * demás es un chip plegable bajo el hero, cerrado por defecto: en un teléfono
 * el índice compite con el contenido y pierde.
 *
 * EL SEGUIMIENTO
 * --------------
 * `IntersectionObserver` con un margen superior que descuenta el encabezado
 * fijo. Se queda con la sección visible que esté MÁS ARRIBA, no con la última
 * que disparó: al bajar rápido entran varias a la vez y la última que dispara
 * suele ser la de abajo del todo, que no es donde está mirando nadie.
 *
 * SIN JAVASCRIPT, SIGUE SIRVIENDO: es una lista de anclas. Lo único que se
 * pierde es el resaltado.
 */

export type Entrada = { id: string; texto: string };

const TITULO: Record<Idioma, string> = { es: "En esta página", en: "On this page" };
const VER: Record<Idioma, string> = { es: "Ver el índice", en: "Show the index" };

/** Menos de esto, el índice estorba más de lo que ayuda. */
const MINIMO = 6;

export function SectionIndex({
  entradas,
  idioma,
  className,
}: {
  entradas: readonly Entrada[];
  idioma: Idioma;
  className?: string;
}) {
  const [activa, setActiva] = useState<string | null>(entradas[0]?.id ?? null);
  const [abierto, setAbierto] = useState(false);
  const visibles = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (entradas.length < MINIMO) return;

    const orden = entradas.map((e) => e.id);
    const nodos = orden
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodos.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibles.current.add(e.target.id);
          else visibles.current.delete(e.target.id);
        }
        /* La visible que esté más arriba en el documento, no la última que
           disparó el observador. */
        const arriba = orden.find((id) => visibles.current.has(id));
        if (arriba) setActiva(arriba);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    nodos.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [entradas]);

  if (entradas.length < MINIMO) return null;

  const lista = (
    <ol className="space-y-1">
      {entradas.map((e) => {
        const es = e.id === activa;
        return (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              aria-current={es ? "true" : undefined}
              onClick={() => setAbierto(false)}
              className={cn(
                "focus-ring block border-l py-1.5 pl-4 text-sm transition-colors duration-base ease-ps",
                es
                  ? "border-brand font-semibold text-ink"
                  : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
              )}
            >
              {e.texto}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Riel fijo: solo donde sobra ancho para que no le quite sitio al texto. */}
      <nav
        aria-label={TITULO[idioma]}
        className={cn(
          "sticky top-[calc(var(--header-h)+2rem)] hidden max-h-[70vh] overflow-y-auto xl:block",
          className,
        )}
      >
        <p className="jv-eyebrow mb-4 text-ink-muted">{TITULO[idioma]}</p>
        {lista}
      </nav>

      {/* Chip plegable: todo lo demás. */}
      <div className={cn("xl:hidden", className)}>
        <button
          type="button"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="jv-chip jv-chip-off min-h-[2.75rem]"
        >
          <span className="jv-eyebrow text-ink-soft">{abierto ? TITULO[idioma] : VER[idioma]}</span>
          <span
            aria-hidden="true"
            className={cn(
              "transition-transform duration-base ease-ps",
              abierto && "rotate-45",
            )}
          >
            +
          </span>
        </button>
        {/* `grid-template-rows` de 0fr a 1fr: se pliega sin animar `height`, y
            el contenido sigue en el DOM aunque esté cerrado. */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-slow ease-ps",
            abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="pt-4">{lista}</div>
          </div>
        </div>
      </div>
    </>
  );
}
