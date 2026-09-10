import { Hero } from "@/components/sections/Hero";
import { Proceso } from "@/components/sections/Proceso";
import { Statement } from "@/components/sections/Statement";
import { Marquee } from "@/components/sections/Marquee";
import { Servicios } from "@/components/sections/Servicios";

/**
 * Banco de pruebas de la portada nueva.
 *
 * Existe mientras se construye, para poder mirar las secciones en pantalla
 * según van saliendo en vez de escribir las quince a ciegas y descubrir los
 * problemas al final. Se borra al montar la portada de verdad.
 */
export default function Nueva() {
  return (
    <main className="min-h-screen">
      <Hero idioma="es" />
      <Statement idioma="es" />
      <Marquee />
      <Servicios idioma="es" />
      <Proceso idioma="es" />
    </main>
  );
}
