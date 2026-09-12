import { BedDouble, Store, UserRound, Waves } from "lucide-react";

import type { Ciudad } from "./tipos";

/**
 * SANTA MARTA
 * ──────────────────────────────────────────────────────────────────────────
 * ES LA ÚNICA DE LAS CUATRO NUEVAS DONDE LA CERCANÍA ES VERDAD. Turbaco está
 * a unos 250 km por la costa —unas cuatro horas, pasando por Barranquilla—,
 * que es lejos para un martes cualquiera pero es un viaje de ida y vuelta en
 * el día si el proyecto lo justifica. Con Medellín, Cali o Bucaramanga eso no
 * se puede decir, y por eso allá no se dice.
 *
 * EL ÁNGULO: turismo. De las 2.756 empresas nuevas de la capital en 2025, 533
 * son alojamiento y servicios de comida: casi una de cada cinco. En ese
 * negocio el cliente reserva desde otra ciudad, antes de viajar y sin haber
 * pasado nunca por enfrente, así que la web NO es la vitrina del local: es el
 * local. Es el único de los siete sitios de ciudad donde eso es literal.
 *
 * FUENTE: acá es más débil que en las otras tres y hay que decirlo. No hay
 * boletín público equivalente al de Bogotá o Cali; las cifras salen de una
 * entrevista de La República con la presidenta ejecutiva de la Cámara de
 * Comercio de Santa Marta para el Magdalena. Es atribuible y comprobable, pero
 * es una entrevista, no un informe con metodología — y el pie lo dice.
 */
