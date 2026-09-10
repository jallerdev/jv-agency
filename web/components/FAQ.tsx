"use client";

import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Faqs, type Faq } from "@/components/Faqs";

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

const FAQS: Faq[] = [
  {
    q: "¿Por qué contratar a una sola persona y no a un diseñador y un programador por aparte?",
    a: "Porque coordinar a dos que no se hablan sale más caro y más lento. Yo diseño pensando en cómo se va a construir, y construyo respetando el diseño. Menos reprocesos y menos correos en copia.",
  },
  {
    /* La objeción de fondo, dicha por su nombre y de primera. Esconderla no la
       desactiva: el que la tiene en la cabeza la va a hacer igual, y prefiere
       leer la respuesta aquí que quedarse con la duda. */
    q: "¿Trabajas solo? ¿Qué pasa si desapareces?",
    a: "Trabajo solo, sí, y por eso no tomo veinte proyectos a la vez. Todo lo que construyo queda documentado, y el código y los accesos son tuyos desde el primer día: si mañana quieres seguir con otra persona, puedes, sin quedar amarrado a mí.",
  },
  {
    q: "¿Trabajas con negocios pequeños o solo con empresas grandes?",
    a: "Trabajo con PYMEs y emprendedores que ya tienen clientes y quieren una web o un software que esté a la altura de lo que venden. Si estás en ese punto, encajamos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Está publicado en la página de precios: una página web arranca en $850.000 y una tienda online en $2.500.000. No hay que sacarme el número en una reunión.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    /* Plazos confirmados por Luis el 9 de septiembre de 2026. Lo que resuelve
       la contradiccion no es el numero sino DESDE CUANDO cuenta: el reloj
       arranca con el material en la mano, no con la propuesta aceptada. Sin
       esa frase, «5 dias» es una promesa que el cliente puede romper solo. */
    a: "Depende del tipo, y el reloj arranca cuando tengo el material —contenido, marca y accesos—, no cuando aceptas la propuesta. Una landing page sale en 5 días. Una web corporativa toma de 1 a 2 semanas. Una tienda online, de 3 a 5. Un chatbot de WhatsApp, de 1 a 5 semanas según lo que automatices. Un software a la medida varía más y lo estimo contigo antes de empezar. Si los textos los escribo yo, ese tiempo ya está contado.",
  },
  {
    q: "¿Haces marketing o publicidad también?",
    a: "Hago SEO —que te encuentren en Google sin pagar por cada clic— y chatbots de WhatsApp. Lo que no hago es pauta pagada: no manejo tu presupuesto de anuncios en Meta ni en Google Ads, ni community management. Prefiero decírtelo antes que cobrarte por algo que no es lo mío. Si necesitas pauta, te dejo la landing y el píxel listos para que quien la maneje trabaje sobre terreno firme.",
  },
  {
    q: "¿Qué pasa después de entregar? ¿Me quedo solo?",
    a: "No. La entrega incluye capacitación y 30 días de ajustes sin costo. De ahí en adelante hay planes de mantenimiento mensual —desde el que solo vigila que el sitio no se caiga hasta el que le hace mejoras cada mes— y te paso el que corresponda con su precio en la propuesta. Si prefieres no contratar ninguno, el sitio es tuyo igual y sigue funcionando.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Agenda una llamada de diagnóstico sin costo. Reviso tu situación, te digo con franqueza si te puedo ayudar y, si encajamos, te armo una propuesta a tu medida.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* El encabezado se queda quieto mientras se leen las preguntas: en una
            columna de ítems que crecen al abrirse, el titular ya no se va por
            arriba a la tercera pregunta. */}
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
              Escríbeme
            </Link>{" "}
            y te respondo con franqueza, sin letra chica.
          </p>
        </Reveal>

        <Reveal delay={120} distance="lg">
          <Faqs items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
