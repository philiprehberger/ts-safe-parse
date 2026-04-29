import { describe, it } from "node:test";
import assert from "node:assert";
import {
  parseNumber,
  parseInteger,
  parseFloat,
  parseBoolean,
  parseDate,
  parseJSON,
  parseArray,
  coerce,
  parseNumberOrDefault,
  parseBooleanOrDefault,
  parseDateOrDefault,
  parseJSONOrDefault,
  parseURL,
} from "../../dist/index.js";

describe("parseNumber", () => {
  it("parses valid number strings", () => {
    assert.strictEqual(parseNumber("42"), 42);
    assert.strictEqual(parseNumber("-3.14"), -3.14);
    assert.strictEqual(parseNumber("0"), 0);
  });

  it("passes through valid numbers", () => {
    assert.strictEqual(parseNumber(42), 42);
    assert.strictEqual(parseNumber(0), 0);
  });

  it("rejects NaN", () => {
    assert.strictEqual(parseNumber(NaN), undefined);
    assert.strictEqual(parseNumber("not a number"), undefined);
  });

  it("rejects Infinity", () => {
    assert.strictEqual(parseNumber(Infinity), undefined);
    assert.strictEqual(parseNumber(-Infinity), undefined);
    assert.strictEqual(parseNumber("Infinity"), undefined);
  });

  it("rejects empty and whitespace strings", () => {
    assert.strictEqual(parseNumber(""), undefined);
    assert.strictEqual(parseNumber("   "), undefined);
  });

  it("rejects non-string non-number types", () => {
    assert.strictEqual(parseNumber(null), undefined);
    assert.strictEqual(parseNumber(undefined), undefined);
    assert.strictEqual(parseNumber({}), undefined);
    assert.strictEqual(parseNumber([]), undefined);
    assert.strictEqual(parseNumber(true), undefined);
  });
});

describe("parseInteger", () => {
  it("parses valid integers", () => {
    assert.strictEqual(parseInteger("42"), 42);
    assert.strictEqual(parseInteger("-7"), -7);
    assert.strictEqual(parseInteger("0"), 0);
  });

  it("rejects floats", () => {
    assert.strictEqual(parseInteger("3.14"), undefined);
    assert.strictEqual(parseInteger("1.5"), undefined);
  });

  it("rejects non-numeric input", () => {
    assert.strictEqual(parseInteger("abc"), undefined);
    assert.strictEqual(parseInteger(""), undefined);
  });
});

describe("parseFloat", () => {
  it("parses float values", () => {
    assert.strictEqual(parseFloat("3.14159"), 3.14159);
  });

  it("rounds to specified precision", () => {
    assert.strictEqual(parseFloat("3.14159", { precision: 2 }), 3.14);
    assert.strictEqual(parseFloat("2.005", { precision: 2 }), 2.01);
    assert.strictEqual(parseFloat("10.999", { precision: 0 }), 11);
  });

  it("returns undefined for invalid input", () => {
    assert.strictEqual(parseFloat("abc"), undefined);
  });
});

describe("parseBoolean", () => {
  it("parses truthy values", () => {
    assert.strictEqual(parseBoolean("true"), true);
    assert.strictEqual(parseBoolean("1"), true);
    assert.strictEqual(parseBoolean("yes"), true);
    assert.strictEqual(parseBoolean("on"), true);
  });

  it("parses falsy values", () => {
    assert.strictEqual(parseBoolean("false"), false);
    assert.strictEqual(parseBoolean("0"), false);
    assert.strictEqual(parseBoolean("no"), false);
    assert.strictEqual(parseBoolean("off"), false);
  });

  it("is case insensitive", () => {
    assert.strictEqual(parseBoolean("TRUE"), true);
    assert.strictEqual(parseBoolean("False"), false);
    assert.strictEqual(parseBoolean("YES"), true);
    assert.strictEqual(parseBoolean("No"), false);
  });

  it("passes through boolean values", () => {
    assert.strictEqual(parseBoolean(true), true);
    assert.strictEqual(parseBoolean(false), false);
  });

  it("rejects unknown values", () => {
    assert.strictEqual(parseBoolean("maybe"), undefined);
    assert.strictEqual(parseBoolean(""), undefined);
    assert.strictEqual(parseBoolean(42), undefined);
    assert.strictEqual(parseBoolean(null), undefined);
  });
});

describe("parseDate", () => {
  it("parses valid date strings", () => {
    const date = parseDate("2026-01-15");
    assert.ok(date instanceof Date);
    assert.strictEqual(date!.getFullYear(), 2026);
  });

  it("parses ISO date strings", () => {
    const date = parseDate("2026-03-20T10:30:00Z");
    assert.ok(date instanceof Date);
  });

  it("passes through valid Date objects", () => {
    const original = new Date("2026-01-15");
    const result = parseDate(original);
    assert.strictEqual(result, original);
  });

  it("rejects invalid dates", () => {
    assert.strictEqual(parseDate("not a date"), undefined);
    assert.strictEqual(parseDate(""), undefined);
  });

  it("rejects null and undefined", () => {
    assert.strictEqual(parseDate(null), undefined);
    assert.strictEqual(parseDate(undefined), undefined);
  });
});

