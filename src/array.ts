export function parseArray(
  input: unknown,
  separator: string | RegExp = ",",
): string[] | undefined {
  if (typeof input !== "string") return undefined;

  const parts = input
    .split(separator)
    .map((s) => s.trim())
    .filter((s) => s !== "");

  return parts;
}
