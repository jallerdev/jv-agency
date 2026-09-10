import type { Encabezado, Enlace, Texto } from "@/content/types";

export type Pregunta = { q: Texto; a: Texto };
export type Faq = Encabezado & {
  preguntas: readonly Pregunta[];
  cierre: { texto: Texto; enlace: Enlace };
};

export const FAQ: Faq = {
  eyebrow: { es: "Preguntas frecuentes", en: "FAQ" },
  titulo: {
    es: "Preguntas frecuentes sobre hacer tu página web.",
    en: "Frequent questions about building your site.",
  },
  acento: { es: "hacer tu página web.", en: "building your site." },
  preguntas: [
    {
      q: {
        es: "¿Por qué contratar a una sola persona y no a un diseñador y un programador por aparte?",
        en: "Why hire one person instead of a designer and a developer separately?",
      },
      a: {
        es: "Porque coordinar a dos que no se hablan sale más caro y más lento. Yo diseño pensando en cómo se va a construir, y construyo respetando el diseño. Menos reprocesos y menos correos en copia.",
        en: "Because coordinating two people who don't talk to each other costs more and takes longer. I design thinking about how it will be built, and I build respecting the design. Less rework, fewer people cc'd.",
      },
    },
    {
      /* La objeción de fondo, dicha por su nombre y de primera. Esconderla no
         la desactiva: el que la tiene en la cabeza la va a hacer igual, y
         prefiere leer la respuesta aquí que quedarse con la duda. */
      q: {
        es: "¿Trabajas solo? ¿Qué pasa si desapareces?",
        en: "You work alone? What happens if you disappear?",
      },
      a: {
        es: "Trabajo solo, sí, y por eso no tomo veinte proyectos a la vez. Todo lo que construyo queda documentado, y el código y los accesos son tuyos desde el primer día: si mañana quieres seguir con otra persona, puedes, sin quedar amarrado a mí.",
        en: "I do work alone, and that's why I don't take on twenty projects at once. Everything I build is documented, and the code and the access are yours from day one: if tomorrow you want to continue with someone else, you can, without being tied to me.",
      },
    },
    {
      q: {
        es: "¿Trabajas con negocios pequeños o solo con empresas grandes?",
        en: "Do you work with small businesses or only large companies?",
      },
      a: {
        es: "Trabajo con PYMEs y emprendedores que ya tienen clientes y quieren una web o un software que esté a la altura de lo que venden. Si estás en ese punto, encajamos.",
        en: "I work with small businesses and founders who already have customers and want a site or software that matches what they sell. If that's where you are, we're a fit.",
      },
    },
    {
      q: { es: "¿Cuánto cuesta?", en: "How much does it cost?" },
      a: {
        es: "Está publicado en la página de precios: una página web arranca en $850.000 y una tienda online en $2.500.000. No hay que sacarme el número en una reunión.",
        en: "It's published on the pricing page: a website starts at $850,000 COP and an online store at $2,500,000. You don't have to pry the number out of me in a meeting.",
      },
    },
    {
      /* El plazo lo confirmó Luis el 9 de septiembre de 2026. Lo que resuelve
         la contradicción no es el número sino DESDE CUÁNDO cuenta: el reloj
         arranca con el material en la mano, no con la propuesta aceptada. Sin
         esa frase, «5 días» es una promesa que el cliente puede romper solo. */
      q: { es: "¿Cuánto tarda un proyecto?", en: "How long does a project take?" },
      a: {
        es: "Depende del tipo, y el reloj arranca cuando tengo el material —contenido, marca y accesos—, no cuando aceptas la propuesta. Una landing page sale en 5 días. Una web corporativa toma de 1 a 2 semanas. Una tienda online, de 3 a 5. Un chatbot de WhatsApp, de 1 a 5 semanas según lo que automatices. Un software a la medida varía más y lo estimo contigo antes de empezar. Si los textos los escribo yo, ese tiempo ya está contado.",
        en: "It depends on the type, and the clock starts when I have the material —content, brand and access—, not when you accept the proposal. A landing page ships in 5 days. A corporate site takes 1 to 2 weeks. An online store, 3 to 5. A WhatsApp chatbot, 1 to 5 weeks depending on what you automate. Custom software varies more and I estimate it with you before starting. If I write the copy, that time is already counted.",
      },
    },
    {
      q: {
        es: "¿Haces marketing o publicidad también?",
        en: "Do you do marketing or advertising too?",
      },
      a: {
        es: "Hago SEO —que te encuentren en Google sin pagar por cada clic— y chatbots de WhatsApp. Lo que no hago es pauta pagada: no manejo tu presupuesto de anuncios en Meta ni en Google Ads, ni community management. Prefiero decírtelo antes que cobrarte por algo que no es lo mío. Si necesitas pauta, te dejo la landing y el píxel listos para que quien la maneje trabaje sobre terreno firme.",
        en: "I do SEO —so they find you on Google without paying per click— and WhatsApp chatbots. What I don't do is paid ads: I don't run your Meta or Google Ads budget, or community management. I'd rather tell you upfront than charge you for something that isn't my craft. If you need ads, I'll leave the landing page and the pixel ready so whoever runs them works on solid ground.",
      },
    },
    {
      q: {
        es: "¿Qué pasa después de entregar? ¿Me quedo solo?",
        en: "What happens after delivery? Am I on my own?",
      },
      a: {
        es: "No. La entrega incluye capacitación y 30 días de ajustes sin costo. De ahí en adelante hay planes de mantenimiento mensual —desde el que solo vigila que el sitio no se caiga hasta el que le hace mejoras cada mes— y te paso el que corresponda con su precio en la propuesta. Si prefieres no contratar ninguno, el sitio es tuyo igual y sigue funcionando.",
        en: "No. Delivery includes training and 30 days of adjustments at no cost. From there, there are monthly maintenance plans —from one that just watches the site stays up to one that improves it every month— and I include the right one with its price in the proposal. If you'd rather not take any, the site is yours anyway and keeps working.",
      },
    },
    {
      q: { es: "¿Cómo empiezo?", en: "How do I start?" },
      a: {
        es: "Agenda una llamada de diagnóstico sin costo. Reviso tu situación, te digo con franqueza si te puedo ayudar y, si encajamos, te armo una propuesta a tu medida.",
        en: "Book a free diagnosis call. I look at your situation, tell you straight whether I can help and, if we're a fit, put together a proposal for you.",
      },
    },
  ],
  cierre: {
    texto: { es: "¿Tienes otra duda?", en: "Another question?" },
    enlace: {
      texto: { es: "Escríbeme", en: "Write to me" },
      href: { es: "/#agenda", en: "/en#agenda" },
    },
  },
};
