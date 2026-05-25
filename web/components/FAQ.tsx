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
    a: "Una web suele tomar de 4 a 8 semanas según el alcance; un software a medida varía más y lo estimamos contigo. En la primera llamada te damos un cronograma realista, sin promesas que no podamos cumplir.",
  },
  {
    q: "¿Hacen marketing o publicidad también?",
    a: "No. Nos enfocamos en lo que hacemos bien: diseño web, desarrollo y software a medida. Preferimos decirte con franqueza que eso no es lo nuestro antes que prometer humo.",
  },
  {
    q: "¿Qué pasa después de entregar? ¿Me quedo solo?",
    a: "No. Pensamos en relaciones de largo plazo. Te dejamos todo documentado y ofrecemos planes de acompañamiento para que la marca siga creciendo con método.",
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
            Lo que seguro
            <span className="text-metal"> te estás preguntando.</span>
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
