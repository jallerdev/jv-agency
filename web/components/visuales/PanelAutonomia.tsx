"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Upload } from "lucide-react";

import type { Idioma } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * EL PANEL QUE TE QUEDA
 * ─────────────────────────────────────────────────────────────────────────
 * «Una tienda que depende de que yo conteste es una tienda mal entregada» es
 * de las promesas más repetidas del sitio y de las más difíciles de creer,
 * porque el cliente ha vivido lo contrario. Enseñar los tres controles
 * concretos la hace verificable de un vistazo, y de paso desactiva el miedo a
 * quedar preso del proveedor.
 *
 * AHORA SE PUEDE TOCAR, Y ES LO CORRECTO
 * --------------------------------------
 * Eran tres `<div>` con aspecto de control y `aria-hidden`: un decorado. El
 * argumento de esta pieza es «esto lo haces tú», y un dibujo de un botón no
 * demuestra que se pueda hacer nada. Ahora el precio se escribe y se guarda,
 * la foto sube con su barra y el pedido se marca y dispara el aviso.
 *
 * DÓNDE ESTÁ EL LÍMITE, PARA NO MENTIR: esto NO toca ninguna tienda. Es una
 * demostración de la interfaz, lo dice su rótulo —«Ejemplo · pantallas de
 * muestra del panel»— y nada de lo que se escriba aquí sale del navegador ni
 * se guarda en ningún sitio. Lo que se enseña es exactamente lo que el panel
 * real hace, sin la parte que necesita una tienda detrás.
 *
 * Que sean controles DE VERDAD —`input`, `button`, `select`— también arregla
 * lo de antes por el otro lado: el decorado no era enfocable y el lector de
 * pantalla no anunciaba nada; ahora cada control dice qué es y qué hace.
 *
 * PUNTO DE ROTURA A 390: etiqueta + campo + botón en una línea no caben. La
 * etiqueta va encima, y debajo el campo con `min-w-0 flex-1` y el botón con
 * `shrink-0`. Sin ese `min-w-0` el campo se niega a bajar de su tamaño
 * intrínseco y saca la tarjeta del viewport.
 */

type Props = {
  idioma?: Idioma;
  /** `null` pinta la tarjeta sin título: para cuando la sección ya lo dice. */
  titulo?: string | null;
  rotulo?: string;
  precio?: { etiqueta: string; campo: string; boton: string };
  archivo?: { etiqueta: string; nombre: string; nota: string };
  estado?: { etiqueta: string; elegida: string; nota: string };
  className?: string;
};

/**
 * Las tres filas por defecto, en los dos idiomas. Cada prop suelta sigue
 * pisando su fila: las páginas de ciudad mandan las suyas y son solo en
 * castellano, que es lo que les toca.
 *
 * El importe cambia de formato entre lenguas —$ 89.000 frente a $89,000 COP—
 * porque el separador de miles colombiano leído por un angloparlante dice
 * ochenta y nueve, no ochenta y nueve mil.
 */
const T = {
  es: {
    titulo: "Esto lo haces tú, sin escribirme",
    rotulo: "Ejemplo · pantallas de muestra del panel",
    precio: { etiqueta: "Cambiar un precio", campo: "$ 89.000", boton: "Guardar" },
    archivo: { etiqueta: "Subir una foto", nombre: "producto-frente.jpg", nota: "Listo" },
    estado: {
      etiqueta: "Marcar un pedido",
      elegida: "Despachado",
      nota: "El cliente recibe el aviso",
    },
    guardado: "Guardado",
    subiendo: "Subiendo…",
    subir: "Subir",
    pendiente: "Pendiente",
    enviado: "Aviso enviado al cliente",
    demo: "Es una demostración: nada de esto sale de tu navegador.",
  },
  en: {
    titulo: "You do this yourself, without writing to me",
    rotulo: "Example · sample panel screens",
    precio: { etiqueta: "Change a price", campo: "$89,000 COP", boton: "Save" },
    archivo: { etiqueta: "Upload a photo", nombre: "product-front.jpg", nota: "Done" },
    estado: {
      etiqueta: "Mark an order",
      elegida: "Shipped",
      nota: "The customer gets the notification",
    },
    guardado: "Saved",
    subiendo: "Uploading…",
    subir: "Upload",
    pendiente: "Pending",
    enviado: "Notification sent to the customer",
    demo: "This is a demo: none of it leaves your browser.",
  },
} as const;

