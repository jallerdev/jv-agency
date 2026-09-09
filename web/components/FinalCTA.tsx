import { Reveal } from "@/components/Reveal";
import { ScheduleCall } from "@/components/ScheduleCall";
import { Check } from "lucide-react";

const PERKS = [
  "Diagnóstico sin costo de 20 minutos",
  "Hablas directo con quien diseña y construye",
  "Sin compromiso, sin letra chica",
];

/* Cierre de la portada.
 *
 * Antes era una tarjeta bronce redondeada flotando sobre el papel, con dos
 * orbes `blur-3xl` y `animate-float`: exactamente el mismo recurso del hero,
 * repetido a 9.000 px de distancia. Dos secciones con el mismo truco no hacen
 * jerarquía, hacen eco.
 *
 * Ahora es una BANDA a ancho completo: la única superficie oscura del recorrido
 * antes del pie, sin radios que la conviertan en un objeto más, y con la luz
 * resuelta con degradados estáticos —no con círculos difuminados que hay que
 * recomponer en cada fotograma—. La banda va oscureciéndose hacia abajo hasta
 * casi el tono del pie, así que el final de la página deja de ser un salto
 * (papel -> tarjeta -> negro) y pasa a ser un descenso: papel -> bronce ->
 * oscuro.
 *
 * De paso el fondo se oscureció a `primary-dark`. No es capricho: sobre el
 * bronce medio anterior (#985C3E) el texto crema al 80% daba 3,82:1 y no
 * pasaba AA. Sobre primary-dark da 5,83:1 con el mismo tono.
 */
export function FinalCTA() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-primary-dark px-5 pb-20 pt-20 shadow-[0_-28px_64px_-36px_rgba(43,36,32,0.30)] md:px-8 md:pb-28 md:pt-28"
    >
      {/* Luz, no orbes: un foco cálido que cae sobre la esquina donde vive el
          formulario, y un velo que apaga la banda hacia el pie. Son capas
          estáticas: cuestan una pintada y nada más. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_82%_-10%,rgba(192,118,59,0.42),transparent_62%),radial-gradient(90%_70%_at_8%_18%,rgba(176,137,104,0.20),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[rgba(33,27,23,0.82)]"
      />
      {/* La textura de papel sigue corriendo sobre el bronce: el material no
          cambia aunque cambie el tono. */}
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-50" />
      {/* Costura superior: un hilo de cobre marca dónde termina el papel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
        <Reveal className="min-w-0" distance="lg" variant="left">
          <h2 className="text-balance font-display text-[2.4rem]/[1.12] text-surface/75 sm:text-5xl/[1.06] lg:text-[3.5rem]/[1.04]">
            {/* Los dos sintagmas van enteros: el único corte posible cae entre
                ellos, y «página web» —el término que vende— no se parte nunca. */}
            <span className="whitespace-nowrap">Tu página web,</span>{" "}
            <span className="whitespace-nowrap">a la altura</span>
            <span className="block italic text-surface">de tus ambiciones.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-pretty font-body text-lg leading-relaxed text-surface/85">
            Agenda una llamada y cuéntanos qué necesitas. Te decimos con franqueza si podemos
            ayudarte —y cómo.
          </p>

          {/* Las tres garantías dejan de ser viñetas y pasan a ser filas con
              regla: se leen como condiciones de un acuerdo, que es lo que son. */}
          <ul className="mt-10 border-t border-surface/15">
            {PERKS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3.5 border-b border-surface/15 py-4 font-body text-surface"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface/15 ring-1 ring-surface/20">
                  <Check className="h-3.5 w-3.5 text-surface" strokeWidth={2.5} />
                </span>
                <span className="text-pretty">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* `min-w-0` para que la columna pueda encoger por debajo del ancho
            mínimo de contenido del botón de envío: sin esto, a 360 px el
            formulario se salía de su celda y el contenedor lo recortaba. */}
        <Reveal className="relative min-w-0" delay={120} variant="scale">
          {/* Halo detrás de la tarjeta: la levanta del fondo sin necesidad de
              una sombra que, sobre bronce oscuro, no se vería. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-4xl bg-[radial-gradient(60%_50%_at_50%_45%,rgba(192,118,59,0.35),transparent_72%)] blur-2xl"
          />
          <ScheduleCall />
        </Reveal>
      </div>
    </section>
  );
}
