import { Building2, Store, UserRound, Wrench } from "lucide-react";

import type { Ciudad } from "./tipos";

/**
 * MEDELLÍN
 * ──────────────────────────────────────────────────────────────────────────
 * EL ÁNGULO: Medellín se vende como ciudad de tecnología —Ruta N, distrito de
 * innovación, «la Medellín del futuro»— y esa narrativa es real pero no es
 * mayoritaria. El 93,1 % de su base empresarial son microempresas. La página
 * se dirige a ese 93,1 %, que es el que no aparece en ninguna keynote.
 *
 * Y ES EL ÁNGULO MÁS HONESTO QUE HAY ACÁ, porque el argumento de cercanía no
 * existe: Medellín está a unos 640 km de Turbaco y no hay un solo proyecto
 * entregado allá.
 *
 * FUENTE ÚNICA: Cámara de Comercio de Medellín para Antioquia, «Estudio
 * Económico 2024». Datos de stock a 2024 sobre su jurisdicción, que no es solo
 * el municipio de Medellín sino los 69 que le corresponden — y eso se dice en
 * el pie, porque redondearlo a «Medellín» sería inflar la cifra.
 */
export const MEDELLIN: Ciudad = {
  nombre: "Medellín",
  region: "Antioquia",
  ruta: "/diseno-de-paginas-web-en-medellin",
  badge: "Medellín · a distancia",

  tituloAcento: "desde Bolívar y a distancia",
  entradilla: [
    "Medellín se cuenta como ciudad de tecnología, y lo es. Pero el 93,1 % de las empresas de su cámara de comercio son microempresas: 148.014 de 158.831.",
    "Esta página está escrita para esas, no para la startup que levantó ronda. Si tu negocio es uno o dos locales y un WhatsApp que no para, estás en la página correcta.",
  ],

  metaDescripcion:
    "Diseño y programo páginas web para negocios de Medellín desde $850.000 y en 5 días. Trabajo a distancia desde Bolívar: no tengo oficina en Antioquia y te lo digo de una.",
  ogDescripcion:
    "Páginas web para negocios de Medellín desde $850.000 y en 5 días. A distancia, desde Bolívar, y hablando siempre con quien programa.",

  confesion: {
    titulo: "Antes de seguir:",
    tituloAcento: " trabajo Medellín a distancia, desde Bolívar.",
    parrafos: [
      "Vivo en Turbaco, Bolívar, a unos 640 kilómetros. No tengo oficina en Antioquia y todavía no hay un proyecto entregado allá: cuando lo haya, va en esta misma página con nombre y con enlace.",
      "A distancia significa videollamada para arrancar, WhatsApp para el día a día y un enlace donde ves el sitio crecer antes de que salga. Es como trabajé Bloomrose, que está en línea y se puede abrir ahora mismo.",
      "Y hablas con quien programa. No hay ejecutivo de cuenta repitiéndote lo que le dijo el diseñador: el que te cotiza es el que te contesta el WhatsApp seis meses después.",
    ],
  },

  paradas: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Medellín", distancia: "≈ 640 km", nota: "A distancia, y lo digo yo primero." },
  ],

  datosTitulo: "El negocio promedio de Medellín no está en el Poblado",
  datosEntradilla:
    "La ciudad que sale en las conferencias y la ciudad del registro mercantil no son la misma. Micro y pequeña juntas son el 98,2 % de la base: el tejido real es de local, taller y consultorio.",
  datos: [
    {
      icon: Store,
      dato: "93,1 %",
      titulo: "Microempresas",
      desc: "148.014 unidades de 158.831. Es el negocio de uno a nueve empleados, el que vende por WhatsApp y necesita que el catálogo se vea bien en un teléfono, no un portal con intranet.",
    },
    {
      icon: UserRound,
      dato: "56,2 %",
      titulo: "Personas naturales",
      desc: "Más de la mitad de la base no son sociedades: son una persona con registro mercantil. Yo también soy una de esas, así que la conversación empieza de igual a igual.",
    },
    {
      icon: Building2,
      dato: "43,8 %",
      titulo: "Personas jurídicas, y subiendo",
      desc: "Venían del 36,2 % en 2016. Antioquia se está formalizando rápido, y una empresa que acaba de constituirse es justo la que descubre que su presencia en línea es un perfil de Instagram.",
    },
    {
      icon: Wrench,
      dato: "5,1 %",
      titulo: "Pequeñas empresas",
      desc: "8.175 unidades, y la única categoría que no cayó ni en pandemia. Son las que ya tienen a alguien encargado del mercadeo y saben exactamente qué le falta a su sitio.",
    },
  ],
  fuente: {
    texto:
      "Cámara de Comercio de Medellín para Antioquia, «Estudio Económico 2024»",
    url: "https://www.camaramedellin.com.co/Portals/0/Documentos/Transparencia/obligacion-reportes-entidad/ESTUDIO_ECONOMICO_2024_CCMA.pdf",
    periodo:
      "Stock de empresas matriculadas y renovadas a 2024. La jurisdicción de la CCMA cubre 69 municipios de Antioquia, no solo el municipio de Medellín.",
  },

  precioNota:
    "No compito por ser el más barato de Medellín: compito porque el precio está publicado y el tuyo es el mismo que le cobro a un negocio de Turbaco. No sube porque tu dirección diga Antioquia.",

  sinCliente: {
    rotulo: "La casilla de Antioquia",
    texto:
      "Todavía no hay un proyecto entregado en Medellín. Cuando lo haya, va aquí, con nombre y con enlace.",
  },

  faqs: [
    {
      q: "¿Tienes clientes en Medellín?",
      a: "No, todavía no, y prefiero decírtelo yo antes de que lo averigües tú. Lo que tengo publicado es trabajo de la costa y dos productos propios, y todo se abre con un clic. El día que haya un proyecto antioqueño entregado, va a estar en esta página con nombre y con enlace.",
    },
    {
      q: "Medellín está llena de agencias y de desarrolladores. ¿Por qué contratar a alguien de Bolívar?",
      a: "Por una sola razón, y si no te pesa no me contrates: hablas con quien hace el trabajo. En Medellín consigues estudios excelentes, y también consigues agencias donde el que te vende no es el que programa y a los tres meses ya no sabes con quién hablar. Yo soy uno solo, lo cual es una limitación y también es la garantía.",
    },
    {
      q: "¿Puedes venir a una reunión presencial?",
      a: "Puedo viajar si el proyecto lo justifica, y el viaje se acuerda aparte y por escrito antes de empezar. Pero lo normal es que no vaya: son 640 kilómetros. Si tu proyecto necesita a alguien sentado en tu oficina cada semana, contrata a alguien de Medellín.",
    },
    {
      q: "¿El precio sube porque estoy en Medellín?",
      a: "No. Es el mismo precio que le cobro a un negocio de Turbaco. No tengo oficina que pagar en El Poblado, así que no hay ningún costo que trasladarte por tu dirección.",
    },
    {
      q: "¿En cuánto salgo primero en Google en Medellín?",
      a: "No te lo puedo prometer, y desconfía de quien te lo prometa. Lo que sí hago es entregar el sitio técnicamente en orden desde el primer día: velocidad, estructura, datos para Google y ficha de negocio. Los primeros movimientos se ven entre el mes 3 y el 6, y Medellín es de las búsquedas más peleadas del país después de Bogotá: ahí no esperes menos.",
    },
    {
      q: "Mi negocio es una tienda de barrio en Belén o en Robledo. ¿Esto es para mí?",
      a: "Puede que sí y puede que no, y eso se decide en veinte minutos de llamada, no antes. Si vives de quien pasa por enfrente y ya tienes ficha de Google bien puesta, a veces la página puede esperar. Lo escribí completo, con los criterios para decidirlo.",
      href: "/blog/mi-negocio-necesita-pagina-web",
      hrefLabel: "¿Mi negocio necesita página web?",
    },
  ],

  cierreTitulo: "Cuéntame qué vende tu negocio y en qué comuna estás",
  cierreCuerpo:
    "En veinte minutos sabemos si esto te sirve, cuánto costaría y en cuánto quedaría en línea. Si te conviene más alguien de Medellín, te lo digo en esa misma llamada.",

  alternos: [
    "Diseño web Medellín",
    "Páginas web en Medellín",
    "Creación de páginas web Medellín",
    "Diseño de páginas web Antioquia",
  ],
};
