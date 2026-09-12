"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

/**
 * La fila de cifras que cuenta una sola vez al entrar en pantalla.
 *
 * POR QUÉ ES DE CLIENTE Y RECIBE CADENAS
 * --------------------------------------
 * `useCountUp` necesita el navegador. Lo que cruza la frontera son números y
 * cadenas ya traducidas —nunca el objeto `Texto` entero ni una función de
 * formato—, que es la regla que este proyecto aprendió a golpes: una función
 * pasada de servidor a cliente revienta el render con «Functions cannot be
 * passed directly to Client Components».
 *
 * NO TODAS CUENTAN, y no es una omisión. Un tope —«menos de 24 horas»— no
 * crece: verlo subir de cero diría lo contrario de lo que la cifra afirma. Y
 * contar hasta uno no es una cuenta, es un parpadeo. El hook ya se encarga del
 * resto de casos en los que no debe animar: movimiento reducido, cifra ya
 * visible al cargar, o navegador sin `IntersectionObserver`.
 */

export type CifraVista = {
  valor: number;
  /** Va antes y nunca cuenta: «menos de» no es una suma. */
  prefijo?: string;
  /** El «+» de «3+», o la unidad. Parte de la cifra. */
  sufijo?: string;
  cuenta?: boolean;
  etiqueta: string;
  /**
   * La cifra tal cual, cuando no hay número que contar.
   *
   * Las páginas de ciudad traen datos del registro mercantil y algunos no son
   * contables: «93,1 %» con decimal, un rango, un intervalo. Verlos subir de
   * cero marea y no dicen nada que la cifra quieta no diga, así que la celda
   * los imprime tal cual. La alternativa —inventar un número redondo para
   * poder animarlo— es exactamente lo que este sitio no hace.
   */
  textoCrudo?: string;
};

export function Cifras({ cifras, className }: { cifras: readonly CifraVista[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-[--radius-lg] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {cifras.map((c) => (
        <Celda key={c.etiqueta} cifra={c} />
      ))}
    </dl>
  );
}

function Celda({ cifra }: { cifra: CifraVista }) {
  const { ref, valor } = useCountUp(cifra.valor, Boolean(cifra.cuenta));

  return (
    /* `flex-col-reverse` y no un orden distinto en el marcado: una lista de
       descripción se define término → descripción, y que la cifra se vea
       arriba es cosa del diseño, no del HTML. */
    <div className="flex flex-col-reverse gap-2 bg-canvas p-6 md:p-7">
      <dt className="text-[0.9375rem] leading-snug text-ink-soft">{cifra.etiqueta}</dt>
      <dd className="font-mono text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none tabular-nums text-ink">
        {cifra.textoCrudo ? (
          cifra.textoCrudo
        ) : (
          <>
            {cifra.prefijo && <span className="text-ink-muted">{cifra.prefijo}</span>}
            <span ref={ref}>{valor}</span>
            {cifra.sufijo && <span className="text-brand">{cifra.sufijo}</span>}
          </>
        )}
      </dd>
    </div>
  );
}
