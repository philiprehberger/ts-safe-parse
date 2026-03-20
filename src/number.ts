export function parseNumber(input: unknown): number | undefined {
  if (input === null || input === undefined) return undefined;

  if (typeof input === "number") {
    if (Number.isNaN(input) || !Number.isFinite(input)) return undefined;
    return input;
  }

  if (typeof input !== "string") return undefined;

  const trimmed = input.trim();
  if (trimmed === "") return undefined;

  const num = Number(trimmed);

  if (Number.isNaN(num) || !Number.isFinite(num)) return undefined;

  return num;
}

export function parseInteger(input: unknown): number | undefined {
  const num = parseNumber(input);
  if (num === undefined) return undefined;
  if (!Number.isInteger(num)) return undefined;
  return num;
}

export function parseFloat(
  input: unknown,
  options?: { precision?: number },
): number | undefined {
  const num = parseNumber(input);
  if (num === undefined) return undefined;

  if (options?.precision !== undefined) {
    const factor = Math.pow(10, options.precision);
    return Math.round(num * factor) / factor;
  }

  return num;
}
