"use client";

import { useState } from "react";
import Link from "next/link";

import { PortadaArticulo, type TramaPortada } from "@/components/kit/PortadaArticulo";
import { cn } from "@/lib/utils";

/**
 * LOS FILTROS DEL ÍNDICE DEL BLOG
 * ─────────────────────────────────────────────────────────────────────────
 * Cuatro pastillas con su conteo —Todos · Precios · Decisión · Guías— y la
 * rejilla debajo.
 *
 * NADA SE DESMONTA AL FILTRAR, y esa es la decisión de fondo. Los once
 * artículos están en el HTML del servidor y siguen en el DOM con el filtro
 * puesto: solo se ocultan con `hidden`. Un filtro que borra enlaces del
 * documento le esconde diez de once artículos a cualquiera que lea la página
 * sin pulsar nada —incluido Google—, y este blog existe para que lo
 * encuentren.
 *
 * LA ANIMACIÓN LA DA EL `key` DE LA LISTA. Al cambiar el filtro, React vuelve
 * a crear los elementos y la entrada escalonada arranca de nuevo. Es el único
 * sitio del sitio donde remontar es deliberado: aquí el remonte ES el gesto.
 *
 * SIN JAVASCRIPT se ven los once, que es el estado correcto: se pierde el
 * filtro, no el contenido.
 */

export type ArticuloVista = {
  slug: string;
  href: string;
  titulo: string;
  entradilla: string;
  categoria: string;
  trama: TramaPortada;
  cifra: string;
  fecha: string;
  fechaISO: string;
  minutos: string;
};

export function FiltroBlog({
  articulos,
  todos,
  recuento,
  className,
}: {
  articulos: readonly ArticuloVista[];
  /** Cómo se llama la pastilla que no filtra nada. */
  todos: string;
  /* CÓMO SE DICE «N ARTÍCULOS», EN DOS CADENAS Y NO EN UNA FUNCIÓN. Esto es
     un componente de cliente y `BlogIndice` es de servidor: pasarle una
     función revienta el build con «Functions cannot be passed directly to
     Client Components». El plural lleva `{n}` y se sustituye aquí. */
  recuento: { uno: string; varios: string };
  className?: string;
}) {
  const [filtro, setFiltro] = useState<string | null>(null);

  /* Las categorías, en el orden en que aparecen y con su conteo. Calculadas y
     no escritas: una categoría nueva en `lib/blog.ts` sale aquí sola. */
  const categorias = articulos.reduce<{ nombre: string; total: number }[]>((acc, a) => {
    const ya = acc.find((c) => c.nombre === a.categoria);
    if (ya) ya.total += 1;
    else acc.push({ nombre: a.categoria, total: 1 });
    return acc;
  }, []);

  return (
    <div className={cn("", className)}>
      <ul className="flex flex-wrap gap-2" role="list">
        {[{ nombre: todos, total: articulos.length }, ...categorias].map((c, i) => {
          const clave = i === 0 ? null : c.nombre;
          const activa = filtro === clave;
          return (
            <li key={c.nombre}>
              <button
                type="button"
                onClick={() => setFiltro(clave)}
                aria-pressed={activa}
                className={cn(
                  "jv-chip min-h-11 gap-2 text-sm transition-surface duration-base ease-ps",
                  activa
                    ? "border-brand bg-brand text-on-accent"
                    : "jv-chip-off hover:border-brand hover:text-brand",
                )}
              >
                {c.nombre}
                {/* El conteo de la pastilla activa va en tinta PLENA. Al 70 %
                    sobre el naranja daban 4,02:1 a 12 px, por debajo de AA, y
                    lo cazó el barrido. La jerarquía la da el tamaño y la
                    familia mono, que no cuestan contraste. */}
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    activa ? "text-on-accent" : "text-ink-muted",
                  )}
                >
                  {c.total}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* EL RECUENTO, EN VOZ ALTA. Pulsar una pastilla cambia lo que hay en la
          rejilla y, con lector de pantalla, no cambia nada: el botón anuncia su
          propio estado —«Precios, pulsado»— y ahí se acaba el aviso. Quien no
          ve la rejilla no sabe si quedaron cuatro artículos o ninguno.

          `polite` y no `assertive`: es el resultado de una acción que se acaba
          de hacer a propósito, no una alerta. Va en `sr-only` porque en
          pantalla el resultado ya se ve —son las tarjetas—, y repetirlo en
          tinta sería ruido para quien sí las ve. */}
      <p aria-live="polite" className="sr-only">
        {(() => {
          const n = articulos.filter((a) => !filtro || a.categoria === filtro).length;
          return n === 1 ? recuento.uno : recuento.varios.replace("{n}", String(n));
        })()}
      </p>

      <ul key={filtro ?? "todos"} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articulos.map((a, i) => {
          const visible = !filtro || a.categoria === filtro;
          return (
            <li
              key={a.slug}
              hidden={!visible}
              className="jv-articulo"
              style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}
            >
              <Link
                href={a.href}
                className="jv-card jv-card-int jv-lift group flex h-full flex-col overflow-hidden"
              >
                <PortadaArticulo cifra={a.cifra} categoria={a.categoria} trama={a.trama} />

                <span className="flex flex-1 flex-col p-6">
                  <span className="jv-titulo jv-subrayado">{a.titulo}</span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {a.entradilla}
                  </span>
                  <span className="jv-rule mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 font-mono text-xs text-ink-muted">
                    <time dateTime={a.fechaISO}>{a.fecha}</time>
                    <span>{a.minutos}</span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
