"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * EL ÍNDICE DE UN ARTÍCULO, CONSTRUIDO DESDE EL PROPIO ARTÍCULO
 * ─────────────────────────────────────────────────────────────────────────
 * Once artículos escritos a mano, cada uno con sus seis o siete `<h2>` y
 * ninguno con `id`. Escribir el índice a mano en cada archivo habría sido
 * once listas que se desincronizan en cuanto alguien renombre un apartado —y
 * el primero en desincronizarse habría sido el de precios, que se reescribe
 * cada vez que se mueve una cifra—.
 *
 * Así que el índice se LEE del artículo: al montar, recorre los `h2` del
 * cuerpo, les pone un `id` estable si no lo traen y arma la lista. Un apartado
 * nuevo aparece aquí sin tocar nada.
 *
 * EL SEGUIMIENTO se queda con el apartado visible que esté MÁS ARRIBA, no con
 * el último que disparó el observador: al bajar rápido entran varios a la vez
 * y el último suele ser el de abajo del todo, que no es donde está mirando
 * nadie. Es el mismo criterio que el índice de las páginas de servicio.
 *
 * SIN JAVASCRIPT NO HAY ÍNDICE, y es aceptable: es una ayuda de navegación,
 * no contenido. El artículo entero está en el HTML del servidor con o sin él.
 */

type Entrada = { id: string; texto: string };

/** `Cómo se hace` → `como-se-hace`. Estable entre visitas y entre idiomas. */
function aId(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function IndiceArticulo({
  selector,
  titulo,
  className,
}: {
  /** Dónde están los `h2`. Un selector y no una referencia: el cuerpo lo
   *  pinta el servidor y este componente vive fuera de él. */
  selector: string;
  titulo: string;
  className?: string;
}) {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const cuerpo = document.querySelector(selector);
    if (!cuerpo) return;

    const titulares = [...cuerpo.querySelectorAll<HTMLHeadingElement>("h2")];
    const lista = titulares.map((h) => {
      const texto = h.textContent?.trim() ?? "";
      if (!h.id) h.id = aId(texto);
      /* Sitio para la cabecera fija cuando se salta con un ancla. */
      h.style.scrollMarginTop = "7rem";
      return { id: h.id, texto };
    });
    setEntradas(lista);
    if (lista.length === 0) return;

    const obs = new IntersectionObserver(
      () => {
        const visible = titulares.find((h) => {
          const r = h.getBoundingClientRect();
          return r.bottom > 120 && r.top < window.innerHeight * 0.5;
        });
        if (visible) setActiva(visible.id);
      },
      { rootMargin: "-120px 0px -50% 0px", threshold: [0, 1] },
    );
    titulares.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [selector]);

  if (entradas.length < 3) return null;

  return (
    <nav aria-labelledby="jv-indice-articulo" className={cn("", className)}>
      <p id="jv-indice-articulo" className="jv-eyebrow text-ink-muted">
        {titulo}
      </p>
      {/* SIN CARRIL AL COSTADO. Un filete vertical con los renglones pegados
          es otro de los patrones marcados —y el detector lo cazó como
          `cramped-padding`—. La entrada activa se distingue por lo que
          importa: tinta plena, negrita y un punto de marca delante. */}
      <ul className="mt-4 flex flex-col gap-1">
        {entradas.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              aria-current={activa === e.id ? "true" : undefined}
              className={cn(
                "flex gap-2.5 py-1.5 text-sm leading-snug transition-colors duration-base ease-ps",
                activa === e.id ? "font-semibold text-ink" : "text-ink-soft hover:text-ink",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  /* `text-on-accent` en un punto de 4 px sin texto: declara la
                     tinta que le tocaría a cualquier cosa que cayera dentro de
                     un relleno de marca. Es la regla que dejó el arreglo de las
                     cotizaciones —contenedor de acento, tinta propia— y vale
                     igual para los decorativos: así la hoja dice la verdad. */
                  "mt-[0.45em] h-1 w-1 shrink-0 rounded-full text-on-accent transition-colors duration-base ease-ps",
                  activa === e.id ? "bg-brand" : "bg-line-strong",
                )}
              />
              {e.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
