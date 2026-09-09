// Diagnóstico: ¿se genera el enlace de Google Meet al crear el evento?
// Crea un evento de prueba con conferenceData (Meet), inspecciona la respuesta,
// y BORRA el evento al final para no ensuciar el calendario.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

import { google } from "googleapis";
import { DateTime } from "luxon";

const dir = dirname(fileURLToPath(import.meta.url));
const env = { ...process.env };
try {
  const raw = readFileSync(join(dir, "..", ".env"), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !env[m[1]]) env[m[1]] = m[2];
  }
} catch {}

const tz = env.STUDIO_TIMEZONE || "America/Bogota";
const calId = env.GOOGLE_CALENDAR_ID || "primary";

const auth = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
auth.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN });
const calendar = google.calendar({ version: "v3", auth });

const start = DateTime.now().setZone(tz).plus({ days: 18 }).set({ hour: 15, minute: 0, second: 0 });
const end = start.plus({ minutes: 30 });

let eventId = null;
try {
  const res = await calendar.events.insert({
    calendarId: calId,
    conferenceDataVersion: 1,
    sendUpdates: "none", // sin invitar a nadie en la prueba
    requestBody: {
      summary: "TEST JV — borrar (diagnóstico Meet)",
      description: "Evento de prueba para verificar generación de Meet. Se borra solo.",
      start: { dateTime: start.toISO(), timeZone: tz },
      end: { dateTime: end.toISO(), timeZone: tz },
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });
  eventId = res.data.id;
  console.log("✅ events.insert OK");
  console.log("   eventId      :", res.data.id);
  console.log("   htmlLink     :", res.data.htmlLink);
  console.log("   hangoutLink  :", res.data.hangoutLink ?? "(null)");
  const cd = res.data.conferenceData;
  console.log("   conferenceData:", JSON.stringify(cd, null, 2));
  if (cd?.createRequest?.status) {
    console.log("   createRequest.status:", JSON.stringify(cd.createRequest.status));
  }
} catch (e) {
  console.log("❌ events.insert lanzó:");
  console.log("   message:", e?.message);
  console.log("   code   :", e?.code);
  console.log("   body   :", JSON.stringify(e?.response?.data ?? e?.errors ?? null, null, 2));
}

// Limpieza
if (eventId) {
  try {
    await calendar.events.delete({ calendarId: calId, eventId, sendUpdates: "none" });
    console.log("\n🧹 Evento de prueba borrado.");
  } catch (e) {
    console.log("\n⚠️  No pude borrar el evento de prueba (" + eventId + "):", e?.message);
  }
}
