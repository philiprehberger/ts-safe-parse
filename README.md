# @philiprehberger/safe-parse

[![CI](https://github.com/philiprehberger/safe-parse/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/safe-parse/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/safe-parse.svg)](https://www.npmjs.com/package/@philiprehberger/safe-parse)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/safe-parse)](https://github.com/philiprehberger/safe-parse/commits/main)

Safe parsing for primitives — numbers, booleans, dates, JSON from unknown strings

## Installation

```bash
npm install @philiprehberger/safe-parse
```

## Usage

### Parse numbers

```ts
import { parseNumber, parseInteger, parseFloat } from "@philiprehberger/safe-parse";

parseNumber("42");        // 42
parseNumber("abc");       // undefined
parseNumber("Infinity");  // undefined

parseInteger("3.14");     // undefined
parseInteger("10");       // 10

parseFloat("3.14159", { precision: 2 }); // 3.14
```

### Parse booleans

```ts
import { parseBoolean } from "@philiprehberger/safe-parse";

parseBoolean("true");  // true
parseBoolean("yes");   // true
parseBoolean("0");     // false
parseBoolean("off");   // false
parseBoolean("maybe"); // undefined
```

### Parse dates

```ts
import { parseDate } from "@philiprehberger/safe-parse";

parseDate("2026-01-15");         // Date object
parseDate("not a date");         // undefined
```

### Parse JSON

```ts
import { parseJSON } from "@philiprehberger/safe-parse";

parseJSON('{"key": "value"}');   // { key: "value" }
parseJSON("invalid json");      // undefined
```

### Batch coerce with schema

```ts
import { coerce } from "@philiprehberger/safe-parse";

const query = { page: "3", active: "true", since: "2026-01-01", tags: "a,b,c" };

const parsed = coerce(query, {
  page: "number",
  active: "boolean",
  since: "date",
  tags: "string[]",
});
// { page: 3, active: true, since: Date, tags: ["a", "b", "c"] }
```

### Fallback defaults

```ts
import { parseNumberOrDefault, parseBooleanOrDefault } from "@philiprehberger/safe-parse";

parseNumberOrDefault("abc", 0);     // 0
parseBooleanOrDefault("yes", false); // true
```

## API

| Function | Input | Output |
|---|---|---|
| `parseNumber(input)` | `unknown` | `number \| undefined` |
| `parseInteger(input)` | `unknown` | `number \| undefined` |
| `parseFloat(input, options?)` | `unknown` | `number \| undefined` |
| `parseBoolean(input)` | `unknown` | `boolean \| undefined` |
| `parseDate(input)` | `unknown` | `Date \| undefined` |
| `parseJSON<T>(input)` | `unknown` | `T \| undefined` |
| `parseArray(input, separator?)` | `unknown` | `string[] \| undefined` |
| `coerce(input, schema)` | `Record<string, unknown>` | `CoerceResult<S>` |
| `parseNumberOrDefault(input, fallback)` | `unknown, number` | `number` |
| `parseBooleanOrDefault(input, fallback)` | `unknown, boolean` | `boolean` |
| `parseDateOrDefault(input, fallback)` | `unknown, Date` | `Date` |
| `parseJSONOrDefault<T>(input, fallback)` | `unknown, T` | `T` |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/safe-parse)

🐛 [Report issues](https://github.com/philiprehberger/safe-parse/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/safe-parse/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
