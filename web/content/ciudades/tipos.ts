import type { LucideIcon } from "lucide-react";

import type { ParadaDistancia } from "@/components/visuales/RailDistancia";

/**
 * LA FORMA DE UNA PÁGINA DE CIUDAD
 * ──────────────────────────────────────────────────────────────────────────
 * Cartagena, Barranquilla y Bogotá son tres archivos de ~760 líneas cada uno,
 * escritos a mano antes de que existiera este tipo. No se tocan: son las tres
 * URL de ciudad que ya están indexadas y el rediseño no tiene por qué poner en
 * juego su posicionamiento para ganar elegancia de código. Portarlas es un
 * trabajo aparte, y verificable, cuando alguien quiera hacerlo.
 *
 * Las CUATRO NUEVAS —Medellín, Cali, Bucaramanga, Santa Marta— sí nacen sobre
 * este tipo y sobre `components/paginas/Ciudad.tsx`, porque cuatro copias más
 * del mismo archivo de 760 líneas serían siete sitios donde subir un precio.
 *
 * LA REGLA QUE NO SE PUEDE ROMPER, y es la que separa esta página de una
 * doorway page: `confesion`, `sinCliente` y `datos` son OBLIGATORIOS. Una
 * página de ciudad sin datos propios de esa ciudad y sin la confesión de que
 * no hay oficina ni cliente allá es exactamente lo que Google castiga: tres
 * párrafos genéricos con el topónimo cambiado. Si algún día alguien quiere
 * publicar una quinta ciudad y no encuentra el boletín de su cámara de
 * comercio, la respuesta correcta es no publicarla.
 */

/** Un dato del registro mercantil de la ciudad, con su lectura para el cliente. */
export type DatoCiudad = {
  icon: LucideIcon;
  /** La cifra tal cual se enseña, con su signo: «93,1 %», «28.247». */
  dato: string;
  titulo: string;
  desc: string;
};

/** La fuente de las cifras. Una sola por ciudad, para poder auditarla. */
export type FuenteCiudad = {
  /** Cómo se nombra en el pie: entidad, título del documento. */
  texto: string;
  url: string;
  /** Fecha y periodo de los datos, tal como los declara la fuente. */
  periodo: string;
};

export type Ciudad = {
  /** «Medellín». Va en el h1, el title y el schema. */
  nombre: string;
  /** Departamento, para el `PostalAddress` del JSON-LD. */
  region: string;
  /** La ruta, sin dominio: `/diseno-de-paginas-web-en-medellin`. */
  ruta: string;
  /** Lo que se lee en la pastilla del encabezado: «Medellín · a distancia». */
  badge: string;

  /** Segunda línea del h1, en metal. */
  tituloAcento: string;
  /** Los dos párrafos del encabezado. El primero lleva la cifra. */
  entradilla: readonly [string, string];

  /** La descripción del `<meta>` y la del Open Graph. */
  metaDescripcion: string;
  ogDescripcion: string;

  /** LA CONFESIÓN. Titular y párrafos. Va arriba y no se recorta. */
  confesion: {
    titulo: string;
    tituloAcento: string;
    parrafos: readonly string[];
  };

  /** Las paradas del rail de distancia, terminando en esta ciudad. */
  paradas: readonly ParadaDistancia[];

  /** El titular y el párrafo del bloque de datos. */
  datosTitulo: string;
  datosEntradilla: string;
  datos: readonly DatoCiudad[];
  fuente: FuenteCiudad;

  /** El párrafo bajo «Lo que cobro, escrito». Menciona la ciudad. */
  precioNota: string;

  /** El rótulo y el texto de la casilla vacía de la vitrina. */
  sinCliente: { rotulo: string; texto: string };

  /** Las preguntas propias de esta ciudad. */
  faqs: readonly {
    q: string;
    a: string;
    href?: string;
    hrefLabel?: string;
  }[];

  /** El párrafo del cierre. */
  cierreTitulo: string;
  cierreCuerpo: string;

  /** Sinónimos para el `alternateName` del schema. */
  alternos: readonly string[];
};
