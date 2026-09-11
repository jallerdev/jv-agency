"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { ArbolDecision, type NodoArbol } from "@/components/visuales/ArbolDecision";
import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * EL SELECTOR ABRE LA SECCIÓN DEL PRECIO, Y LA REJILLA LE CONTESTA
 * ──────────────────────────────────────────────────────────────────────────
 * Antes eran dos piezas que no se hablaban: el árbol decía «te sirve una
 * landing» y debajo aparecían tres tarjetas iguales para que el visitante
 * buscara a ojo cuál era la suya. Ahora el árbol manda: al llegar a un
 * resultado, su tarjeta se destaca y las otras se atenúan.
 *
 * QUÉ PASA SIN JAVASCRIPT, que es como llega Google y como se ve el primer
 * frame: las tres tarjetas salen enteras y sin atenuar. La atenuación es una
 * ayuda para elegir, nunca la única forma de leer el contenido; ninguna
 * tarjeta se esconde ni se carga al hacer clic.
 *
 * LO ATENUADO NO SE SACA DEL ORDEN DE TABULACIÓN. Una tarjeta al 55 % sigue
 * siendo legible —el contraste se mide contra eso— y sigue siendo enfocable:
 * quien navega con teclado no ha contestado necesariamente la pregunta.
 *
 * LA CUARTA TARJETA. Con «Sí, quiero vender» el resultado honesto es que esto
 * no es una página web: entonces la rejilla añade la tarjeta que lleva a
 * tiendas virtuales, en vez de dejar tres formatos que no le sirven.
 */

export type Formato = {
  clave: string;
  nombre: string;
  tambien: string;
  paginas: readonly string[];
  incluye: readonly string[];
  /** «desde $850.000» o «según lo que haya hoy». Ya formateado. */
  pie: string;
};

export type SalidaTienda = {
  clave: string;
  nombre: string;
  cuerpo: string;
  pie: string;
  enlace: { texto: string; href: string };
};

const T = {
  es: { tuya: "La que te salió", quePaginas: "Qué páginas trae", ademas: "Además de lo de siempre" },
  en: { tuya: "Your match", quePaginas: "Which pages it comes with", ademas: "On top of the usual" },
} as const;

export function SelectorFormato({
  raiz,
  formatos,
  tienda,
  idioma,
  className,
}: {
  raiz: NodoArbol;
  formatos: readonly Formato[];
  /** La salida honesta hacia tiendas virtuales. */
  tienda: SalidaTienda;
  idioma: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const [elegida, setElegida] = useState<string | null>(null);

  /* `useCallback` no es adorno: el árbol avisa desde un efecto, y una función
     nueva en cada render lo volvería a disparar en cada render. */
  const alResultado = useCallback((clave: string | null) => setElegida(clave), []);

  const hayEleccion = elegida !== null;
  const esTienda = elegida === tienda.clave;

  return (
    <div className={className}>
      {/* El árbol no se estira a los 1.184 px de la sección: son dos botones y
          una pregunta corta, y a ancho completo se leen como dos pancartas. */}
      <ArbolDecision
        raiz={raiz}
        idioma={idioma}
        onResultado={alResultado}
        className="max-w-3xl"
      />

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {formatos.map((f) => {
          const suya = elegida === f.clave;
          return (
            <article
              key={f.clave}
              aria-current={suya ? "true" : undefined}
              className={cn(
                "jv-card jv-card-int flex h-full flex-col p-7 transition-[opacity,border-color,transform] duration-base ease-ps",
                suya && "border-brand",
                hayEleccion && !suya && "opacity-55",
              )}
            >
              {/* El rótulo ocupa sitio siempre, esté o no: sin esto, la
                  tarjeta elegida crece 28 px y empuja a las otras dos. */}
              <p
                className={cn(
                  "jv-eyebrow text-brand transition-opacity duration-base ease-ps",
                  !suya && "opacity-0",
                )}
                aria-hidden={!suya}
              >
                {t.tuya}
              </p>

              <h3 className="jv-titulo mt-3">{f.nombre}</h3>
              <p className="jv-eyebrow-frase mt-1 text-ink-soft">{f.tambien}</p>

              <p className="mt-5 text-sm font-semibold text-ink">{t.quePaginas}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {f.paginas.map((p) => (
                  <li key={p} className="jv-chip jv-chip-off text-xs">
                    {p}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm font-semibold text-ink">{t.ademas}</p>
              <ul className="mt-2 grid flex-1 gap-2">
                {f.incluye.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <p className="jv-rule mt-5 pt-4 font-mono text-lg text-brand">{f.pie}</p>
            </article>
          );
        })}
      </div>

      {esTienda && (
        <article className="jv-card jv-card-int mt-5 border-brand p-7">
          <p className="jv-eyebrow text-brand">{t.tuya}</p>
          <h3 className="jv-titulo mt-3">{tienda.nombre}</h3>
          <p className="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">{tienda.cuerpo}</p>
          <p className="mt-4 font-mono text-lg text-brand">{tienda.pie}</p>
          <Link
            href={tienda.enlace.href}
            className="jv-enlace mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand"
          >
            {tienda.enlace.texto}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </article>
      )}
    </div>
  );
}
