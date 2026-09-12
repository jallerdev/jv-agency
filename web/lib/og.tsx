import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { catalogo, money, type ServicioPublicado } from "@/lib/quote";
import type { Idioma } from "@/content/types";

/**
 * LA IMAGEN SOCIAL DE CADA PÁGINA
 * ─────────────────────────────────────────────────────────────────────────
 * Cuarenta páginas compartían `og.png`, la de la portada. Quien pegaba el
 * enlace de «cuánto cuesta el SEO» en un grupo de WhatsApp veía una tarjeta
 * que decía «Páginas web, tiendas virtuales y software en Colombia»: correcta
 * para la portada y muda para todo lo demás.
 *
 * LA PLANTILLA ES LA DEL SITIO, no una versión decorativa: fondo `#080808`,
 * la «/» de la marca, el antetítulo en mono naranja, el titular en Figtree y
 * —cuando la página tiene precio publicado— un chip con el «desde». Es lo
 * mismo que se ve al abrir el enlace, que es lo que una tarjeta social debe
 * prometer.
 *
 * LAS FUENTES VAN EN TTF Y ESTÁTICAS DE VERDAD, en `lib/og-fonts/`. El sitio
 * sirve woff2 variable y el generador no lee ninguna de las dos cosas. Pasar
 * de woff2 a ttf no basta: mientras el archivo conserve `fvar`, `gvar` y
 * `avar` sigue siendo variable y el compositor revienta con un
 * «Cannot read properties of undefined (reading '256')» que no dice nada. Hay
 * que fijar el eje de peso Y borrar esas tablas.
 *
 * Salen del MISMO archivo que las del sitio —se instancian desde el woff2 de
 * `app/fonts/`—, así que la tarjeta no puede acabar con otra tipografía que la
 * página. Pesan 126 kB entre las tres y NO se envían al navegador: solo las
 * lee el servidor al componer el PNG.
 *
 * SIN CIFRAS ESCRITAS A MANO: el «desde» sale de `lib/quote.ts`, igual que en
 * la página. Una tarjeta social que anuncia un precio viejo es peor que una
 * sin precio.
 */

export const TAMANO_OG = { width: 1200, height: 630 };
export const TIPO_OG = "image/png";

