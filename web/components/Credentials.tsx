import { Reveal } from "@/components/Reveal";
import { MetaTechProvider } from "@/components/MetaTechProvider";

// Franja de credenciales, justo después del hero: una credencial pesa más
// apenas terminado el pitch que enterrada en el pie.
//
// Se mantiene deliberadamente sobria y con UNA sola credencial. Una fila de
// sellos genéricos ("+11 proyectos", "5 estrellas") diluye la única que es
// verificable por un tercero.
export function Credentials() {
  return (
    <section aria-label="Credenciales" className="relative pb-4 pt-2 md:pb-8">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <MetaTechProvider />
        </Reveal>
      </div>
    </section>
  );
}
