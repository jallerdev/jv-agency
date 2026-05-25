import { DateTime } from "luxon";

import { SLOT_DURATION_MIN, SLOT_TIMES, slotDateTime } from "./booking";
import { getBusy, isGoogleConfigured, type BusyInterval } from "./google";

function overlaps(startMs: number, endMs: number, busy: BusyInterval[]): boolean {
  return busy.some((b) => {
    const bs = DateTime.fromISO(b.start).toMillis();
    const be = DateTime.fromISO(b.end).toMillis();
    return startMs < be && endMs > bs;
  });
}

// Devuelve las horas ("HH:MM") libres de un día. Si Google no está configurado,
// devuelve todos los slots futuros (para no bloquear el formulario antes del setup).
export async function freeSlots(date: string): Promise<string[]> {
  const now = DateTime.now();

  const candidates = SLOT_TIMES.map((time) => {
    const start = slotDateTime(date, time);
    return { time, start, end: start.plus({ minutes: SLOT_DURATION_MIN }) };
  }).filter((s) => s.start.isValid && s.start > now);

  if (candidates.length === 0) return [];

  if (!isGoogleConfigured()) {
    return candidates.map((c) => c.time);
  }

  const dayStart = candidates[0].start.toUTC().toISO();
  const dayEnd = candidates[candidates.length - 1].end.toUTC().toISO();
  if (!dayStart || !dayEnd) return candidates.map((c) => c.time);

  const busy = await getBusy(dayStart, dayEnd);

  return candidates
    .filter((c) => !overlaps(c.start.toMillis(), c.end.toMillis(), busy))
    .map((c) => c.time);
}
