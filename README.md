## babel-plugin-remove-import-styles

[![Node CI](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/workflows/Node.js%20CI/badge.svg)](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/actions?query=workflow%3A%22Node.js+CI%22)
![Codecov](https://img.shields.io/codecov/c/github/iwatakeshi/babel-plugin-remove-import-styles)
[![Version](https://img.shields.io/npm/v/@iwatakeshi/babel-plugin-remove-import-styles.svg)](https://www.npmjs.com/package/@iwatakeshi/babel-plugin-remove-import-styles)
[![Downloads/week](https://img.shields.io/npm/dw/@iwatakeshi/babel-plugin-remove-import-styles.svg)](https://www.npmjs.com/package/@iwatakeshi/babel-plugin-remove-import-styles)
[![License](https://img.shields.io/github/license/iwatakeshi/babel-plugin-remove-import-styles)](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/blob/master/LICENSE.md)

Forked from [babel-plugin-transform-require](https://github.com/morlay/babel-plugin-transform-require-ignore), this plugin was re-written using Typescript. Its purpose it to remove styles that were imported using `import` or `require` statements.

## Usage

```js
{
  "env": {
    "production": {
      "plugins": [
        [
          "@iwatakeshi/babel-plugin-remove-import-styles",
          {
            "extensions": [".less", ".sass", ".css"]
          }
        ]
      ]
    }
  }
}

```

## Recipes

### Next.js

This plugin can be used in conjunction with [next-transpile-modules](https://github.com/martpie/next-transpile-modules#readme) to remove styles from third-party modules.

To do so, you'll need to configure a `babel.config.js` file (note that `.babelrc` would not work &mdash; in my case it did not):

```js
module.exports = {
  presets: ['next/babel'],
  overrides: [
    {
      include: ['./node_modules'],
      plugins: [
        [
          '@iwatakeshi/babel-plugin-remove-import-styles',
          {
            extensions: ['.css']
          },
        ],
      ],
    },
  ],
}
```

Then you'll need to add a `next.config.js` file that uses `next-transpile-modules` and add the list of third-party modules that import styles in their library: 

```js
const withTM = require('next-transpile-modules')(['@fullcalendar']) // In my case, it was fullcalendar

module.exports = withTM({
  // any other general next.js settings
})

```
