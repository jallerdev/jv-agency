// ¿El token en PRODUCCIÓN (Vercel) funciona? Creo un evento ocupado a una hora
// concreta con el token local (bueno) y pregunto a producción si esa hora
// desaparece de la disponibilidad. Si sigue ahí → Vercel tiene el token muerto
// (fail-open). Borro el evento al final.
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
const PROD = "https://www.jvagencia.com";

const auth = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
auth.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN });
const calendar = google.calendar({ version: "v3", auth });

const day = DateTime.now().setZone(tz).plus({ days: 21 }).startOf("day");
const dateStr = day.toFormat("yyyy-MM-dd");
const SLOT = "15:00";
const start = day.set({ hour: 15, minute: 0 });
const end = start.plus({ minutes: 30 });

console.log(`Prueba: bloqueo ${SLOT} del ${dateStr} y consulto a producción.\n`);

let eventId = null;
try {
  const res = await calendar.events.insert({
    calendarId: calId,
    sendUpdates: "none",
    requestBody: {
      summary: "TEST JV — bloqueo temporal (diagnóstico)",
      start: { dateTime: start.toISO(), timeZone: tz },
      end: { dateTime: end.toISO(), timeZone: tz },
    },
  });
  eventId = res.data.id;
  console.log("✅ Evento ocupado creado (local):", eventId);
} catch (e) {
  console.log("❌ No pude crear el evento de bloqueo:", e?.message);
  process.exit(1);
}

// Pequeña espera para propagación de freebusy.
await new Promise((r) => setTimeout(r, 4000));

let prodSlots = [];
try {
  const r = await fetch(`${PROD}/api/availability?date=${dateStr}`, { cache: "no-store" });
  const data = await r.json();
  prodSlots = Array.isArray(data.slots) ? data.slots : [];
  console.log("Producción HTTP:", r.status);
  console.log("Producción slots:", JSON.stringify(prodSlots));
} catch (e) {
  console.log("❌ Error consultando producción:", e?.message);
}

const stillThere = prodSlots.includes(SLOT);
console.log("\n=== VEREDICTO ===");
if (prodSlots.length === 0) {
  console.log("⚠️  Producción no devolvió slots; revisar aparte.");
} else if (stillThere) {
  console.log(`❌ ${SLOT} SIGUE disponible en producción pese al bloqueo →`);
  console.log("   Vercel está usando el token MUERTO (fail-open). Hay que actualizar");
  console.log("   GOOGLE_REFRESH_TOKEN en Vercel + redeploy.");
} else {
  console.log(`✅ ${SLOT} DESAPARECIÓ en producción → el token de Vercel FUNCIONA.`);
  console.log("   El problema del Meet es otro; seguir investigando.");
}

// Limpieza
try {
  await calendar.events.delete({ calendarId: calId, eventId, sendUpdates: "none" });
  console.log("\n🧹 Evento de bloqueo borrado.");
} catch (e) {
  console.log("\n⚠️  No pude borrar el evento (" + eventId + "):", e?.message);
}
