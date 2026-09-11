"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * «ASÍ COMPRA TU CLIENTE» — la pieza firma de /servicios/tiendas-virtuales
 * ──────────────────────────────────────────────────────────────────────────
 * Eran tres tarjetas en fila, cada una con su trozo de pantalla. Tres trozos
 * puestos uno al lado del otro no son una compra: son tres capturas. Ahora es
 * UN SOLO TELÉFONO, quieto a la derecha, y la pantalla cambia según el paso
 * que se esté leyendo. Eso sí se parece a comprar.
 *
 * LA DUDA QUE ESTA PIEZA CONTESTA no es qué trae la tienda: es si de verdad va
 * a cobrar sola un domingo a las once de la noche. Por eso el último paso
 * termina en el aviso de pedido pagado y no en un botón bonito.
 *
 * TODO ES DECORADO Y ESTÁ DECLARADO COMO TAL (`aria-hidden`): los botones son
 * `<span>`, no `<button>`. Un botón de verdad que no hace nada es una trampa
 * para quien navega con teclado. Lo que un lector de pantalla necesita saber
 * va escrito en el texto de cada paso, servido en el HTML.
 *
 * EL PRODUCTO Y LOS PRECIOS SON INVENTADOS y el pie lo dice. No se usan los de
 * Bloomrose: inventar cifras sobre el catálogo de una clienta real sería
 * inventar datos sobre un tercero.
 *
 * En móvil no hay `sticky`: cada paso lleva su pantalla debajo. Con movimiento
 * reducido, cada pantalla nace en su estado final —la M ya tachada, el total ya
 * sumado, el aviso ya puesto— y no se anima nada.
 */

export type PasoCompra = {
  rotulo: string;
  titulo: string;
  cuerpo: string;
  pantalla: string;
};

export type DatosCompra = {
  /** Ficha */
  foto: string;
  producto: string;
  precio: string;
  tallas: readonly { t: string; agotada: boolean }[];
  agotada: string;
  botonFicha: string;
  /** Carrito */
  subtotalEtiqueta: string;
  subtotal: string;
  envioEtiqueta: string;
  envio: string;
  calculando: string;
  totalEtiqueta: string;
  total: string;
  botonCarrito: string;
  /** Pago */
  medios: readonly string[];
  botonPago: string;
  procesando: string;
  pagado: string;
  hora: string;
};

const T = {
  es: { rotulo: "En el teléfono de tu cliente" },
  en: { rotulo: "On your customer's phone" },
} as const;

