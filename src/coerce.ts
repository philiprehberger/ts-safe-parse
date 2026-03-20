import type { CoerceSchema, CoerceResult } from "./types.js";
import { parseNumber, parseInteger } from "./number.js";
import { parseBoolean } from "./boolean.js";
import { parseDate } from "./date.js";
import { parseJSON } from "./json.js";
import { parseArray } from "./array.js";

const parsers: Record<string, (input: unknown) => unknown> = {
  number: parseNumber,
  integer: parseInteger,
  boolean: parseBoolean,
  date: parseDate,
  json: parseJSON,
  "string[]": parseArray,
};

export function coerce<S extends CoerceSchema>(
  input: Record<string, unknown>,
  schema: S,
): CoerceResult<S> {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(schema)) {
    const parser = parsers[schema[key]];
    result[key] = parser ? parser(input[key]) : undefined;
  }

  return result as CoerceResult<S>;
}
