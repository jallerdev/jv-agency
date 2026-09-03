import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <Reveal>
          <Badge>Preguntas frecuentes</Badge>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Preguntas frecuentes sobre
            <span className="text-metal"> hacer tu página web.</span>
          </h2>
          <p className="mt-5 font-body text-ink-soft">
            ¿Tienes otra duda? Escríbenos y te respondemos con franqueza, sin letra chica.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
