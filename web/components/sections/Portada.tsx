import type { Idioma } from "@/content/types";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Marquee } from "@/components/sections/Marquee";
import { Caso } from "@/components/sections/Caso";
import { Servicios } from "@/components/sections/Servicios";
import { Portafolio } from "@/components/sections/Portafolio";
import { Proceso } from "@/components/sections/Proceso";
import { Verticales } from "@/components/sections/Verticales";
import { Founder } from "@/components/sections/Founder";
import { Testimonios } from "@/components/sections/Testimonios";
import { Faq } from "@/components/sections/Faq";
import { Agenda } from "@/components/sections/Agenda";
import { Footer } from "@/components/sections/Footer";
import { BarraMovil } from "@/components/BarraMovil";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * LA PORTADA, LOS QUINCE BLOQUES
 * ──────────────────────────────────────────────────────────────────────────
 * Un solo archivo compone la página y las DOS lenguas la usan: lo único que
 * cambia entre `/` y `/en` es el idioma que se pasa hacia abajo. Si el orden
 * de las secciones tuviera que mantenerse a mano en dos sitios, se separarían
 * a la tercera edición.
 *
 * EL ORDEN NO ES ARBITRARIO. Va contestando, en el orden en que aparecen, las
 * preguntas de alguien que no conoce el estudio:
 *
 *   qué haces .............. hero, declaración, marquesina de herramientas
 *   demuéstralo ............ el caso a fondo, antes que ningún catálogo
 *   qué vendes ............. los siete servicios
 *   qué más has hecho ...... el portafolio en expedientes
 *   cómo trabajas .......... el proceso apilado
 *   sirve para lo mío ...... las verticales
 *   quién eres ............. la ficha, con las cifras
 *   quién lo dice .......... las recomendaciones, con su original
 *   me falta saber ......... las preguntas
 *   vale, hablemos ......... la agenda
 *
 * Las manchas de color y el pie los pone el documento, no esta función.
 */
export function Portada({ idioma }: { idioma: Idioma }) {
  return (
    <>
      <Header idioma={idioma} />
      <main id="contenido">
        <Hero idioma={idioma} />
        <Statement idioma={idioma} />
        <Marquee />
        <Caso idioma={idioma} />
        <Servicios idioma={idioma} />
        <Portafolio idioma={idioma} />
        <Proceso idioma={idioma} />
        <Verticales idioma={idioma} />
        <Founder idioma={idioma} />
        <Testimonios idioma={idioma} />
        <Faq idioma={idioma} />
        <Agenda idioma={idioma} />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppButton />
      <BarraMovil idioma={idioma} />
    </>
  );
}