export const SANTA_MARTA: Ciudad = {
  nombre: "Santa Marta",
  region: "Magdalena",
  ruta: "/diseno-de-paginas-web-en-santa-marta",
  badge: "Santa Marta · misma costa",

  tituloAcento: "desde la misma costa",
  entradilla: [
    "De las 2.756 empresas que nacieron en Santa Marta en 2025, 533 son alojamiento y comida: casi una de cada cinco. Son negocios cuyo cliente reserva desde otra ciudad, sin haber pasado nunca por enfrente.",
    "Ahí la página web no es la vitrina del local: es el local. Y es el único caso donde digo eso en serio.",
  ],

  metaDescripcion:
    "Diseño y programo páginas web para negocios de Santa Marta desde $850.000 y en 5 días. Trabajo desde Turbaco, Bolívar: misma costa, misma hora y viaje de ida y vuelta en el día si hace falta.",
  ogDescripcion:
    "Páginas web para hoteles, restaurantes y negocios de Santa Marta desde $850.000 y en 5 días. Desde la misma costa, hablando siempre con quien programa.",

  confesion: {
    titulo: "Antes de seguir:",
    tituloAcento: " estoy en la misma costa, a cuatro horas por la troncal.",
    parrafos: [
      "Vivo en Turbaco, Bolívar: unos 250 kilómetros por la troncal, pasando por Barranquilla. De las siete ciudades que trabajo, es la única donde ir y volver en el mismo día es posible, así que una reunión presencial se puede arreglar.",
      "No tengo oficina en el Magdalena y todavía no hay un proyecto entregado allá: cuando lo haya, va en esta misma página con nombre y con enlace. Mientras tanto, el trabajo que sí está en línea se puede abrir ahora mismo —Bloomrose, en Cartagena—.",
      "Y quien te cotiza es el mismo que diseña, programa y te contesta el WhatsApp en plena temporada alta.",
    ],
  },

  paradas: [
    { lugar: "Turbaco, Bolívar", distancia: "0 km", nota: "Aquí vivo y aquí trabajo." },
    { lugar: "Cartagena", distancia: "≈ 20 km", nota: "Nos vemos si el proyecto lo pide." },
    { lugar: "Barranquilla", distancia: "≈ 120 km", nota: "Nos vemos si el proyecto lo pide." },
    {
      lugar: "Santa Marta",
      distancia: "≈ 250 km",
      nota: "Unas cuatro horas: ida y vuelta en el día si el proyecto lo justifica.",
    },
  ],

  datosTitulo: "En Santa Marta tu cliente decide antes de llegar",
  datosEntradilla:
    "Es lo que separa a esta ciudad de las otras seis de este sitio. Un turista compara hoteles, restaurantes y tours desde su casa, a mil kilómetros, con el teléfono en la mano y sin conocerte. Lo único que tiene para decidir es lo que ve en la pantalla.",
  datos: [
    {
      icon: BedDouble,
      dato: "533",
      titulo: "Empresas nuevas de alojamiento y comida",
      desc: "De 2.756 empresas creadas en la ciudad en 2025. Casi una de cada cinco. Si abriste hotel, hostal o restaurante este año, abriste junto a otros quinientos.",
    },
    {
      icon: Store,
      dato: "962",
      titulo: "Empresas nuevas de comercio",
      desc: "El sector más grande de los nuevos registros. Artesanía, ropa, souvenirs, tiendas de barrio: negocios que viven de que los vean, y que hoy compiten con los que sí salen en Google.",
    },
    {
      icon: Waves,
      dato: "97 %",
      titulo: "Microempresas en el Magdalena",
      desc: "28.247 de 29.117. Pequeñas 615, medianas 176 y grandes 79. Es un tejido casi enteramente pequeño, y casi enteramente estacional.",
    },
    {
      icon: UserRound,
      dato: "232 de 290",
      titulo: "Cancelaciones que eran personas naturales",
      desc: "De las 290 empresas canceladas, 232 estaban a nombre de una persona y 58 eran sociedades. El negocio de una sola persona es el que más expuesto queda a una temporada mala.",
    },
  ],
  fuente: {
    texto:
      "Entrevista de La República con Silvia Elena Medina, presidenta ejecutiva de la Cámara de Comercio de Santa Marta para el Magdalena",
    url: "https://www.larepublica.co/especiales/iniciativas-de-las-camaras-de-comercio/entrevista-con-silvia-elena-medina-presidenta-ejecutiva-de-la-camara-de-comercio-de-santa-marta-quien-hablo-sobre-la-dinamica-del-tejido-empresarial-de-la-ciudad-4257279",
    periodo:
      "Datos de 2025. A diferencia de las otras ciudades de este sitio, acá la fuente es una entrevista de prensa y no un boletín con metodología publicada: tómala con esa reserva.",
  },

  precioNota:
    "Es el mismo número que le cobro a un negocio de Turbaco o de Cartagena: no sube porque tu dirección diga El Rodadero. Y si tu negocio es estacional, la conversación de cuándo arrancar la tenemos en la llamada — no es lo mismo publicar en octubre que en diciembre.",

  sinCliente: {
    rotulo: "La casilla del Magdalena",
    texto:
      "Todavía no hay un proyecto entregado en Santa Marta. Cuando lo haya, va aquí, con nombre y con enlace.",
  },

  faqs: [
    {
      q: "¿Tienes clientes en Santa Marta?",
      a: "No, todavía no, y prefiero decírtelo yo antes de que lo averigües tú. Lo que tengo publicado es trabajo de Bolívar y del Atlántico más dos productos propios, y todo se abre con un clic. El día que haya un proyecto samario entregado, va a estar en esta página con nombre y con enlace.",
    },
    {
      q: "Tengo un hotel pequeño. ¿Me sirve una página si ya estoy en Booking y Airbnb?",
      a: "Sí, y por una razón de plata: en esas plataformas pagas comisión por cada reserva, y la reserva directa no. Tu sitio no compite con Booking, lo complementa — mucha gente te descubre allá y después busca tu nombre en Google para reservarte directo o para confirmar que existes. Si ese día no encuentra nada, vuelve a Booking y te cuesta la comisión otra vez.",
    },
    {
      q: "Mi negocio solo funciona en temporada. ¿Vale la pena?",
      a: "Esa es exactamente la pregunta que hay que hacerse, y la respuesta depende de tus números, no de mi opinión. Haz la cuenta al revés: cuánto te deja en promedio un cliente, cuántos necesitarías para pagar el sitio, y si esos caben en tus dos o tres temporadas buenas. Si el número no cierra, te lo digo en la llamada.",
    },
    {
      q: "¿Puedes venir a una reunión presencial?",
      a: "Acá sí, y es lo que hace distinta esta página de las de Medellín o Cali. Son unas cuatro horas por la troncal: si el proyecto lo justifica, el viaje se coordina y antes de empezar acordamos cuántas visitas entran, para que no aparezca de sorpresa en la factura. Lo normal, eso sí, es que todo se resuelva por videollamada.",
    },
    {
      q: "¿En cuánto salgo primero en Google en Santa Marta?",
      a: "No te lo puedo prometer, y desconfía de quien te lo prometa. Lo que sí hago es entregar el sitio técnicamente en orden desde el primer día: velocidad, estructura, datos para Google y ficha de negocio. Los primeros movimientos se ven entre el mes 3 y el 6, así que si quieres estar listo para diciembre, la conversación es en julio o agosto.",
    },
    {
      q: "¿El precio sube porque estoy en Santa Marta?",
      a: "No. Es el mismo precio que le cobro a un negocio de Turbaco. Lo único que se cotiza aparte, y solo si hace falta, es un viaje.",
    },
  ],

  cierreTitulo: "Cuéntame qué vende tu negocio y en qué zona de la ciudad estás",
  cierreCuerpo:
    "En veinte minutos sabemos si esto te sirve, cuánto costaría y en cuánto quedaría en línea. Si lo que necesitas es alguien de allá, te lo digo en esa misma llamada.",

  alternos: [
    "Diseño web Santa Marta",
    "Páginas web en Santa Marta",
    "Creación de páginas web Santa Marta",
    "Diseño de páginas web Magdalena",
  ],
};
