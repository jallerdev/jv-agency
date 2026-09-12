import { VERTICALES } from "@/content/home/verticales";
import type { Idioma } from "@/content/types";
import { EncabezadoSeccion } from "@/components/ui/seccion";
import { CarruselClavado } from "@/components/kit/CarruselClavado";

/**
 * Los tres paneles, en carrusel clavado.
 *
 * HUBO UN CAMBIO DE CRITERIO Y CONVIENE DEJARLO ESCRITO. Esto era un carril
 * con anclaje, y el comentario de entonces decía que clavar la sección
 * secuestraba la rueda. Sigue siendo verdad de la técnica que se usa
 * normalmente —un listener de `scroll` que mueve el carril a mano, o peor, uno
 * de `wheel` con `preventDefault`—. No lo es de la que hay ahora:
 * `animation-timeline`, que no intercepta nada. La página baja a la velocidad
 * de siempre; lo único que pasa es que, mientras esta sección cubre la
 * pantalla, los paneles pasan de lado. Si el visitante sube, se deshace igual.
 *
 * Y donde no hay animaciones por scroll —o hay movimiento reducido, o es un
 * teléfono— queda exactamente el carril con anclaje de antes. Así que la
 * decisión vieja no se borró: se quedó de respaldo.
 *
 * El contador «0N / 03» y la barra de avance dicen cuántos faltan, que es lo
 * único que un carril horizontal esconde.
 */
export function Verticales({ idioma }: { idioma: Idioma }) {
  return (
    /* El contenedor de sección envuelve solo el encabezado: el carrusel tiene
       que poder medir el ancho entero de la pantalla, y dentro de un
       `max-w-[1280px]` el bloque clavado se quedaría corto por los dos lados. */
    <section id="para-quien" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <EncabezadoSeccion contenido={VERTICALES} idioma={idioma} />
      </div>

      <CarruselClavado
        className="mt-16"
        etiquetaAvance={
          idioma === "es" ? "Avance del carrusel" : "Carousel progress"
        }
        paneles={VERTICALES.paneles.map((v) => ({
          numero: v.numero,
          eyebrow: v.eyebrow[idioma],
          titulo: v.titulo[idioma],
          cuerpo: v.cuerpo[idioma],
          enlace: { texto: v.enlace.texto[idioma], href: v.enlace.href[idioma] },
          imagen: v.imagen,
          alt: v.alt[idioma],
        }))}
      />
    </section>
  );
}
