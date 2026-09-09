"use client";

import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";

/**
 * Preguntas frecuentes.
 *
 * El acordeón se arma aquí con las primitivas de Radix en vez de usar
 * components/ui/accordion, por dos motivos de diseño que ese componente
 * genérico no puede resolver sin afectar a las otras páginas:
 *
 *  1. La ALTURA tiene que animar. Radix publica --radix-accordion-content-height
 *     y con ella se usan las animaciones accordion-down / accordion-up del
 *     sistema: abre en 320 ms con la curva de entrada, cierra en 200 ms con la
 *     de salida. El acordeón genérico reciclaba `fade-in` para abrir Y para
 *     cerrar, así que al cerrar reproducía la animación de entrar mientras el
 *     alto saltaba de golpe.
 *  2. El estado abierto tiene que verse desde el otro lado de la pantalla: la
 *     tarjeta se asienta (papel sólido, sombra, borde de marca), el signo se
 *     vuelve un control lleno y aparece un filete de acento en el lomo.
 */
const FAQS = [
  {
    q: "¿Por qué un estudio de diseño + código y no contratar por separado?",
    a: "Porque coordinar a un diseñador con un programador que no se hablan sale más caro y más lento. Con nosotros, el que diseña piensa en cómo se va a construir, y el que construye respeta el diseño. Menos reprocesos, mejor resultado.",
  },
  {
    q: "¿Trabajan con negocios pequeños o solo con empresas grandes?",
    a: "Trabajamos con PYMEs y emprendedores que ya tienen tracción y quieren una web o un software que se vea a la altura de sus ambiciones. Si estás listo para dar el salto, somos para ti.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del tipo: una landing page toma de 1 a 4 semanas, una web corporativa de 2 a 5 y una tienda online de 3 a 8, según el plazo que escojas. Un software a medida varía más y lo estimamos contigo. Las semanas se cuentan desde que tengamos el contenido y la marca; si los textos los escribimos nosotros, ese tiempo ya está contado.",
  },
  {
    q: "¿Hacen marketing o publicidad también?",
    a: "Hacemos SEO —que te encuentren en Google sin pagar por cada clic— y automatización de WhatsApp. Lo que no hacemos es pauta pagada: no manejamos tu presupuesto de anuncios en Meta ni en Google Ads, ni community management. Preferimos decírtelo antes que cobrarte por algo que no es lo nuestro. Si necesitas pauta, te dejamos la landing y el píxel listos para que quien la maneje trabaje sobre terreno firme.",
  },
  {
    q: "¿Qué pasa después de entregar? ¿Me quedo solo?",
    a: "No. La entrega incluye capacitación y 30 días de ajustes sin costo. De ahí en adelante hay planes de mantenimiento mensual —desde el que solo vigila que el sitio no se caiga hasta el que le hace mejoras cada mes— y te pasamos el que corresponda con su precio en la propuesta. Si prefieres no contratar ninguno, el sitio es tuyo igual y sigue funcionando.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Agenda una llamada de diagnóstico sin costo. Revisamos tu situación, te decimos con franqueza si podemos ayudarte y, si hay match, armamos una propuesta a tu medida.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* El encabezado se queda quieto mientras se leen las preguntas: en una
            columna de seis ítems que crecen al abrirse, el titular ya no se va
            por arriba a la tercera pregunta. */}
        <Reveal
          distance="lg"
          className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start"
        >
          <Badge>Preguntas frecuentes</Badge>
          <h2 className="mt-6 font-display text-3xl/[1.15] text-balance text-ink sm:text-[2.5rem]/[1.1]">
            Preguntas frecuentes sobre{" "}
            <span className="text-primary-dark">hacer tu página web.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] font-body text-lg leading-relaxed text-ink-soft">
            ¿Tienes otra duda?{" "}
            <Link
              href="#contacto"
              className="font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 transition-surface duration-quick ease-state hover:text-primary hover:decoration-primary"
            >
              Escríbenos
            </Link>{" "}
            y te respondemos con franqueza, sin letra chica.
          </p>
        </Reveal>

        <Reveal delay={120} distance="lg">
          <AccordionPrimitive.Root
            type="single"
            collapsible
            defaultValue="faq-0"
            className="flex flex-col gap-2.5"
          >
            {FAQS.map((item, i) => (
              <AccordionPrimitive.Item
                key={i}
                value={`faq-${i}`}
                className="group/item relative rounded-2xl border border-line bg-surface/60 transition-card duration-slow ease-state hover:bg-surface/90 data-[state=open]:border-primary/30 data-[state=open]:bg-surface data-[state=open]:shadow-soft"
              >
                {/* Lomo de acento: crece cuando el ítem abre. Es lo que permite
                    ver de un vistazo, desde el margen, cuál está abierto. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 left-0 top-4 w-[3px] origin-center scale-y-0 rounded-full bg-accent transition-transform duration-slow ease-state group-data-[state=open]/item:scale-y-100"
                />

                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group/trigger flex flex-1 items-start justify-between gap-5 rounded-2xl px-6 py-5 text-left focus-visible:transition-none">
                    <span className="font-display text-[1.15rem] leading-snug text-ink transition-colors duration-quick ease-state group-hover/trigger:text-primary-dark sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-background/60 text-accent-ink transition-surface duration-slow ease-state group-hover/trigger:border-primary/40 group-data-[state=open]/trigger:border-primary group-data-[state=open]/trigger:bg-primary group-data-[state=open]/trigger:text-surface"
                    >
                      <Plus
                        className="h-4 w-4 transition-transform duration-slow ease-spring group-data-[state=open]/trigger:rotate-45"
                        strokeWidth={2.25}
                      />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[48ch] px-6 pb-6 pr-8 font-body text-base leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  );
}
