import { Store, TrendingUp, UserRound, Utensils } from "lucide-react";

import type { Ciudad } from "./tipos";

/**
 * CALI
 * ──────────────────────────────────────────────────────────────────────────
 * EL ÁNGULO: de las cuatro ciudades nuevas, Cali es la que tiene la mayor
 * proporción de personas naturales sobre personas jurídicas —68.360 contra
 * 42.335, o sea el 61,8 %—. Ahí el dueño no «tiene» el negocio: el dueño ES el
 * negocio, y su nombre legal y el del local son el mismo. Esa es la diferencia
 * que decide qué tiene que hacer la página, y por eso es el titular.
 *
 * FUENTE ÚNICA: Cámara de Comercio de Cali, «Estudio Económico Anual 2025»,
 * publicado en enero de 2026. Cifras preliminares a 2 de enero de 2026, y eso
 * se dice: la propia fuente las marca como preliminares.
 */
export const CALI: Ciudad = {
  nombre: "Cali",
  region: "Valle del Cauca",
  ruta: "/diseno-de-paginas-web-en-cali",
  badge: "Cali · a distancia",

  tituloAcento: "desde Bolívar y a distancia",
  entradilla: [
    "En la jurisdicción de la Cámara de Comercio de Cali hay 68.360 negocios registrados como persona natural y 42.335 como sociedad. Seis de cada diez no son una empresa: son una persona con su RUT.",
    "Yo también soy una de esas: diseño, programo y contesto yo. Esta página está escrita para ese negocio.",
  ],

  metaDescripcion:
    "Diseño y programo páginas web para negocios de Cali desde $850.000 y en 5 días. Trabajo a distancia desde Bolívar: no tengo oficina en el Valle y te lo digo de una.",
  ogDescripcion:
    "Páginas web para negocios de Cali desde $850.000 y en 5 días. A distancia, desde Bolívar, y hablando siempre con quien programa.",

  confesion: {
    titulo: "Antes de seguir:",
    tituloAcento: " trabajo Cali a distancia, desde Bolívar.",
    parrafos: [
      "Vivo en Turbaco, Bolívar, a unos 900 kilómetros. No tengo oficina en el Valle y todavía no hay un proyecto entregado allá: cuando lo haya, va en esta misma página con nombre y con enlace.",
      "A distancia significa videollamada para arrancar, WhatsApp para el día a día y un enlace donde ves el sitio crecer antes de que salga. Es como trabajé Bloomrose, que está en línea y se puede abrir ahora mismo.",
      "Y quien te cotiza es el mismo que diseña, programa y te contesta el WhatsApp seis meses después. Eso no cambia con la distancia.",
    ],
  },

  paradas: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Cali", distancia: "≈ 900 km", nota: "A distancia, y lo digo yo primero." },
  ],

  datosTitulo: "En Cali, seis de cada diez negocios son una persona",
  datosEntradilla:
    "Es la proporción de personas naturales más alta de las ciudades grandes del país, y cambia lo que la página tiene que hacer: no vende una marca corporativa, vende que detrás hay alguien serio y localizable.",
  datos: [
    {
      icon: UserRound,
      dato: "61,8 %",
      titulo: "Personas naturales",
      desc: "68.360 registradas como persona natural contra 42.335 sociedades. El nombre del dueño y el del negocio suelen ser el mismo, y la página tiene que sostener esa firma, no esconderla.",
    },
    {
      icon: Store,
      dato: "90,1 %",
      titulo: "Microempresas",
      desc: "99.714 de 110.695. De uno a nueve empleados: el negocio que necesita catálogo, horario y un botón de WhatsApp que funcione, no un portal con intranet.",
    },
    {
      icon: TrendingUp,
      dato: "99,3 %",
      titulo: "De lo que se matriculó en 2025",
      desc: "Casi todo lo que nace en Cali nace micro. Si acabas de abrir, tu competencia directa abrió el mismo año y está igual de improvisada en línea: ahí es donde una web decente saca ventaja barata.",
    },
    {
      icon: Utensils,
      dato: "35,8 %",
      titulo: "Comercio",
      desc: "El sector más grande, seguido de industria (11,0 %) y otros servicios (9,2 %). Cinco comunas —la 2, la 17, la 3, la 19 y la 10— concentran la mitad del tejido empresarial de la ciudad.",
    },
  ],
  fuente: {
    texto: "Cámara de Comercio de Cali, «Estudio Económico Anual 2025»",
    url: "https://www.ccc.org.co/wp-content/uploads/2026/01/ESTUDIO_ECONOMICO_ANUAL_CCC_2025.pdf",
    periodo:
      "Publicado en enero de 2026. Cifras preliminares disponibles a 2 de enero de 2026, así marcadas por la propia fuente.",
  },

  precioNota:
    "No compito por ser el más barato de Cali: compito porque el precio está publicado y el tuyo es el mismo que le cobro a un negocio de Turbaco. No sube porque tu dirección diga Valle del Cauca.",

  sinCliente: {
    rotulo: "La casilla del Valle",
    texto:
      "Todavía no hay un proyecto entregado en Cali. Cuando lo haya, va aquí, con nombre y con enlace.",
  },

  faqs: [
    {
      q: "¿Tienes clientes en Cali?",
      a: "No, todavía no, y prefiero decírtelo yo antes de que lo averigües tú. Lo que tengo publicado es trabajo de la costa y dos productos propios, y todo se abre con un clic. El día que haya un proyecto caleño entregado, va a estar en esta página con nombre y con enlace.",
    },
    {
      q: "Mi negocio está a mi nombre, no tengo empresa constituida. ¿Puedo contratarte igual?",
      a: "Sí, y es el caso más común de esta página: seis de cada diez negocios registrados en Cali están así. Yo trabajo igual: persona natural con RUT. La cuenta de cobro o la factura sale en regla, el contrato se rige por ley colombiana y tu contador no tiene ningún problema con eso.",
    },
    {
      q: "¿Puedes venir a una reunión presencial?",
      a: "Puedo viajar si el proyecto lo justifica, y el viaje se acuerda aparte y por escrito antes de empezar. Pero lo normal es que no vaya: son unos 900 kilómetros. Si tu proyecto necesita a alguien sentado en tu oficina cada semana, contrata a alguien de Cali.",
    },
    {
      q: "¿El precio sube porque estoy en Cali?",
      a: "No. Es el mismo precio que le cobro a un negocio de Turbaco. No tengo oficina que pagar en el sur, así que no hay ningún costo que trasladarte por tu dirección.",
    },
    {
      q: "¿En cuánto salgo primero en Google en Cali?",
      a: "No te lo puedo prometer, y desconfía de quien te lo prometa. Lo que sí hago es entregar el sitio técnicamente en orden desde el primer día: velocidad, estructura, datos para Google y ficha de negocio. Los primeros movimientos se ven entre el mes 3 y el 6.",
    },
    {
      q: "¿Y si el negocio no necesita página web todavía?",
      a: "Pasa, y más de lo que uno creería. Si vives de quien pasa por enfrente y tu ficha de Google ya está bien puesta, a veces conviene esperar. Escribí un artículo entero con los criterios para decidirlo.",
      href: "/blog/mi-negocio-necesita-pagina-web",
      hrefLabel: "¿Mi negocio necesita página web?",
    },
  ],

  cierreTitulo: "Cuéntame qué vende tu negocio y en qué comuna estás",
  cierreCuerpo:
    "En veinte minutos sabemos si esto te sirve, cuánto costaría y en cuánto quedaría en línea. Si te conviene más alguien de Cali, te lo digo en esa misma llamada.",

  alternos: [
    "Diseño web Cali",
    "Páginas web en Cali",
    "Creación de páginas web Cali",
    "Diseño de páginas web Valle del Cauca",
  ],
};
