import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Cotizador } from "@/components/Cotizador";
import { DISCOUNT_TODAY } from "@/lib/quote";

const DISCOUNT_PCT = Math.round(DISCOUNT_TODAY * 100);

export const metadata: Metadata = {
  title: "Cotizador web — JV Agencia",
  description: `Calcula en minutos cuánto cuesta tu landing, web corporativa o tienda online. Estimado al instante y ${DISCOUNT_PCT}% de descuento si avanzas hoy.`,
  alternates: { canonical: "/cotizador" },
};

export default function CotizadorPage() {
  return (
    <>
      <Header />
      <main className="px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-wider text-primary-dark">
              Cotizador web
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Calcula tu inversión
              <span className="block text-metal text-metal-anim">en minutos</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg text-ink-soft">
              Responde unas preguntas rápidas y arma el estimado de tu proyecto al instante. Si
              decides avanzar hoy, aplicamos un {DISCOUNT_PCT}% de descuento.
            </p>
          </div>

          <Cotizador />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
