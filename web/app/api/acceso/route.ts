import { NextResponse, type NextRequest } from "next/server";

import {
  buscarDocPorId,
  emitirToken,
  igualSeguro,
  nombreCookie,
  DURACION_MS,
} from "@/lib/private-docs";
import { excedido, ipDe, respuesta429 } from "@/lib/limite";

/**
 * Comprueba la contraseña de un documento privado y, si acierta, deja la
 * cookie firmada que lo abre.
 *
 * La contraseña se compara aquí, en el servidor, y no vuelve nunca al
 * navegador: lo que se guarda es un token firmado con ella, no ella misma.
 */
/* Diez intentos por IP cada cuarto de hora. Quien conoce la clave la escribe
   bien a la primera o a la segunda; diez son de sobra para el que se equivoca
   y ridículamente pocos para el que prueba el diccionario. */
const CUPO = { intentos: 10, ventanaMs: 15 * 60 * 1000 };

export async function POST(req: NextRequest) {
  const espera = excedido(`acceso:${ipDe(req)}`, CUPO);
  if (espera !== null) {
    return respuesta429(espera, "Demasiados intentos. Espera unos minutos.");
  }

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

  /* SIN VARIABLE DE ENTORNO NO HAY CONTRASEÑA BUENA, y el visitante recibía
     «esa contraseña no es», que manda a buscar el fallo donde no está.

     El aviso va al log del SERVIDOR y solo fuera de producción: la respuesta
     al navegador no cambia ni un byte, porque distinguir «documento sin clave
     configurada» de «clave equivocada» le confirmaría a cualquiera qué
     documentos existen, que es justo lo que el bloque de abajo evita. */
  if (doc && !esperada && process.env.NODE_ENV !== "production") {
    console.warn(
      `[acceso] El documento «${doc.id}» declara la variable ${doc.passEnv} y no está ` +
        `definida en este entorno, así que ninguna contraseña puede funcionar. ` +
        `Defínela en .env.local o trae las de Vercel con ` +
        `\`vercel env pull .env.local --environment=production --project jv-agency\`.`
    );
  }

  // Un documento inexistente y una contraseña mal puesta responden igual: no
  // hay por qué confirmarle a nadie qué documentos existen.
  if (!doc || !esperada || !igualSeguro(password, esperada)) {
    /* El retardo se queda, pero ya no es lo único: ahora hay un límite de
       intentos de verdad arriba. Esto solo iguala el tiempo de respuesta entre
       «clave mala» y «documento inexistente», para que no se pueda averiguar
       qué documentos existen midiendo cuánto tarda cada respuesta. */
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
