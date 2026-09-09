// Diagnóstico temporal de la integración de Google Calendar.
// Carga web/.env, reporta qué vars están, y ejecuta una consulta freebusy real
// para capturar el error exacto (que en producción el catch {} oculta).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

const present = (v) => (v ? `set(len=${v.length})` : "MISSING");
console.log("GOOGLE_CLIENT_ID     :", present(env.GOOGLE_CLIENT_ID));
console.log("GOOGLE_CLIENT_SECRET :", present(env.GOOGLE_CLIENT_SECRET));
console.log("GOOGLE_REFRESH_TOKEN :", present(env.GOOGLE_REFRESH_TOKEN));
console.log("GOOGLE_CALENDAR_ID   :", calId);
console.log("STUDIO_TIMEZONE      :", tz);
console.log("");

if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REFRESH_TOKEN) {
  console.log("→ Google NO está completamente configurado; el código devolvería todos los slots.");
  process.exit(0);
}

const auth = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
auth.setCredentials({ refresh_token: env.GOOGLE_REFRESH_TOKEN });

// Paso 1: forzar el refresco del access token (aquí salta invalid_grant si el token murió).
try {
  const at = await auth.getAccessToken();
  console.log("✅ Refresh OK — access token obtenido (len=" + (at?.token?.length ?? 0) + ")");
} catch (e) {
  console.log("❌ Falló el refresco del token:");
  console.log("   message:", e?.message);
  console.log("   error  :", e?.response?.data ?? e?.errors ?? "(sin body)");
  process.exit(2);
}

// Paso 2: freebusy real sobre un día futuro.
const calendar = google.calendar({ version: "v3", auth });
const day = DateTime.now().setZone(tz).plus({ days: 17 }).startOf("day");
const timeMin = day.set({ hour: 9 }).toUTC().toISO();
const timeMax = day.set({ hour: 17, minute: 30 }).toUTC().toISO();
try {
  const res = await calendar.freebusy.query({
    requestBody: { timeMin, timeMax, timeZone: tz, items: [{ id: calId }] },
  });
  const cal = res.data.calendars?.[calId];
  console.log("✅ freebusy OK para", calId);
  console.log("   errors:", JSON.stringify(cal?.errors ?? null));
  console.log("   busy  :", JSON.stringify(cal?.busy ?? []));
} catch (e) {
  console.log("❌ freebusy lanzó:");
  console.log("   message:", e?.message);
  console.log("   code   :", e?.code);
  console.log("   body   :", JSON.stringify(e?.response?.data ?? e?.errors ?? null));
  process.exit(3);
}
