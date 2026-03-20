const TRUTHY = new Set(["true", "1", "yes", "on"]);
const FALSY = new Set(["false", "0", "no", "off"]);

export function parseBoolean(input: unknown): boolean | undefined {
  if (typeof input === "boolean") return input;

  if (typeof input !== "string") return undefined;

  const lower = input.trim().toLowerCase();

  if (TRUTHY.has(lower)) return true;
  if (FALSY.has(lower)) return false;

  return undefined;
}
