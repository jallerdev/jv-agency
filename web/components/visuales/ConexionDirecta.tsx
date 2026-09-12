"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * CÓMO LLEGA TU NÚMERO A META
 * ─────────────────────────────────────────────────────────────────────────
 * El diferenciador de esta página —«casi todos te revenden una plataforma; yo
 * conecto directo»— se explicaba en dos párrafos, y un intermediario es
 * justamente la clase de cosa que se entiende de un vistazo si se dibuja: tu
 * número, una caja en el medio, Meta. Frente a: tu número, Meta.
 *
 * LO QUE SE ANIMA ES LO QUE SE ARGUMENTA, y solo eso: al entrar en vista, el
 * nodo del tercero se tacha y la línea directa se dibuja de izquierda a
 * derecha. No hay más movimiento en la pieza.
 *
 * `IntersectionObserver` Y NO UNA ANIMACIÓN AL MONTAR: si empieza con la
 * página, cuando el visitante llegue hasta aquí ya habrá terminado y lo único
 * que verá es el estado final. Una animación que nadie ve es peso muerto.
 *
 * CON MOVIMIENTO REDUCIDO NO SE ANIMA NADA y el estado final está puesto desde
 * el principio: el tercero tachado y la línea entera. El dibujo dice lo mismo
 * quieto; es lo que tiene dibujar el argumento en vez de decorarlo.
 */

export function ConexionDirecta({
  titulo,
  tuNumero,
  tercero,
  meta,
  comun,
  propio,
  corte,
  directo,
  className,
}: {
  titulo: string;
  tuNumero: string;
  tercero: string;
  meta: string;
  comun: string;
  propio: string;
  corte: string;
  directo: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, []);

  const nodo = "flex min-h-11 items-center justify-center rounded-lg border px-4 py-2 text-sm";

  return (
    <div ref={caja} data-visible={visible} className={cn("group/conexion", className)}>
      <p className="jv-eyebrow text-ink-muted">{titulo}</p>

      <div className="mt-5 grid gap-5">
        {/* Fila 1 · con intermediario */}
        <div>
          <p className="jv-eyebrow text-ink-muted">{comun}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <span className={cn(nodo, "border-line text-ink-soft")}>{tuNumero}</span>
            <span aria-hidden="true" className="font-mono text-ink-muted">
              →
            </span>
            <span className={cn(nodo, "relative border-dashed border-line text-ink-soft")}>
              {tercero}
              {/* La tachadura. Es un `span` girado y no un `<s>`: no se está
                  corrigiendo un texto, se está cortando un eslabón. */}
              <span
                aria-hidden="true"
                className="jv-corte absolute left-2 right-2 top-1/2 h-px origin-left -translate-y-1/2 bg-brand"
              />
              <X
                aria-hidden="true"
                strokeWidth={2.5}
                className="jv-corte-x absolute -right-2 -top-2 h-4 w-4 rounded-full bg-canvas text-brand"
              />
            </span>
            <span aria-hidden="true" className="font-mono text-ink-muted">
              →
            </span>
            <span className={cn(nodo, "border-line text-ink-soft")}>{meta}</span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{corte}</p>
        </div>

        {/* Fila 2 · directo */}
        <div className="jv-rule pt-5">
          <p className="jv-eyebrow text-brand">{propio}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <span className={cn(nodo, "border-brand bg-brand-quiet text-ink")}>{tuNumero}</span>
            {/* La línea se dibuja: `scaleX` de 0 a 1, que no toca el flujo. */}
            <span aria-hidden="true" className="relative h-px w-16 bg-line">
              <span className="jv-linea absolute inset-0 origin-left bg-brand" />
            </span>
            <span className={cn(nodo, "border-brand bg-brand-quiet text-ink")}>{meta}</span>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-ink">{directo}</p>
        </div>
      </div>
    </div>
  );
}
