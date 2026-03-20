export type CoerceType =
  | "number"
  | "integer"
  | "boolean"
  | "date"
  | "json"
  | "string[]";

export type CoerceSchema = Record<string, CoerceType>;

type CoerceTypeMap = {
  number: number | undefined;
  integer: number | undefined;
  boolean: boolean | undefined;
  date: Date | undefined;
  json: unknown | undefined;
  "string[]": string[] | undefined;
};

export type CoerceResult<S extends CoerceSchema> = {
  [K in keyof S]: CoerceTypeMap[S[K]];
};