export function PanelAutonomia({
  idioma = "es",
  titulo,
  rotulo,
  precio,
  archivo,
  estado,
  className,
}: Props) {
  const t = T[idioma];
  const filaPrecio = precio ?? t.precio;
  const filaArchivo = archivo ?? t.archivo;
  const filaEstado = estado ?? t.estado;

  const [valor, setValor] = useState(filaPrecio.campo);
  const [guardado, setGuardado] = useState(false);
  const [subida, setSubida] = useState<"quieto" | "subiendo" | "listo">("quieto");
  const [despachado, setDespachado] = useState(false);
  const temporizadores = useRef<number[]>([]);

  /* Los relojes se limpian al desmontar: si alguien cambia de página mientras
     la barra sube, el `setState` caería sobre un componente que ya no está. */
  useEffect(() => {
    const relojes = temporizadores.current;
    return () => relojes.forEach((id) => window.clearTimeout(id));
  }, []);

  const enEspera = (fn: () => void, ms: number) => {
    temporizadores.current.push(window.setTimeout(fn, ms));
  };

  const guardar = () => {
    setGuardado(true);
    enEspera(() => setGuardado(false), 2400);
  };

  const subir = () => {
    if (subida === "subiendo") return;
    setSubida("subiendo");
    /* 900 ms: lo que tarda una foto de producto en una conexión normal. Más
       corto no se ve la barra; más largo parece que se colgó. */
    enEspera(() => setSubida("listo"), 900);
  };

  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      {titulo !== null && (
        <p className="font-body text-xl font-semibold text-ink">{titulo ?? t.titulo}</p>
      )}

      <ul className={cn("divide-y divide-line", titulo !== null && "mt-5")}>
        {/* 1 · Cambiar un precio */}
        <li className="py-4 first:pt-0">
          <label className="jv-eyebrow block text-accent-ink" htmlFor="jv-panel-precio">
            {filaPrecio.etiqueta}
          </label>
          <div className="mt-2.5 flex items-center gap-2">
            <input
              id="jv-panel-precio"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value);
                setGuardado(false);
              }}
              inputMode="numeric"
              className="focus-ring min-h-11 min-w-0 flex-1 rounded-md border border-line bg-canvas px-3 font-mono text-[15px] tabular-nums text-ink"
            />
            <button
              type="button"
              onClick={guardar}
              className="jv-boton min-h-11 shrink-0 px-5 text-sm"
            >
              {filaPrecio.boton}
            </button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 font-body text-sm leading-snug text-ink-soft">
            {guardado && (
              <span className="inline-flex items-center gap-1.5 text-brand">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                {t.guardado}
              </span>
            )}
          </p>
        </li>

        {/* 2 · Subir una foto */}
        <li className="py-4">
          <p className="jv-eyebrow text-accent-ink">{filaArchivo.etiqueta}</p>
          <div className="mt-2.5 flex min-h-11 flex-wrap items-center gap-2">
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-canvas px-3 py-2">
              <Upload className="h-3.5 w-3.5 shrink-0 text-ink-soft" strokeWidth={2} aria-hidden />
              <span className="truncate font-mono text-sm text-ink">{filaArchivo.nombre}</span>
            </span>
            <button
              type="button"
              onClick={subir}
              disabled={subida === "subiendo"}
              className="jv-boton-2 min-h-11 shrink-0 px-4 text-sm"
            >
              {subida === "listo" ? filaArchivo.nota : t.subir}
            </button>
          </div>

          {/* La barra: `scaleX` sobre un riel, no un `width` animado. Animar el
              ancho recalcula la caja en cada fotograma; la escala no toca el
              flujo. */}
          <div
            aria-hidden="true"
            className="mt-3 h-1 overflow-hidden rounded-full bg-line"
          >
            <span
              className={cn(
                "block h-full origin-left rounded-full bg-brand transition-transform duration-slow ease-ps",
                subida === "quieto" && "scale-x-0",
                subida === "subiendo" && "scale-x-[0.6]",
                subida === "listo" && "scale-x-100",
              )}
            />
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 font-body text-sm leading-snug text-ink-soft">
            {subida === "subiendo" && t.subiendo}
            {subida === "listo" && (
              <span className="inline-flex items-center gap-1.5 text-brand">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                {filaArchivo.nota}
              </span>
            )}
          </p>
        </li>

        {/* 3 · Marcar un pedido */}
        <li className="py-4 last:pb-0">
          <label className="jv-eyebrow block text-accent-ink" htmlFor="jv-panel-estado">
            {filaEstado.etiqueta}
          </label>
          <div className="relative mt-2.5">
            <select
              id="jv-panel-estado"
              value={despachado ? "despachado" : "pendiente"}
              onChange={(e) => setDespachado(e.target.value === "despachado")}
              className="focus-ring min-h-11 w-full appearance-none rounded-md border border-line bg-canvas px-3 pr-10 font-body text-[15px] text-ink"
            >
              <option value="pendiente">{t.pendiente}</option>
              <option value="despachado">{filaEstado.elegida}</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            />
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 font-body text-sm leading-snug text-ink-soft">
            {despachado ? (
              <span className="inline-flex items-center gap-1.5 text-brand">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                {t.enviado}
              </span>
            ) : (
              filaEstado.nota
            )}
          </p>
        </li>
      </ul>

      <p className="jv-rule mt-4 pt-4 font-mono text-xs leading-relaxed text-ink-soft">
        {rotulo ?? t.rotulo} · {t.demo}
      </p>
    </div>
  );
}
