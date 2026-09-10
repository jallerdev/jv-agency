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
 * DECORADO, NO FORMULARIO. Los controles son <div>, no <input> ni <button>: un
 * control real que no hace nada es una trampa para quien navega con teclado o
 * con lector de pantalla. Lo que sí es real es la ETIQUETA de cada fila —ahí
 * está el argumento— y esa se lee normal.
 *
 * PUNTO DE ROTURA A 390: etiqueta + campo + botón en una línea no caben. La
 * etiqueta va encima, y debajo el campo con `min-w-0 flex-1` y el botón con
 * `shrink-0`. Sin ese `min-w-0` el campo se niega a bajar de su tamaño
 * intrínseco y saca la tarjeta del viewport.
 */

type Props = {
  idioma?: Idioma;
  titulo?: string;
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
  return (
    <div className={cn("jv-card p-5 sm:p-6", className)}>
      <p className="font-body text-xl font-semibold text-ink">{titulo ?? t.titulo}</p>

      <ul className="mt-5 divide-y divide-line">
        {/* 1 · Cambiar un precio */}
        <li className="py-4 first:pt-0">
          <p className="jv-eyebrow text-accent-ink">
            {filaPrecio.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex items-center gap-2">
            <span className="flex min-h-11 min-w-0 flex-1 items-center rounded-md border border-line bg-background px-3 font-mono text-[15px] tabular-nums text-ink">
              {filaPrecio.campo}
            </span>
            <span className="flex min-h-11 shrink-0 items-center rounded-full bg-primary px-5 font-body text-sm font-semibold text-on-accent">
              {filaPrecio.boton}
            </span>
          </div>
        </li>

        {/* 2 · Subir una foto */}
        <li className="py-4">
          <p className="jv-eyebrow text-accent-ink">
            {filaArchivo.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex min-h-11 flex-wrap items-center gap-2">
            <span className="flex min-w-0 items-center gap-2 rounded-full border border-line bg-background px-3 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              <span className="truncate font-mono text-[13px] text-ink">{filaArchivo.nombre}</span>
            </span>
            <span className="shrink-0 rounded-full bg-success/12 px-3 py-1 jv-eyebrow text-success-ink">
              {filaArchivo.nota}
            </span>
          </div>
        </li>

        {/* 3 · Marcar un pedido */}
        <li className="py-4 last:pb-0">
          <p className="jv-eyebrow text-accent-ink">
            {filaEstado.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-line bg-background px-3">
              <span className="truncate font-body text-[15px] text-ink">{filaEstado.elegida}</span>
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink-soft" fill="none">
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 font-body text-[13px] leading-snug text-ink-soft">{filaEstado.nota}</p>
        </li>
      </ul>

      <p className="mt-4 jv-rule pt-4 font-mono text-[11px] text-ink-soft">{rotulo ?? t.rotulo}</p>
    </div>
  );
}
