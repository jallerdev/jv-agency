import { randomUUID } from "node:crypto";

import { google } from "googleapis";
import { DateTime } from "luxon";

import { SLOT_DURATION_MIN, STUDIO_TIMEZONE } from "./booking";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}

function calendarClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return google.calendar({ version: "v3", auth });
}

export type BusyInterval = { start: string; end: string };

// Intervalos ocupados del calendario entre dos instantes (ISO UTC).
export async function getBusy(timeMinISO: string, timeMaxISO: string): Promise<BusyInterval[]> {
  const calendar = calendarClient();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      timeZone: STUDIO_TIMEZONE,
      items: [{ id: CALENDAR_ID }],
    },
  });
  const busy = res.data.calendars?.[CALENDAR_ID]?.busy ?? [];
  return busy
    .filter((b): b is { start: string; end: string } => Boolean(b.start && b.end))
    .map((b) => ({ start: b.start, end: b.end }));
}

export type CreatedEvent = { meetLink: string | null; eventId: string; htmlLink: string | null };

// Crea un evento con Google Meet e invita al cliente por email.
export async function createMeetEvent(opts: {
  start: DateTime;
  summary: string;
  description: string;
  attendeeEmail?: string | null;
}): Promise<CreatedEvent> {
  const calendar = calendarClient();
  const end = opts.start.plus({ minutes: SLOT_DURATION_MIN });

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: opts.summary,
      description: opts.description,
      start: { dateTime: opts.start.toISO() ?? undefined, timeZone: STUDIO_TIMEZONE },
      end: { dateTime: end.toISO() ?? undefined, timeZone: STUDIO_TIMEZONE },
      attendees: opts.attendeeEmail ? [{ email: opts.attendeeEmail }] : undefined,
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return {
    meetLink: res.data.hangoutLink ?? null,
    eventId: res.data.id ?? "",
    htmlLink: res.data.htmlLink ?? null,
  };
}