/** Las fuentes, leídas del disco una sola vez por proceso. */
async function fuentes() {
  const dir = path.join(process.cwd(), "lib", "og-fonts");
  const [display, cuerpo, mono] = await Promise.all([
    readFile(path.join(dir, "figtree-600.ttf")),
    readFile(path.join(dir, "figtree-400.ttf")),
    readFile(path.join(dir, "jetbrains-500.ttf")),
  ]);
  return [
    { name: "Figtree", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Figtree", data: cuerpo, weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

const MARCA = "#e8623f";
const FONDO = "#080808";
const TINTA = "#fafafa";
const APAGADA = "rgba(250,250,250,0.62)";

/**
 * EL TAMAÑO DEL TITULAR SE ELIGE POR TRAMOS, no con un solo umbral.
 *
 * Los titulares de este sitio van de «Hablemos de tu proyecto.» —veinticuatro
 * caracteres— a «Páginas web para clínicas y consultorios donde el paciente
 * decide antes de llamar» —ochenta—. Con un único corte, el corto sale
 * enano en una tarjeta de 1200×630 y el largo se come el chip de precio.
 *
 * Los cuatro tramos están calculados sobre la caja real: 1040 px de ancho útil
 * (1200 menos los dos rellenos de 80) y el avance medio de Figtree, que ronda
 * el medio em. Cada tramo cabe en dos líneas como máximo, que es lo que deja
 * el espacio entre la marca y la línea del pie.
 */
const cuerpoDelTitular = (titulo: string) => {
  if (titulo.length <= 30) return 76;
  if (titulo.length <= 52) return 66;
  if (titulo.length <= 74) return 56;
  return 46;
};

/** «/mes», «/año» — la unidad, cuando el precio no es de una vez. */
const UNIDADES = {
  mes: { es: "/mes", en: "/mo" },
  anio: { es: "/año", en: "/yr" },
} as const;

/**
 * El texto del chip: «desde $850.000». Sale del catálogo, nunca escrito a mano.
 * Con unidad cuando la línea es recurrente: un «desde $390.000» a secas, para
 * algo que se cobra cada mes, es la clase de cifra a medias que esta página
 * existe para no publicar.
 */
function chip(servicio: ServicioPublicado, idioma: Idioma) {
  const desde = idioma === "es" ? "desde" : "from";
  const unidad = servicio.unidad === "unico" ? "" : UNIDADES[servicio.unidad][idioma];
  return `${desde} ${money(servicio.desde, idioma)}${unidad}`;
}

export type Tarjeta = {
  /** El antetítulo: el rótulo de la página. En mono y naranja. */
  eyebrow: string;
  titulo: string;
  /** El id de catálogo cuyo «desde» se enseña. Sin él, no hay chip. */
  precio?: ServicioPublicado["id"];
  idioma?: Idioma;
};

export async function imagenOg({ eyebrow, titulo, precio, idioma = "es" }: Tarjeta) {
  const linea = precio ? chip(catalogo(precio), idioma) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: FONDO,
          padding: "72px 80px",
          fontFamily: "Figtree",
          /* El filete de marca al canto superior: el mismo lomo que llevan la
             credencial y el recibo del sitio. */
          borderTop: `10px solid ${MARCA}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* La «/» de la marca, dibujada como trazo y no como texto: en un
              PNG no hay fuente que garantice el mismo ángulo. */}
          <svg width="42" height="56" viewBox="0 0 42 56" fill="none">
            <path d="M32 6 L10 50" stroke={MARCA} strokeWidth="9" strokeLinecap="round" />
          </svg>
          <span style={{ color: TINTA, fontSize: 28, fontWeight: 600 }}>JV Agencia</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: MARCA,
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              marginTop: 18,
              color: TINTA,
              fontSize: cuerpoDelTitular(titulo),
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {titulo}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {linea && (
            <span
              style={{
                display: "flex",
                border: `1px solid ${MARCA}`,
                borderRadius: 999,
                padding: "10px 22px",
                color: MARCA,
                fontFamily: "JetBrains Mono",
                fontSize: 24,
              }}
            >
              {linea}
            </span>
          )}
          <span style={{ color: APAGADA, fontFamily: "JetBrains Mono", fontSize: 22 }}>
            jvagencia.com
          </span>
        </div>
      </div>
    ),
    { ...TAMANO_OG, fonts: await fuentes() },
  );
}

/**
 * LO QUE NEXT PIDE EN UN `opengraph-image.tsx`, EN UNA LÍNEA
 * ─────────────────────────────────────────────────────────────────────────
 * El convenio de archivo exige cuatro exportaciones —`alt`, `size`,
 * `contentType` y la función por defecto— y son las mismas cuatro en las
 * cuarenta rutas. Escritas a mano serían cuarenta sitios donde equivocarse de
 * tamaño o dejar un `alt` copiado de la página de al lado.
 *
 * Así cada ruta declara solo lo suyo —el rótulo, el titular, el precio si lo
 * tiene— y el resto lo pone esta función:
 *
 *     const tarjeta = tarjetaOg({ eyebrow: "…", titulo: "…", alt: "…" });
 *     export const { alt, size, contentType } = tarjeta;
 *     export default tarjeta.Imagen;
 */
export function tarjetaOg(tarjeta: Tarjeta & { alt?: string }) {
  return {
    /* El `alt` de una tarjeta social lo lee quien navega con lector de
       pantalla en el hilo donde alguien la pegó. Describirla —«tarjeta oscura
       con el logo»— no le sirve de nada: lo que necesita es lo que dice, que
       es el titular. Por eso se deriva, y se declara a mano solo si la página
       tiene algo mejor que decir. */
    alt: tarjeta.alt ?? `JV Agencia — ${tarjeta.titulo}`,
    size: TAMANO_OG,
    contentType: TIPO_OG,
    Imagen: () => imagenOg(tarjeta),
  };
}
