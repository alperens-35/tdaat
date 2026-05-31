export type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  /** ISO 8601 with timezone, e.g. 2026-09-27T13:00:00+03:00 */
  startDate: string;
  /** ISO 8601 with timezone */
  endDate: string;
  url?: string;
};

function toGoogleDate(iso: string) {
  // Google expects YYYYMMDDTHHmmssZ in UTC
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(e: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${toGoogleDate(e.startDate)}/${toGoogleDate(e.endDate)}`,
  });
  if (e.description) params.set("details", e.description);
  if (e.location) params.set("location", e.location);
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildIcs(e: CalendarEvent): string {
  const dtStart = toGoogleDate(e.startDate);
  const dtEnd = toGoogleDate(e.endDate);
  const dtStamp = toGoogleDate(new Date().toISOString());
  const uid = `${dtStamp}-${Math.random().toString(36).slice(2, 10)}@tdaat.lovable.app`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TDAAT//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${icsEscape(e.title)}`,
    e.description ? `DESCRIPTION:${icsEscape(e.description)}` : "",
    e.location ? `LOCATION:${icsEscape(e.location)}` : "",
    e.url ? `URL:${e.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

export function downloadIcs(e: CalendarEvent) {
  const blob = new Blob([buildIcs(e)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${e.title.replace(/[^a-z0-9\-]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
