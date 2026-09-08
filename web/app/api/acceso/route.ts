import { NextResponse, type NextRequest } from "next/server";

import {
  buscarDocPorId,
  emitirToken,
  igualSeguro,
  nombreCookie,
  DURACION_MS,
} from "@/lib/private-docs";

/**
 * Comprueba la contraseña de un documento privado y, si acierta, deja la
 * cookie firmada que lo abre.
 *
 * La contraseña se compara aquí, en el servidor, y no vuelve nunca al
 * navegador: lo que se guarda es un token firmado con ella, no ella misma.
 */
export async function POST(req: NextRequest) {
  let body: { doc?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const docId = typeof body.doc === "string" ? body.doc : "";
  const password = typeof body.password === "string" ? body.password : "";
  const doc = buscarDocPorId(docId);
  const esperada = doc ? process.env[doc.passEnv] : undefined;

  // Un documento inexistente y una contraseña mal puesta responden igual: no
  // hay por qué confirmarle a nadie qué documentos existen.
  if (!doc || !esperada || !igualSeguro(password, esperada)) {
    // Freno mínimo contra el probador automático. No es un límite de intentos
    // de verdad —eso necesita estado compartido—, pero encarece el barrido.
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(nombreCookie(doc.id), await emitirToken(doc.id, esperada), {
    httpOnly: true, // el JavaScript de la página no puede leerla
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(DURACION_MS / 1000),
  });
  return res;
}
