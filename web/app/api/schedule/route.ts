import { NextResponse } from "next/server";
import { DateTime } from "luxon";

import { isValidDate, slotDateTime } from "@/lib/booking";
import { freeSlots } from "@/lib/availability";
import { createMeetEvent, isGoogleConfigured } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Flujo de reserva: valida el slot, crea el evento con Google Meet (invita al
// cliente por email), y reenvía el lead a HalcónOS con el link de Meet.
// La API key de HalcónOS y los secretos de Google viven solo en el servidor.

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  note?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const name = body.name?.trim();
  const date = body.date?.trim();
  const time = body.time?.trim();
  if (!name || !date || !time || !isValidDate(date)) {
    return NextResponse.json({ ok: false, error: "Faltan datos de la reserva." }, { status: 400 });
  }

  const start = slotDateTime(date, time);
  if (!start.isValid || start <= DateTime.now()) {
    return NextResponse.json({ ok: false, error: "Ese horario ya no es válido." }, { status: 400 });
  }

  const serviceLabel = body.service?.trim() || "Consulta";
  const email = body.email?.trim() || undefined;
  const phone = body.phone?.trim() || undefined;
  const userNote = body.note?.trim();

  // 1. Crear el evento con Meet (si Google está configurado).
  //    Si el calendario falla (token caído, API caída), NO abortamos la reserva:
  //    seguimos con meetLink=null y el lead se cierra por WhatsApp. Mejor capturar
  //    el lead que rechazarlo por un problema de infraestructura del calendario.
  let meetLink: string | null = null;
  if (isGoogleConfigured()) {
    // Revalidar disponibilidad para evitar doble reserva por carrera.
    // (freeSlots ya degrada solo si el calendario falla, así que no aborta aquí.)
    const slots = await freeSlots(date);
    if (!slots.includes(time)) {
      return NextResponse.json(
        { ok: false, error: "Ese horario se acaba de ocupar. Elige otro, por favor.", code: "SLOT_TAKEN" },
        { status: 409 }
      );
    }

    try {
      const description = [
        `Servicio: ${serviceLabel}`,
        `Contacto: ${name}`,
        email ? `Email: ${email}` : null,
        phone ? `Teléfono: ${phone}` : null,
        userNote ? `\n${userNote}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const event = await createMeetEvent({
        start,
        summary: `Llamada JV Agencia × ${name}`,
        description,
        attendeeEmail: email ?? null,
      });
      meetLink = event.meetLink;
    } catch (err) {
      // El calendario falló: degradamos a confirmación por WhatsApp en vez de 502.
      console.error("[schedule] createMeetEvent falló; sigo sin Meet link:", err);
      meetLink = null;
    }
  }

  // 2. Reenviar el lead a HalcónOS (best-effort: el evento ya es el resultado clave).
  //    El link Meet y la duración viajan como campos separados — halcon los persiste
  //    como una tasks(kind='meeting') asociada al lead, no embebidos en la nota.
  const url = process.env.HALCON_INBOUND_URL;
  const apiKey = process.env.HALCON_INBOUND_API_KEY;
  let leadSaved = false;
  if (url && apiKey) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: serviceLabel,
          scheduledAt: start.toUTC().toISO() ?? undefined,
          meetUrl: meetLink ?? undefined,
          durationMin: 30,
          note: userNote || undefined,
        }),
      });
      leadSaved = res.ok;
    } catch {
      leadSaved = false;
    }
  }

  return NextResponse.json({ ok: true, meetLink, leadSaved }, { status: 200 });
}
