import { AGENDA } from "@/content/home/agenda";
import type { Idioma } from "@/content/types";
import { Seccion, EncabezadoSeccion } from "@/components/ui/seccion";
import { Reveal } from "@/components/Reveal";
import { ScheduleCall } from "@/components/ScheduleCall";

/**
 * EL CIERRE: LA LLAMADA
 * ──────────────────────────────────────────────────────────────────────────
 * La columna izquierda contesta las tres objeciones que aparecen justo antes
 * de reservar —«¿con quién voy a hablar?», «¿me van a decir el precio?»,
 * «¿tengo que instalar algo?»—, y la derecha es el formulario en dos pasos.
 *
 * POR QUÉ EN DOS COLUMNAS Y NO UNA DEBAJO DE OTRA: el formulario partido mide
 * unos 560 px. Con las tres razones apiladas encima, el campo del nombre
 * quedaba por debajo del pliegue en cualquier portátil, que es exactamente el
 * problema que el dueño pidió arreglar («que la sección de contacto quepa en
 * la pantalla»).
 *
 * La lógica de reserva —`freebusy`, el 409 por franja ocupada, el respaldo a
 * WhatsApp— vive en `ScheduleCall` y no se toca aquí. Esto es la piel.
 */
export function Agenda({ idioma }: { idioma: Idioma }) {
  return (
    <Seccion id="agenda" className="relative">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <EncabezadoSeccion contenido={AGENDA} idioma={idioma} as="h2" />

          <ul className="mt-10 flex flex-col divide-y divide-line border-y border-line">
            {AGENDA.puntos.map((p) => (
              <li key={p.titulo.es} className="py-5">
                <h3 className="jv-titulo text-base">{p.titulo[idioma]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {p.cuerpo[idioma]}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <ScheduleCall idioma={idioma} />
        </Reveal>
      </div>
    </Seccion>
  );
}
