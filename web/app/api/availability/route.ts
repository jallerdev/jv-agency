import { NextResponse } from "next/server";

import { isValidDate } from "@/lib/booking";
import { freeSlots } from "@/lib/availability";
import { excedido, ipDe, respuesta429 } from "@/lib/limite";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Sesenta consultas por hora. Cada una llama a `freebusy` de Google, que tiene
   su propia cuota: sin techo, un bucle de peticiones no tumba este servidor,
   tumba el calendario para todo el mundo. */
const CUPO = { intentos: 60, ventanaMs: 60 * 60 * 1000 };

export async function GET(req: Request) {
  const espera = excedido(`availability:${ipDe(req)}`, CUPO);
  if (espera !== null) {
    return respuesta429(espera, "Demasiadas consultas seguidas. Espera un momento.");
  }

  const date = new URL(req.url).searchParams.get("date");
  if (!date || !isValidDate(date)) {
    return NextResponse.json({ ok: false, error: "Fecha inválida." }, { status: 400 });
  }

  try {
    const slots = await freeSlots(date);
    return NextResponse.json({ ok: true, slots });
  } catch (err) {
    console.error("[availability] freeSlots falló:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo consultar la disponibilidad." },
      { status: 502 }
    );
  }
}
