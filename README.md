## babel-plugin-transform-require-ignore

![Node CI](https://github.com/iwatakeshi/babel-plugin-remove-import-styles/workflows/Node.js%20CI/badge.svg)

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
