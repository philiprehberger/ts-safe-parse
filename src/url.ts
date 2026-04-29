export interface ParseURLOptions {
  /**
   * Allowed URL protocols (e.g. `['http:', 'https:']`).
   * Defaults to `['http:', 'https:']`. Pass `null` to allow any protocol.
   */
  protocols?: readonly string[] | null;
  /** Optional base URL used to resolve relative inputs. */
  base?: string | URL;
}

const DEFAULT_PROTOCOLS = ["http:", "https:"] as const;

export function parseURL(
  input: unknown,
  options: ParseURLOptions = {},
): URL | undefined {
  if (typeof input !== "string" || input.length === 0) return undefined;

  let url: URL;
  try {
    url = options.base !== undefined ? new URL(input, options.base) : new URL(input);
  } catch {
    return undefined;
  }

  const allowed = options.protocols === undefined ? DEFAULT_PROTOCOLS : options.protocols;
  if (allowed === null) return url;

  return allowed.includes(url.protocol) ? url : undefined;
}
