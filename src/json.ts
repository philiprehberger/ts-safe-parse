export function parseJSON<T = unknown>(input: unknown): T | undefined {
  if (typeof input !== "string") return undefined;

  try {
    return JSON.parse(input) as T;
  } catch {
    return undefined;
  }
}
