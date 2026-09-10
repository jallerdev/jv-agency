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
  titulo?: string;
  rotulo?: string;
  precio?: { etiqueta: string; campo: string; boton: string };
  archivo?: { etiqueta: string; nombre: string; nota: string };
  estado?: { etiqueta: string; elegida: string; nota: string };
  className?: string;
};

const POR_DEFECTO = {
  precio: { etiqueta: "Cambiar un precio", campo: "$ 89.000", boton: "Guardar" },
  archivo: { etiqueta: "Subir una foto", nombre: "producto-frente.jpg", nota: "Listo" },
  estado: { etiqueta: "Marcar un pedido", elegida: "Despachado", nota: "El cliente recibe el aviso" },
};

export function PanelAutonomia({
  titulo = "Esto lo haces tú, sin escribirme",
  rotulo = "Ejemplo · pantallas de muestra del panel",
  precio = POR_DEFECTO.precio,
  archivo = POR_DEFECTO.archivo,
  estado = POR_DEFECTO.estado,
  className,
}: Props) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-5 sm:p-6", className)}>
      <p className="font-display text-xl text-ink">{titulo}</p>

      <ul className="mt-5 divide-y divide-line">
        {/* 1 · Cambiar un precio */}
        <li className="py-4 first:pt-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
            {precio.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex items-center gap-2">
            <span className="flex min-h-11 min-w-0 flex-1 items-center rounded-md border border-line bg-background px-3 font-mono text-[15px] tabular-nums text-ink">
              {precio.campo}
            </span>
            <span className="flex min-h-11 shrink-0 items-center rounded-full bg-primary px-5 font-body text-sm font-semibold text-on-accent">
              {precio.boton}
            </span>
          </div>
        </li>

        {/* 2 · Subir una foto */}
        <li className="py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
            {archivo.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex min-h-11 flex-wrap items-center gap-2">
            <span className="flex min-w-0 items-center gap-2 rounded-full border border-line bg-background px-3 py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              <span className="truncate font-mono text-[13px] text-ink">{archivo.nombre}</span>
            </span>
            <span className="shrink-0 rounded-full bg-success/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-success-ink">
              {archivo.nota}
            </span>
          </div>
        </li>

        {/* 3 · Marcar un pedido */}
        <li className="py-4 last:pb-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
            {estado.etiqueta}
          </p>
          <div aria-hidden className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-line bg-background px-3">
              <span className="truncate font-body text-[15px] text-ink">{estado.elegida}</span>
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
          <p className="mt-2 font-body text-[13px] leading-snug text-ink-soft">{estado.nota}</p>
        </li>
      </ul>

      <p className="mt-4 border-t border-line pt-4 font-mono text-[11px] text-ink-soft">{rotulo}</p>
    </div>
  );
}
