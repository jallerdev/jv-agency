// Genera el GOOGLE_REFRESH_TOKEN de la cuenta del estudio (correr una sola vez).
//
// Requisitos previos en Google Cloud Console:
//   1. Crea un proyecto y habilita "Google Calendar API".
//   2. Pantalla de consentimiento OAuth (External): agrega tu correo como usuario de prueba.
//   3. Crea credenciales → "ID de cliente de OAuth" → tipo "Aplicación web".
//   4. En "URIs de redireccionamiento autorizados" agrega EXACTAMENTE:
//        http://localhost:5555/oauth2callback
//   5. Copia el Client ID y Client Secret a web/.env (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET).
//
// Uso:  node scripts/google-auth.mjs
// Luego abre la URL que imprime, autoriza con la cuenta del estudio, y copia el
// refresh token a GOOGLE_REFRESH_TOKEN en web/.env.

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { google } from "googleapis";

const REDIRECT_URI = "http://localhost:5555/oauth2callback";
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

function loadEnv() {
  const env = { ...process.env };
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    const raw = readFileSync(join(dir, "..", ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  } catch {
    // sin .env, usamos solo process.env
  }
  return env;
}

const env = loadEnv();
const clientId = env.GOOGLE_CLIENT_ID;
const clientSecret = env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "Falta GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET. Ponlos en web/.env o pásalos como variables de entorno."
  );
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // fuerza que devuelva refresh_token
  scope: SCOPES,
});

const server = createServer(async (req, res) => {
  if (!req.url || !req.url.startsWith("/oauth2callback")) {
    res.writeHead(404).end();
    return;
  }
  const code = new URL(req.url, REDIRECT_URI).searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Sin código de autorización.");
    return;
  }
  try {
    const { tokens } = await oauth2.getToken(code);
    res
      .writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      .end("<h2>Listo. Vuelve a la terminal y copia el refresh token.</h2>");
    console.log("\n=== Copia esto en web/.env ===\n");
    if (tokens.refresh_token) {
      console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`);
    } else {
      console.log(
        "No se recibió refresh_token. Revoca el acceso en https://myaccount.google.com/permissions y reintenta."
      );
    }
    console.log("\n==============================\n");
  } catch (e) {
    res.writeHead(500).end("Error intercambiando el código.");
    console.error(e);
  } finally {
    server.close();
  }
});

server.listen(5555, () => {
  console.log("\nAbre esta URL en tu navegador y autoriza con la cuenta del estudio:\n");
  console.log(authUrl);
  console.log("\nEsperando la autorización…\n");
});
