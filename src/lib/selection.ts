/* Shared client-side booking-selection store (localStorage + event). */

export const SELECTION_KEY = "ptu-selection";
export const SELECTION_EVENT = "ptu-selection-changed";

export function readSelection(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SELECTION_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function writeSelection(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SELECTION_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent<string[]>(SELECTION_EVENT, { detail: ids }));
  } catch {
    /* storage unavailable — wizard still works in-memory */
  }
}
