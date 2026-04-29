# Changelog

## 0.2.0

- Add `parseURL(input, options?)` for safe URL parsing with optional protocol allow-list (defaults to `http:`/`https:`) and `base` for resolving relative inputs

## 0.1.3

- Fix README GitHub URLs to use correct repo name (ts-safe-parse)

## 0.1.2

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.1

- Standardize README structure and badges

## 0.1.0

- Initial release
- `parseNumber()`, `parseInteger()`, `parseFloat()` with safe NaN/Infinity rejection
- `parseBoolean()` supporting true/false/yes/no/1/0/on/off
- `parseDate()` with Invalid Date rejection
- `parseJSON()` with try/catch wrapping
- `parseArray()` with configurable separator
- `coerce()` for batch parsing by schema
- `OrDefault` variants for all parsers
