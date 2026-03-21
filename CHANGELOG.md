# Changelog

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
