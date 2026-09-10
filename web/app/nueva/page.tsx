import { Hero } from "@/components/sections/Hero";
import { Proceso } from "@/components/sections/Proceso";
import { Verticales } from "@/components/sections/Verticales";
import { Faq } from "@/components/sections/Faq";
import { Founder } from "@/components/sections/Founder";
import { Testimonios } from "@/components/sections/Testimonios";
import { Caso } from "@/components/sections/Caso";
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
      <Caso idioma="es" />
      <Servicios idioma="es" />
      <Proceso idioma="es" />
      <Verticales idioma="es" />
      <Founder idioma="es" />
      <Testimonios idioma="es" />
      <Faq idioma="es" />
    </main>
  );
}