describe("parseJSON", () => {
  it("parses valid JSON strings", () => {
    assert.deepStrictEqual(parseJSON('{"a":1}'), { a: 1 });
    assert.deepStrictEqual(parseJSON("[1,2,3]"), [1, 2, 3]);
    assert.strictEqual(parseJSON('"hello"'), "hello");
    assert.strictEqual(parseJSON("42"), 42);
    assert.strictEqual(parseJSON("true"), true);
    assert.strictEqual(parseJSON("null"), null);
  });

  it("returns undefined on invalid JSON", () => {
    assert.strictEqual(parseJSON("{invalid}"), undefined);
    assert.strictEqual(parseJSON("undefined"), undefined);
    assert.strictEqual(parseJSON(""), undefined);
  });

  it("returns undefined for non-string input", () => {
    assert.strictEqual(parseJSON(42), undefined);
    assert.strictEqual(parseJSON(null), undefined);
    assert.strictEqual(parseJSON(undefined), undefined);
  });
});

describe("parseArray", () => {
  it("splits comma-separated strings", () => {
    assert.deepStrictEqual(parseArray("a,b,c"), ["a", "b", "c"]);
  });

  it("trims whitespace from elements", () => {
    assert.deepStrictEqual(parseArray("a , b , c"), ["a", "b", "c"]);
  });

  it("filters empty strings", () => {
    assert.deepStrictEqual(parseArray("a,,b,"), ["a", "b"]);
  });

  it("supports custom separator", () => {
    assert.deepStrictEqual(parseArray("a|b|c", "|"), ["a", "b", "c"]);
  });

  it("supports regex separator", () => {
    assert.deepStrictEqual(parseArray("a;b,c", /[;,]/), ["a", "b", "c"]);
  });

  it("returns undefined for non-string input", () => {
    assert.strictEqual(parseArray(42), undefined);
    assert.strictEqual(parseArray(null), undefined);
  });
});

describe("coerce", () => {
  it("batch parses by schema", () => {
    const input = {
      age: "25",
      active: "true",
      joined: "2026-01-01",
      tags: "a,b,c",
    };

    const result = coerce(input, {
      age: "number",
      active: "boolean",
      joined: "date",
      tags: "string[]",
    });

    assert.strictEqual(result.age, 25);
    assert.strictEqual(result.active, true);
    assert.ok(result.joined instanceof Date);
    assert.deepStrictEqual(result.tags, ["a", "b", "c"]);
  });

  it("returns undefined for unparseable values", () => {
    const result = coerce({ age: "not a number" }, { age: "number" });
    assert.strictEqual(result.age, undefined);
  });

  it("handles integer type", () => {
    const result = coerce({ count: "10" }, { count: "integer" });
    assert.strictEqual(result.count, 10);
  });

  it("handles json type", () => {
    const result = coerce({ data: '{"key":"val"}' }, { data: "json" });
    assert.deepStrictEqual(result.data, { key: "val" });
  });
});

describe("OrDefault variants", () => {
  it("parseNumberOrDefault returns fallback on failure", () => {
    assert.strictEqual(parseNumberOrDefault("abc", 0), 0);
    assert.strictEqual(parseNumberOrDefault("42", 0), 42);
  });

  it("parseBooleanOrDefault returns fallback on failure", () => {
    assert.strictEqual(parseBooleanOrDefault("maybe", false), false);
    assert.strictEqual(parseBooleanOrDefault("yes", false), true);
  });

  it("parseDateOrDefault returns fallback on failure", () => {
    const fallback = new Date("2000-01-01");
    const result = parseDateOrDefault("not a date", fallback);
    assert.strictEqual(result, fallback);

    const valid = parseDateOrDefault("2026-06-15", fallback);
    assert.ok(valid instanceof Date);
    assert.notStrictEqual(valid, fallback);
  });

  it("parseJSONOrDefault returns fallback on failure", () => {
    assert.deepStrictEqual(parseJSONOrDefault("invalid", { x: 1 }), { x: 1 });
    assert.deepStrictEqual(parseJSONOrDefault('{"a":2}', { x: 1 }), { a: 2 });
  });
});

describe("parseURL", () => {
  it("parses absolute http(s) URLs by default", () => {
    const url = parseURL("https://example.com/path?q=1");
    assert.ok(url instanceof URL);
    assert.strictEqual(url?.hostname, "example.com");
  });

  it("rejects non-default protocols by default", () => {
    assert.strictEqual(parseURL("ftp://example.com"), undefined);
    assert.strictEqual(parseURL("javascript:alert(1)"), undefined);
  });

  it("respects a custom protocols allow-list", () => {
    const url = parseURL("ftp://example.com", { protocols: ["ftp:"] });
    assert.ok(url instanceof URL);
    assert.strictEqual(parseURL("https://example.com", { protocols: ["ftp:"] }), undefined);
  });

  it("allows any protocol when protocols is null", () => {
    assert.ok(parseURL("javascript:foo", { protocols: null }) instanceof URL);
  });

  it("returns undefined for invalid input", () => {
    assert.strictEqual(parseURL("not a url"), undefined);
    assert.strictEqual(parseURL(""), undefined);
    assert.strictEqual(parseURL(123 as unknown), undefined);
  });

  it("resolves relative inputs against a base", () => {
    const url = parseURL("/foo", { base: "https://example.com" });
    assert.strictEqual(url?.href, "https://example.com/foo");
  });
});
