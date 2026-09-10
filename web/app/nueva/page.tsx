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
import { Portafolio } from "@/components/sections/Portafolio";
import { Agenda } from "@/components/sections/Agenda";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BarraMovil } from "@/components/BarraMovil";

/**
 * Banco de pruebas de la portada nueva.
 *
 * Existe mientras se construye, para poder mirar las secciones en pantalla
 * según van saliendo en vez de escribir las quince a ciegas y descubrir los
 * problemas al final. Se borra al montar la portada de verdad.
 */
export default function Nueva() {
  return (
    <>
      <Header idioma="es" />
      <main id="contenido" className="min-h-screen pt-[var(--header-h)]">
      <Hero idioma="es" />
      <Statement idioma="es" />
      <Marquee />
      <Caso idioma="es" />
      <Servicios idioma="es" />
      <Portafolio idioma="es" />
      <Proceso idioma="es" />
      <Verticales idioma="es" />
      <Founder idioma="es" />
      <Testimonios idioma="es" />
      <Faq idioma="es" />
        <Agenda idioma="es" />
      </main>
      <Footer idioma="es" />
      <BarraMovil idioma="es" />
    </>
  );
}
