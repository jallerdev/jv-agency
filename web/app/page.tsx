import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MediaSection } from "@/components/MediaSection";
import { Portfolio } from "@/components/Portfolio";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/**
 * El ritmo tonal de la portada.
 *
 * Antes las nueve secciones eran transparentes sobre el mismo papel: entre el
 * hero y el bloque bronce del cierre había casi 9.000 px sin un cambio de tono.
 * Nada pesaba más que nada.
 *
 * Ahora la página alterna entre el papel del canvas y una banda más honda, y
 * las bandas AGRUPAN: cada una encierra las secciones que cuentan una misma
 * idea, así que el cambio de tono dice algo en vez de decorar.
 *
 *   hero .................. canvas, con su atmósfera propia
 *   trabajo + proyectos ... BANDA — «lo que he construido», un solo capítulo
 *   servicios ............. canvas
 *   proceso ............... canvas
 *   quién + testimonios ... BANDA — «quién lo hace y qué dicen de él»
 *   preguntas ............. canvas
 *   contacto .............. bronce, el punto más alto y el único de su tono
 *
 * De un cambio de tono en toda la portada se pasa a cinco, repartidos cada
 * ~2.000 px. Y de regalo, las tarjetas —que son de `surface`— se despegan casi
 * el doble dentro de las bandas: 1,20:1 contra el 1,08:1 que tenían sobre el
 * canvas.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <div className="band-group border-y border-line bg-band">
          <MediaSection />
          <Portfolio />
        </div>

        <Benefits />
        <Process />

        <div className="band-group border-y border-line bg-band">
          <Founder />
          <Testimonials />
        </div>

        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
