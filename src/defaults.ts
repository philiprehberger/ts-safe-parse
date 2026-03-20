import { parseNumber } from "./number.js";
import { parseBoolean } from "./boolean.js";
import { parseDate } from "./date.js";
import { parseJSON } from "./json.js";

export function parseNumberOrDefault(
  input: unknown,
  fallback: number,
): number {
  return parseNumber(input) ?? fallback;
}

export function parseBooleanOrDefault(
  input: unknown,
  fallback: boolean,
): boolean {
  return parseBoolean(input) ?? fallback;
}

export function parseDateOrDefault(input: unknown, fallback: Date): Date {
  return parseDate(input) ?? fallback;
}

export function parseJSONOrDefault<T>(input: unknown, fallback: T): T {
  return (parseJSON<T>(input) as T) ?? fallback;
}
