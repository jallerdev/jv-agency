import { AlEntrar } from "@/components/AlEntrar";
import { cn } from "@/lib/utils";

/**
 * BARRAS HORIZONTALES PARA UNA CIFRA QUE SE COMPARA
 * ─────────────────────────────────────────────────────────────────────────
 * Las páginas de ciudad citan repartos —qué sectores abren más empresas, qué
 * localidades concentran más microempresas— y los citan dentro de un párrafo:
 * «Suba (12,0 %), Kennedy (9,7 %), Usaquén (9,4 %)». Ahí esos números no se
 * comparan: «12,0» y «8,3» se leen igual de largas y el lector se queda con
 * «hay varias localidades», que es lo contrario del dato.
 *
 * Dibujadas a escala, la diferencia se ve sin leer. Es la lectura entera del
 * dato en un gesto, y no hace falta una biblioteca de gráficos para eso: son
 * cinco divs con un ancho en porcentaje.
 *
 * LA ESCALA ES RELATIVA AL MÁXIMO DE LA PROPIA LISTA, no al 100 %. Con cinco
 * cifras entre el 8 y el 12 por ciento, una escala de cero a cien deja cinco
 * barras cortas e indistinguibles. Contra el máximo, la diferencia que el dato
 * tiene es la diferencia que se ve. La nota al pie dice de qué es el
 * porcentaje, que es lo que impide leerlo como otra cosa.
 *
 * LAS BARRAS SE DIBUJAN al entrar en vista, de arriba abajo. Con movimiento
 * reducido están puestas desde el primer fotograma: el dato no depende del
 * gesto.
 */

export type FilaBarra = {
  nombre: string;
  /** El número, solo para el ancho. */
  valor: number;
  /** Cómo se escribe: «12,0 %». La coma decimal no es un punto. */
  etiqueta: string;
};

export function BarrasDato({
  filas,
  nota,
  className,
}: {
  filas: readonly FilaBarra[];
  nota?: string;
  className?: string;
}) {
  const maximo = Math.max(...filas.map((f) => f.valor));

  return (
    <AlEntrar className={cn("jv-barras", className)}>
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {filas.map((f, i) => (
          <li
            key={f.nombre}
            className="grid grid-cols-1 items-center gap-x-8 gap-y-2 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]"
          >
            <span className="font-semibold text-ink">{f.nombre}</span>

            {/* `div` Y NO `span`, y la lección costó tres piezas: un `<span>`
                es contenido de texto para el navegador y para las reglas del
                sitio —la medida de lectura recorta `span.block` a 68ch—, así
                que una pista de 846 px se quedaba en 611 y la barra del máximo
                salía a tres cuartos. Una caja de maquetación se declara como
                caja de maquetación y el problema no vuelve a existir. */}
            <div aria-hidden className="h-2 w-full overflow-hidden rounded-full bg-line">
              <div
                className="jv-barras__barra h-full rounded-full bg-brand"
                style={{ width: `${(f.valor / maximo) * 100}%`, transitionDelay: `${i * 90}ms` }}
              />
            </div>

            <span className="font-mono text-sm tabular-nums text-brand sm:text-right">
              {f.etiqueta}
            </span>
          </li>
        ))}
      </ul>

      {nota && <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ink-muted">{nota}</p>}
    </AlEntrar>
  );
}
