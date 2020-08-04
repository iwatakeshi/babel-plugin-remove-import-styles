## babel-plugin-remove-import-styles

[![Node CI](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/workflows/Node%20CI/badge.svg)](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/actions?query=workflow%3A%22Node+CI%22)

![Codecov](https://img.shields.io/codecov/c/github/iwatakeshi/babel-plugin-remove-import-styles)
[![Version](https://img.shields.io/npm/v/@iwatakeshi/babel-plugin-remove-import-styles.svg)](https://www.npmjs.com/package/@iwatakeshi/babel-plugin-remove-import-styles)
[![Downloads/week](https://img.shields.io/npm/dw/@iwatakeshi/babel-plugin-remove-import-styles.svg)](https://www.npmjs.com/package/@iwatakeshi/babel-plugin-remove-import-styles)
[![License](https://img.shields.io/github/license/iwatakeshi/babel-plugin-remove-import-styles)](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/blob/master/LICENSE.md)

Forked from [babel-plugin-transform-require](https://github.com/morlay/babel-plugin-transform-require-ignore), this plugin was re-written using Typescript. It's purpose it to remove styles that were imported using `import` or `require` statements.

## Usage

```js
{
  "env": {
    "production": {
      "plugins": [
        [
          "babel-plugin-transform-require-ignore",
          {
            "extensions": [".less", ".sass"]
          }
        ]
      ]
    }
  }
}

```