/** El marco del teléfono. Un solo mueble para las tres pantallas. */
function Telefono({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2rem] border border-line bg-surface p-2.5">
      {/* La pantalla no lleva borde propio: el marco ya es una caja con
            borde, y dos bordes concéntricos son una tarjeta dentro de otra
            —el detector lo marca y tiene razón—. El bisel se lee igual con
            el relleno del marco y el fondo más oscuro de la pantalla. */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-canvas">
        {/* La isla de la cámara. Dos píxeles de detalle que hacen que el marco
            se lea como un teléfono y no como una caja redondeada. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-line-strong"
        />
        <div className="min-h-[23rem] px-4 pb-4 pt-7">{children}</div>
      </div>
    </div>
  );
}

function Pantalla({ paso, d }: { paso: number; d: DatosCompra }) {
  /* 3 · Pago */
  if (paso === 2) {
    return (
      <div className="flex h-full flex-col">
        <ul className="grid gap-2">
          {d.medios.map((m, i) => (
            <li
              key={m}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-lg border px-3 text-sm",
                /* Nequi va elegido: es el medio que nombra el paso. */
                i === 1 ? "jv-compra-medio border-brand bg-brand-quiet text-ink" : "border-line text-ink-soft",
              )}
            >
              <span
                className={cn(
                  "h-3 w-3 shrink-0 rounded-full border",
                  i === 1 ? "border-[3px] border-brand" : "border-line-strong",
                )}
              />
              <span className="min-w-0 truncate">{m}</span>
            </li>
          ))}
        </ul>

        <span className="jv-compra-boton mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-on-accent">
          <Loader2 className="jv-compra-girar h-4 w-4" strokeWidth={2.5} />
          {d.procesando}
        </span>

        {/* El aviso entra al final: es la respuesta a la pregunta de la
            sección, así que llega después del botón y no antes. */}
        <div className="jv-compra-aviso mt-auto flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-on-accent">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-ink">{d.pagado}</span>
            <span className="block font-mono text-xs text-ink-soft">
              {d.hora} · {d.total}
            </span>
          </span>
        </div>
      </div>
    );
  }

  /* 2 · Carrito */
  if (paso === 1) {
    return (
      <div className="flex h-full flex-col">
        <dl className="divide-y divide-line">
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="text-sm text-ink-soft">{d.subtotalEtiqueta}</dt>
            <dd className="shrink-0 font-mono text-sm tabular-nums text-ink">{d.subtotal}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="min-w-0 text-sm text-ink-soft">{d.envioEtiqueta}</dt>
            {/* Primero «calculando», después la cifra: el envío se cotiza, no
                se adivina, y ese es el argumento del paso. */}
            <dd className="relative shrink-0 font-mono text-sm tabular-nums">
              <span className="jv-compra-calculando text-ink-muted">{d.calculando}</span>
              <span className="jv-compra-envio absolute right-0 top-0 text-ink">{d.envio}</span>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="text-sm font-semibold text-ink">{d.totalEtiqueta}</dt>
            <dd className="jv-compra-total shrink-0 font-mono text-[length:var(--text-h4)] tabular-nums text-brand">
              {d.total}
            </dd>
          </div>
        </dl>

        <span className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent">
          {d.botonCarrito}
        </span>
      </div>
    );
  }

  /* 1 · Ficha */
  return (
    <div className="flex h-full flex-col">
      <div className="grid aspect-[5/4] shrink-0 place-items-center rounded-xl bg-gradient-to-br from-raised to-line">
        <span className="jv-eyebrow text-ink-soft">{d.foto}</span>
      </div>

      <p className="mt-3 text-sm font-semibold text-ink">{d.producto}</p>
      <p className="font-mono text-sm tabular-nums text-brand">{d.precio}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {d.tallas.map((x) => (
          <span
            key={x.t}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-sm",
              x.agotada
                ? "jv-compra-agotada border-dashed border-line text-ink-soft line-through"
                : "border-line text-ink",
            )}
          >
            {x.t}
          </span>
        ))}
        <span className="jv-eyebrow basis-full text-ink-soft">{d.agotada}</span>
      </div>

      <span className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-on-accent">
        {d.botonFicha}
      </span>
    </div>
  );
}

export function AsiCompra({
  pasos,
  datos,
  nota,
  idioma,
  className,
}: {
  pasos: readonly PasoCompra[];
  datos: DatosCompra;
  /** «Ejemplo · pantallas de muestra…». Va debajo del teléfono. */
  nota: string;
  idioma: Idioma;
  className?: string;
}) {
  const t = T[idioma];
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodos = refs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodos.length || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const i = nodos.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setActivo(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodos.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16",
        className,
      )}
    >
      <ol className="flex flex-col">
        {pasos.map((p, i) => (
          <li
            key={p.rotulo}
            ref={(n) => {
              refs.current[i] = n;
            }}
            className="jv-rule py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <p
              className={cn(
                "jv-eyebrow transition-colors duration-base ease-ps",
                i === activo ? "text-brand" : "text-ink-muted",
              )}
            >
              {p.rotulo}
            </p>
            <p className="mt-3 text-[length:var(--text-h4)] font-semibold leading-snug text-ink">
              {p.titulo}
            </p>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">{p.cuerpo}</p>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{p.pantalla}</p>

            <div aria-hidden="true" className="mt-6 lg:hidden">
              <Telefono>
                <Pantalla paso={i} d={datos} />
              </Telefono>
            </div>
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="hidden lg:block">
        <div className="sticky top-28">
          <p className="jv-eyebrow text-ink-muted">{t.rotulo}</p>
          <div className="mt-4" key={activo}>
            <Telefono>
              <Pantalla paso={activo} d={datos} />
            </Telefono>
          </div>
          <p className="jv-eyebrow-frase mt-4 text-center text-ink-soft">{nota}</p>
        </div>
      </div>

      <p className="jv-eyebrow-frase text-ink-soft lg:hidden">{nota}</p>
    </div>
  );
}
