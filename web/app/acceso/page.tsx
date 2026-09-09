import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { buscarDocPorId, buscarDoc } from "@/lib/private-docs";
import { AccesoForm } from "./AccesoForm";

export const metadata: Metadata = {
  title: "Acceso · JV Agencia",
  description: "Documento privado de JV Agencia.",
  robots: { index: false, follow: false },
};

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
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-3 transition-opacity hover:opacity-80"
        aria-label="Ir a la portada de JV Agencia"
      >
        <Logo className="h-9 w-9" />
        <span className="font-display text-xl text-ink">JV Agencia</span>
      </Link>

      {doc ? (
        <AccesoForm
          docId={doc.id}
          titulo={doc.titulo}
          descripcion={doc.descripcion}
          destino={destino}
        />
      ) : (
        <div className="w-full max-w-md rounded-[1.75rem] border border-line bg-surface p-8 text-center shadow-lift md:p-10">
          <h1 className="font-display text-2xl text-ink">Este enlace no lleva a ninguna parte</h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
            Puede que esté incompleto o que el documento ya no esté disponible. Escríbenos y te
            mandamos el enlace bueno.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex font-body text-sm font-medium text-primary-dark underline underline-offset-4 hover:text-primary"
          >
            Ir a la portada
          </Link>
        </div>
      )}
    </main>
  );
}
