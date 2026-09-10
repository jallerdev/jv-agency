import { STACK } from "@/content/home/marquee";

/**
 * La marquesina de stack.
 *
 * El carril se duplica y la animación lo mueve un −50%: al llegar al final, la
 * segunda copia está exactamente donde arrancó la primera y el salto no existe.
 * Es la única forma de hacer un bucle infinito sin JavaScript.
 *
 * `.jv-marquee` llevaba semanas escrita en efectos.css sin que nadie la usara.
 * La pausa en hover va aquí, no en la clase, porque es una decisión de esta
 * pieza: en un carril de logos molesta, en uno de texto que alguien puede
 * querer leer, ayuda.
 */
export function Marquee() {
  const carril = [...STACK, ...STACK];

  return (
    <section
      aria-hidden
      className="group relative overflow-hidden border-y border-line py-6"
    >
      {/* Los bordes se desvanecen: sin esto el texto aparece y desaparece de
          golpe contra el filete lateral y se lee como un recorte. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />

      <div className="jv-marquee gap-12 group-hover:[animation-play-state:paused]">
        {carril.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="shrink-0 font-mono text-sm uppercase tracking-[0.12em] text-ink-muted transition-colors duration-base ease-ps group-hover:text-ink-soft"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
