import { imagenOg } from "@/lib/og";
import { DOCS_PRIVADOS, buscarDocPorSlug } from "@/lib/private-docs";

/**
 * La imagen de la tarjeta de WhatsApp de un enlace con palabras (ver
 * RUTA_PROPUESTA en lib/private-docs.ts): `/tarjeta/<slug>[/<anexo>]`.
 *
 * SE GENERA AL COMPILAR, una por documento y anexo. `imagenOg` lee las fuentes
 * del disco, y en una función de Vercel ese archivo no viaja si nada lo
 * declara; en el build sí está. Lo que no salga aquí da 404 (dynamicParams).
 *
 * Va fuera de /api/ porque robots.txt bloquea /api/, y hay lectores de vista
 * previa que respetan robots también para la imagen.
 *
 * No revela nada nuevo: dice el nombre del documento, que la pantalla de
 * acceso ya enseña a quien llegue a su dirección.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS_PRIVADOS.flatMap((d) =>
    d.enlace
      ? [
          { ruta: [d.enlace.slug] },
          ...(d.anexos ?? []).map((a) => ({ ruta: [d.enlace!.slug, a.corto] })),
        ]
      : [],
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ ruta: string[] }> }) {
  const [slug, corto] = (await params).ruta;
  const doc = buscarDocPorSlug(slug);
  const portada = corto ? doc?.anexos?.find((a) => a.corto === corto) : doc?.enlace;
  if (!portada) return new Response("No existe", { status: 404 });
  return imagenOg({ eyebrow: portada.eyebrow, titulo: portada.titulo });
}
