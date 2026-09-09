/**
 * Nota interna a la vista — SOLO en desarrollo.
 *
 * Los datos que no se pudieron confirmar se marcan en la página en vez de
 * rellenarse con algo verosímil. La idea era buena y el sitio se construyó
 * así: un marcador que estorba se resuelve; uno escondido en un comentario
 * no lo lee nadie.
 *
 * Lo que faltó fue la otra mitad: eso vale mientras el sitio es un borrador
 * que solo miramos nosotros, y deja de valer en el segundo en que se
 * despliega. Un cliente no tiene por qué leer «[PENDIENTE: definir el piso]»
 * debajo de un precio — le dice que el negocio no sabe lo que cobra.
 *
 * Así que el marcador vive donde tiene que vivir: visible mientras se
 * trabaja, inexistente en producción. No se comenta ni se borra, porque
 * entonces se olvida.
 */
export function Pendiente({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <p className="mt-6 max-w-[62ch] rounded-xl border border-dashed border-accent/60 bg-accent/[0.07] px-5 py-4 font-mono text-xs leading-relaxed text-accent-ink">
      {children}
    </p>
  );
}

/** ¿Se pintan los marcadores? Para los que no son un bloque de texto. */
export const MOSTRAR_PENDIENTES = process.env.NODE_ENV !== "production";

/**
 * Quita el campo `verify` de una lista antes de pasarla a un componente de
 * cliente.
 *
 * No basta con no PINTARLO. Las props que un componente de servidor le pasa a
 * uno de cliente se serializan enteras dentro del HTML para poder hidratar, así
 * que el marcador seguía viajando al navegador y se leía en «ver código
 * fuente» aunque no apareciera en pantalla. Filtrar aquí, en el servidor, es lo
 * único que hace que no exista.
 */
export function sinPendientes<T extends object>(items: T[]): T[] {
  if (MOSTRAR_PENDIENTES) return items;
  return items.map((it) => {
    const { verify: _descartado, ...resto } = it as T & { verify?: string };
    return resto as T;
  });
}
