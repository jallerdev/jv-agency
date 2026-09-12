import { Building2, Store, TrendingUp, Wrench } from "lucide-react";

import type { Ciudad } from "./tipos";

/**
 * BUCARAMANGA
 * ──────────────────────────────────────────────────────────────────────────
 * EL ÁNGULO: es la más micro de las cuatro —96,4 % del tejido— y a la vez la
 * que más rápido se está formalizando: la creación de sociedades subió 7,4 %
 * en 2025 y el total de empresas activas creció 4,6 %. Las dos cosas juntas
 * describen exactamente al cliente de esta página: un negocio pequeño que
 * acaba de constituirse y al que se le nota que su presencia en línea se quedó
 * en el perfil de Instagram de cuando era informal.
 *
 * Y ES LA CIUDAD DONDE MENOS COMPETENCIA DE ESTUDIOS HAY de las cuatro, lo
 * cual NO se dice en la página: no tengo con qué probarlo y una afirmación así
 * sin fuente es exactamente lo que esta página no hace.
 *
 * FUENTE ÚNICA: Cámara de Comercio de Bucaramanga, «Demografía y Dinámica
 * Empresarial 2025». Los datos son de Santander, no solo del área
 * metropolitana, y eso va escrito en el pie.
 */
export const BUCARAMANGA: Ciudad = {
  nombre: "Bucaramanga",
  region: "Santander",
  ruta: "/diseno-de-paginas-web-en-bucaramanga",
  badge: "Bucaramanga · a distancia",

  tituloAcento: "desde Bolívar y a distancia",
  entradilla: [
    "Santander cerró 2025 con 91.293 empresas activas, un 4,6 % más que el año anterior. El 96,4 % son microempresas: es el tejido más micro de las ciudades grandes del país.",
    "Esta página está escrita para ese negocio: uno o dos locales y un WhatsApp que no para.",
  ],

  metaDescripcion:
    "Diseño y programo páginas web para negocios de Bucaramanga desde $850.000 y en 5 días. Trabajo a distancia desde Bolívar: no tengo oficina en Santander y te lo digo de una.",
  ogDescripcion:
    "Páginas web para negocios de Bucaramanga desde $850.000 y en 5 días. A distancia, desde Bolívar, y hablando siempre con quien programa.",

  confesion: {
    titulo: "Antes de seguir:",
    tituloAcento: " no tengo oficina en Bucaramanga ni cliente en Santander.",
    parrafos: [
      "Vivo en Turbaco, Bolívar, a unos 550 kilómetros de la Mesa de Ruitoque. Hoy no tengo un solo proyecto entregado en Santander, y no te voy a poner una dirección de Cabecera en el pie de página.",
      "Si lo primero que necesitas es alguien que se te siente al frente, te ahorro la llamada: no soy yo. Si lo que necesitas es que quien te cotiza sea el mismo que diseña, programa y te contesta el WhatsApp seis meses después, sigue leyendo.",
    ],
  },

  paradas: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Bucaramanga", distancia: "≈ 550 km", nota: "A distancia, y lo digo yo primero." },
  ],

  datosTitulo: "Santander se está formalizando, y eso se nota en la web",
  datosEntradilla:
    "Casi todo el tejido es microempresa, pero la creación de sociedades subió 7,4 % en 2025. Un negocio que acaba de constituirse suele descubrir lo mismo: que su presencia en línea sigue siendo la de cuando era informal.",
  datos: [
    {
      icon: Store,
      dato: "96,4 %",
      titulo: "Microempresas",
      desc: "El tejido más micro de las ciudades grandes del país. De uno a nueve empleados: lo que necesita es catálogo, horario y un botón de WhatsApp que funcione, no un portal con intranet.",
    },
    {
      icon: Building2,
      dato: "+7,4 %",
      titulo: "Sociedades nuevas en 2025",
      desc: "La formalización va rápido. Y el momento en que un negocio pasa de persona natural a sociedad es justo cuando descubre que su sitio —si lo tiene— dice todavía el nombre viejo.",
    },
    {
      icon: Wrench,
      dato: "43,8 %",
      titulo: "Comercio",
      desc: "El sector que lidera el mercado regional, con ingresos por encima de $21,5 billones. Calzado, confección, alimentos y metalmecánica: negocios que venden producto y necesitan enseñarlo bien.",
    },
    {
      icon: TrendingUp,
      dato: "91.293",
      titulo: "Empresas activas",
      desc: "Al cierre de 2025, un 4,6 % más que el año anterior. Crecer así significa que tu competencia directa también abrió este año, y casi seguro con el mismo Instagram improvisado que tú.",
    },
  ],
  fuente: {
    texto:
      "Cámara de Comercio de Bucaramanga, «Demografía y Dinámica Empresarial 2025»",
    url: "https://www.camaradirecta.com/imagenes/vdo_conexion/cone_bfdbfb7580838103231dab73a8b93051638da234.pdf",
    periodo:
      "Cierre de 2025. Las cifras son del departamento de Santander, jurisdicción de la Cámara, no solo del área metropolitana de Bucaramanga.",
  },

  precioNota:
    "No te voy a decir que soy el más barato de Bucaramanga, porque no lo sé. Es el mismo número que le cobro a un negocio de Turbaco: no sube porque tu dirección diga Santander.",

  sinCliente: {
    rotulo: "Sin cliente de Santander",
    texto:
      "Todavía no hay un proyecto entregado en Bucaramanga. Cuando lo haya, va aquí, con nombre y con enlace.",
  },

  faqs: [
    {
      q: "¿Tienes clientes en Bucaramanga?",
      a: "No, todavía no, y prefiero decírtelo yo antes de que lo averigües tú. Lo que tengo publicado es trabajo de la costa y dos productos propios, y todo se abre con un clic. El día que haya un proyecto santandereano entregado, va a estar en esta página con nombre y con enlace.",
    },
    {
      q: "Acabo de constituir la empresa. ¿Qué necesito primero, página o redes?",
      a: "Depende de qué vendas, y eso se decide en la llamada. Como regla: si tu cliente te busca por nombre —porque se lo recomendaron— necesitas sitio, porque un perfil de Instagram no sostiene una búsqueda de marca. Si tu cliente te descubre navegando, las redes pesan más. Lo normal es que hagan falta las dos, y el orden importa menos que empezar por la que hoy te está costando plata.",
    },
    {
      q: "¿Puedes venir a una reunión presencial?",
      a: "Puedo viajar si el proyecto lo justifica, y el viaje se acuerda aparte y por escrito antes de empezar. Pero lo normal es que no vaya: son unos 550 kilómetros. Si tu proyecto necesita a alguien sentado en tu oficina cada semana, contrata a alguien de Bucaramanga.",
    },
    {
      q: "¿El precio sube porque estoy en Bucaramanga?",
      a: "No. Es el mismo precio que le cobro a un negocio de Turbaco. No tengo oficina que pagar en Cabecera, así que no hay ningún costo que trasladarte por tu dirección.",
    },
    {
      q: "¿En cuánto salgo primero en Google en Bucaramanga?",
      a: "No te lo puedo prometer, y desconfía de quien te lo prometa. Lo que sí hago es entregar el sitio técnicamente en orden desde el primer día: velocidad, estructura, datos para Google y ficha de negocio. Los primeros movimientos se ven entre el mes 3 y el 6.",
    },
    {
      q: "¿Y si el negocio no necesita página web todavía?",
      a: "Pasa, y más de lo que uno creería. Si vives de quien pasa por enfrente y tu ficha de Google ya está bien puesta, a veces conviene esperar. Escribí un artículo entero con los criterios para decidirlo.",
      href: "/blog/mi-negocio-necesita-pagina-web",
      hrefLabel: "¿Mi negocio necesita página web?",
    },
  ],

  cierreTitulo: "Cuéntame qué vende tu negocio y en qué zona estás",
  cierreCuerpo:
    "En veinte minutos sabemos si esto te sirve, cuánto costaría y en cuánto quedaría en línea. Si te conviene más alguien de Bucaramanga, te lo digo en esa misma llamada.",

  alternos: [
    "Diseño web Bucaramanga",
    "Páginas web en Bucaramanga",
    "Creación de páginas web Bucaramanga",
    "Diseño de páginas web Santander",
  ],
};
