export function parseDate(input: unknown): Date | undefined {
  if (input === null || input === undefined) return undefined;

  if (input instanceof Date) {
    return isNaN(input.getTime()) ? undefined : input;
  }

  if (typeof input !== "string" && typeof input !== "number") return undefined;

  const date = new Date(String(input));

  if (isNaN(date.getTime())) return undefined;

  return date;
}
