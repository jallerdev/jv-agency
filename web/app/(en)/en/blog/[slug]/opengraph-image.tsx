import { findPost } from "@/lib/blog";
import { BLOG } from "@/content/paginas/blog";
import { imagenOg, TAMANO_OG, TIPO_OG } from "@/lib/og";

/**
 * LA TARJETA DE CADA ARTÍCULO
 * ─────────────────────────────────────────────────────────────────────────
 * Once artículos compartían la tarjeta de la portada. El blog es justo lo que
 * se pega en un grupo de WhatsApp —«mira, acá dice cuánto cuesta»—, así que
 * era la ruta donde más caro salía tener una sola imagen para todo.
 *
 * SIN CHIP DE PRECIO, aunque tres de los once hablen de precios. Un artículo
 * no es una línea del catálogo, y poner un «desde $850.000» debajo del titular
 * de «Cuánto cuesta una página web en Colombia» convierte en anuncio lo único
 * del sitio que no lo es.
 *
 * EL `alt` SALE POR `generateImageMetadata` y no por la exportación `alt`, que
 * es una constante y no puede saber de qué artículo se trata. Quien lee el
 * hilo con lector de pantalla oye el titular del artículo, no «imagen».
 */

/** El rótulo y el titular del artículo, o los del índice si el slug no existe. */
function datos(slug: string) {
  const post = findPost(slug, "en");
  return {
    eyebrow: post?.category.en ?? BLOG.rotulo.en,
    titulo: post?.title.en ?? BLOG.titulo.en,
  };
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await params;
  return [
    {
      id: "tarjeta",
      alt: `JV Agencia — ${datos(slug).titulo}`,
      size: TAMANO_OG,
      contentType: TIPO_OG,
    },
  ];
}

export default async function Imagen({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await params;
  return imagenOg({ ...datos(slug), idioma: "en" });
}
