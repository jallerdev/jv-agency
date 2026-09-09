"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* Motor de entrada del sitio. Los estilos viven en app/globals.css (bloque
   "MOTOR DE ENTRADA"); aquí solo se decide cuándo se enciende.

   Reglas del sistema:
   - Una sola curva de entrada (--ease-entrance) y una sola duración
     (--duration-ambient). No se pasan a mano.
   - El escalonado es siempre el mismo (--reveal-stagger, 70ms) y se detiene
     en el cuarto elemento: 0 / 70 / 140 / 210 y ahí queda. Una rejilla de
     siete tarjetas no puede tardar medio segundo en terminar de entrar.
   - Con prefers-reduced-motion el contenido aparece de una, visible y sin
     transición. Nunca invisible, nunca en pop-in escalonado. */

export type RevealVariant =
  | "rise"        /* sube: el gesto por defecto */
  | "fade"        /* solo aparece: para lo que ya está donde debe estar */
  | "scale"       /* crece un punto: piezas con peso (una captura, un marco) */
  | "left"        /* entra desde la izquierda */
  | "right"       /* entra desde la derecha */
  | "rise-scale"; /* sube y crece: reservado para el momento principal */

/** sm 8px (badges, texto en línea) · md 16px (párrafos, tarjetas) · lg 28px (bloques de sección) */
export type RevealDistance = "sm" | "md" | "lg";

const RISE: Record<RevealDistance, string> = {
  sm: "var(--rise-sm)",
  md: "var(--rise-md)",
  lg: "var(--rise-lg)",
};

const DEFAULT_STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 3;

type RevealProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
> & {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Retardo manual en ms. Se suma a lo que aporte `index`. */
  delay?: number;
  /** Etiqueta a renderizar. Por defecto div. */
  as?: keyof React.JSX.IntrinsicElements;
  /** De dónde entra. Por defecto sube. */
  variant?: RevealVariant;
  /** Cuánto se desplaza. Por defecto md (16px). */
  distance?: RevealDistance;
  /** Posición dentro de un .map(): el retardo se calcula solo y se topa al cuarto. */
  index?: number;
  /**
   * Escalona los hijos DIRECTOS en vez de animar este contenedor.
   * `true` usa los 70ms del sistema; un número los sustituye.
   */
  stagger?: boolean | number;
  /** Duración en ms. Solo para casos raros: lo normal es no tocarla. */
  duration?: number;
  /** Cuánto tiene que asomar para disparar (0-1). Por defecto 0: basta con que entre. */
  amount?: number;
  /** Margen del observador. Por defecto dispara un poco antes de llegar al borde. */
  rootMargin?: string;
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
  distance,
  index,
  stagger,
  duration,
  amount = 0,
  rootMargin = "0px 0px -12% 0px",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Con movimiento reducido, o si el navegador no trae IntersectionObserver,
       no se espera a nada: el contenido se marca visible en el primer efecto.
       El CSS ya se encarga de que además no haya transición. */
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  const step = typeof stagger === "number" ? stagger : DEFAULT_STAGGER_MS;
  const indexDelay =
    typeof index === "number" ? Math.min(Math.max(index, 0), MAX_STAGGER_STEPS) * step : 0;
  const totalDelay = delay + indexDelay;

  const vars: React.CSSProperties & Record<string, string | number> = {
    "--reveal-delay": `${totalDelay}ms`,
    transitionDelay: `${totalDelay}ms`,
  };
  if (distance) vars["--reveal-rise"] = RISE[distance];
  if (typeof duration === "number") vars["--reveal-duration"] = `${duration}ms`;
  if (typeof stagger === "number") vars["--reveal-stagger"] = `${stagger}ms`;

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      data-reveal={variant}
      data-reveal-stagger={stagger ? "" : undefined}
      style={{ ...vars, ...style }}
      className={cn("reveal", visible && "is-visible", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
