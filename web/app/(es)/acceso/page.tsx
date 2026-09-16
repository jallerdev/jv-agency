import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { buscarDocPorId, buscarDoc } from "@/lib/private-docs";
import { SITE_URL } from "@/lib/site";
import { AccesoForm } from "./AccesoForm";

/**
 * LA VISTA PREVIA DEL ENLACE, Y POR QUÉ HAY QUE ARMARLA A MANO
 * ──────────────────────────────────────────────────────────────────────────
 * Esto era un `metadata` fijo con `title` y `description`, y el resultado en
 * WhatsApp era la tarjeta de la portada: «Páginas web, tiendas virtuales y
 * software en Colombia». No era caché ni un error del rastreador.
 *
 * Next fusiona los metadatos campo por campo, y `openGraph` es UN campo. Una
 * página que declara `title` y `description` pero no declara `openGraph`
 * hereda el `openGraph` entero del layout —con su `og:title`, su
 * `og:description` y su `og:image`— y no se le deriva ninguno del suyo. El
 * `<title>` salía bien; el `og:title` era el de la portada.
 *
 * Además el rastreador nunca llega a la URL compartida: `/cotizacion-…`
 * responde 307 hacia aquí, así que la vista previa de TODO documento privado
 * es la de esta página. Por eso se arma por documento, leyendo `?doc=`.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ doc?: string }>;
}): Promise<Metadata> {
  const { doc: docId } = await searchParams;
  const doc = buscarDocPorId(docId ?? "");

  const title = doc ? `${doc.titulo} · JV Agencia` : "Acceso · JV Agencia";
  const description = doc
    ? `${doc.descripcion} Es un documento privado: pide contraseña.`
    : "Documento privado de JV Agencia. Pide contraseña.";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    /* Se repiten title y description aquí a propósito: sin este objeto, el
       `openGraph` del layout se hereda entero y vuelve el fallo de arriba.
       No se declara `images`, para que siga valiendo la de `opengraph-image`
       de esta misma carpeta. */
    openGraph: {
      title,
      description,
      /* EL `?doc=` TIENE QUE IR EN LA URL. Facebook —y con él WhatsApp— trata
         `og:url` como la dirección canónica y vuelve a rastrear ESA, no la que
         le dieron. Con `/acceso` a secas el segundo rastreo llegaba sin
         parámetro, no encontraba documento y la vista previa se quedaba en el
         título genérico aunque el primero hubiera salido bien. */
      url: doc ? `${SITE_URL}/acceso?doc=${doc.id}` : `${SITE_URL}/acceso`,
      siteName: "JV Agencia",
      locale: "es_LA",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Pantalla de acceso a los documentos privados.
 *
 * Sustituye a la ventana de Basic Auth del navegador. Solo pide contraseña: el
 * usuario no aportaba seguridad —viajaba en la misma cabecera— y sí obligaba al
 * cliente a recordar un dato más para leer su propia cotización.
 */
export default async function AccesoPage({
  searchParams,
}: {
  searchParams: Promise<{ doc?: string; next?: string }>;
}) {
  const { doc: docId, next } = await searchParams;
  const doc = buscarDocPorId(docId ?? "");

  // El destino se valida contra el catálogo antes de usarlo. Si no, cualquiera
  // podría armar /acceso?next=https://otro-sitio y convertir esta página en un
  // trampolín hacia donde quisiera.
  const pedido = next ?? "";
  const destino =
    doc && pedido.startsWith("/") && buscarDoc(pedido)?.id === doc.id
      ? pedido
      : (doc?.paths[0] ?? "/");

  return (
    <main id="contenido" className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <Link
        href="/"
        className="mb-10 inline-flex min-h-11 items-center gap-3 transition-opacity hover:opacity-80"
        aria-label="Ir a la portada de JV Agencia"
      >
        {/* El monograma SOLO. Iba con «JV Agencia» escrito al lado y el
            monograma ya dibuja esas dos letras: se leía «JV · JV Agencia».
            Es lo mismo que hacen la cabecera y el pie, y el nombre completo
            sigue estando en el pie de esta página. */}
        <Logo className="h-9 w-9 text-brand" />
      </Link>

      {doc ? (
        <AccesoForm
          docId={doc.id}
          titulo={doc.titulo}
          descripcion={doc.descripcion}
          destino={destino}
        />
      ) : (
        <div className="w-full max-w-md rounded-[1.5rem] border border-line bg-surface p-8 text-center shadow-lift md:p-10">
          <h1 className="font-display text-2xl text-ink">Este enlace no lleva a ninguna parte</h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
            Puede que esté incompleto o que el documento ya no esté disponible. Escríbeme y te
            mando el enlace bueno.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-11 items-center py-2 font-body text-sm font-medium text-primary-dark underline underline-offset-4 hover:text-primary"
          >
            Ir a la portada
          </Link>
        </div>
      )}
    </main>
  );
}
