## babel-plugin-transform-require-ignore

![Node CI](https://github.com/iwatakeshi/babel-plugin-transform-require-ignore/workflows/Node.js%20CI/badge.svg)
[![NPM](https://img.shields.io/npm/v/babel-plugin-transform-require-ignore.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-transform-require-ignore)
[![Dependencies](https://img.shields.io/david/morlay/babel-plugin-transform-require-ignore.svg?style=flat-square)](https://david-dm.org/morlay/babel-plugin-transform-require-ignore)
[![License](https://img.shields.io/npm/l/babel-plugin-transform-require-ignore.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-transform-require-ignore)

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
