import { DateTime } from "luxon";

// Configuración de la agenda del estudio. Las horas son en la zona del estudio,
// no en la del visitante — así los slots son consistentes para cualquier cliente.
export const STUDIO_TIMEZONE = process.env.STUDIO_TIMEZONE || "America/Bogota";

// Horarios ofrecidos (hora local del estudio). Coinciden con los del formulario.
export const SLOT_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

// Duración de la llamada de diagnóstico.
export const SLOT_DURATION_MIN = 30;

// Convierte (fecha YYYY-MM-DD, hora HH:MM) interpretadas en la zona del estudio
// a un DateTime de luxon. Inválido si la fecha/hora no parsea.
export function slotDateTime(date: string, time: string): DateTime {
  return DateTime.fromISO(`${date}T${time}`, { zone: STUDIO_TIMEZONE });
}

export function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && DateTime.fromISO(date).isValid;
}
