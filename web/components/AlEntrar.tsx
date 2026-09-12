"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * MARCA UN BLOQUE CUANDO ENTRA EN VISTA, Y NADA MÁS.
 * ─────────────────────────────────────────────────────────────────────────
 * Pone `data-visible="true"` la primera vez que el bloque asoma, para que el
 * CSS decida qué hacer con eso. No anima nada por su cuenta: es el gancho, no
 * el efecto.
 *
 * POR QUÉ NO SIRVE `Reveal` AQUÍ: `Reveal` mueve y desvanece el bloque entero,
 * que es lo correcto para un párrafo o una tarjeta. Cuando lo que hay que
 * animar es una PARTE de la pieza —el carril que se dibuja, la línea que se
 * traza— hace falta la señal sin el gesto.
 *
 * Se desconecta al primer disparo: esto marca una vez y se va.
 */
export function AlEntrar({
  children,
  className,
  margen = "-15% 0px -15% 0px",
}: {
  children: React.ReactNode;
  className?: string;
  /** Cuánto hay que entrar en pantalla para contar como visible. */
  margen?: string;
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
      { rootMargin: margen },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [margen]);

  return (
    <div ref={caja} data-visible={visible} className={className}>
      {children}
    </div>
  );
}
