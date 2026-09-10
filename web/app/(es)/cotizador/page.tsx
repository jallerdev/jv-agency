import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CotizadorSwitch } from "@/components/CotizadorSwitch";

export const metadata: Metadata = {
  title: "Cotizador — webs y automatizaciones | JV Agencia",
  description: "Herramienta interna de venta de JV Agencia.",
  // Herramienta privada: sin canónico y fuera de los buscadores. El middleware
  // ya manda X-Robots-Tag, esto es el cinturón por si alguien la enlaza.
  robots: { index: false, follow: false },
};

export default function CotizadorPage() {
  return (
    <>
      <Header />
      <main className="px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-wider text-primary-dark">
              Cotizador
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Calcula tu inversión
              <span className="block text-metal text-metal-anim">en minutos</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg text-ink-soft">
              Responde unas preguntas rápidas y arma el estimado de tu proyecto al instante.
            </p>
          </div>

          <CotizadorSwitch />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
