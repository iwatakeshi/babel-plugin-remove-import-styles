import { transform } from '@babel/core'
import babelPluginTransformRequireIgnore from '..'

function trim(str?: string | null) {
  return str?.replace(/^\n+|\n+$/, '').replace(/\n+/g, '\n')
}

const babelAssign = (babelOptions = {}) => (
  expected: string,
  input: string
) => {
  const transformed = transform(input, babelOptions)
  expect(transformed?.code).toBeDefined()
  expect(typeof transformed?.code).toEqual('string')

  expect(trim(transformed?.code)).toEqual(
    trim(transform(expected, babelOptions)?.code)
  )
}

const babelThrow = (babelOptions = {}) => (input: string, msg: string) => {
  expect(() => transform(input, babelOptions)).toThrow(msg)
}

const simpleBabelAssign = babelAssign({
  plugins: [
    [
      babelPluginTransformRequireIgnore,
      {
        extensions: ['.css', '.less', 'sass'],
      },
    ],
  ],
})

const withES2015BabelAssign = babelAssign({
  presets: ['@babel/preset-env'],
  plugins: [
    [
      babelPluginTransformRequireIgnore,
      {
        extensions: ['.less', 'sass'],
      },
    ],
  ],
})

const simpleBabelThrow = babelThrow({
  plugins: [
    [
      babelPluginTransformRequireIgnore,
      {
        extensions: ['.less', 'sass'],
      },
    ],
  ],
})

test('should remove require call expression by extensions', () =>
  simpleBabelAssign(
    `
require('babel');
`,
    `
require('./index.css');
require('./index.less');
require('./index.sass');
require('babel');
`
  ))

test('should remove import call expression by extensions', () =>
  simpleBabelAssign(
    `
import './index.less';
import './index.css';
import * as babel from 'babel';`,
    `
import * as babel from 'babel';
`
  ))

test('should not process when remove require call expression in assignment expression', () =>
  simpleBabelThrow(
    `
var { a } = require('./index.less');
require('babel');
`,
    './index.less should not be assigned to variable.'
  ))

test('should not process when remove import expression in default imports', () =>
  simpleBabelThrow(
    `
import myCss from './index.less';
import * as babel from 'babel';
`,
    './index.less should not be imported using default imports.'
  ))

test('should not process when remove import expression in named imports', () =>
  simpleBabelThrow(
    `
import { myCss } from './index.less';
import * as babel from 'babel';
`,
    './index.less should not be imported using named imports.'
  ))

test('should not process when remove import expression in namespace imports', () =>
  simpleBabelThrow(
    `
import * as myCss from './index.less';
import * as babel from 'babel';
`,
    './index.less should not be imported using namespace imports.'
  ))

test('should remove require call expression in other block', () =>
  simpleBabelAssign(
    `
(function (){
  require('./index.sass');
  require('./index.less');
  require('babel');
})();
`,
    `
(function (){
  require('babel');
})();
`
  ))

test('should remove require call expression', () =>
  withES2015BabelAssign(
    `
  require('./index.sass');
  require('babel');
`,
    `
  require('babel');
`
  ))

test('should remove require call expression after import transformed', () =>
  withES2015BabelAssign(
    `
  import './index.less';
  import * as babel from 'babel';
`,
    `
  import * as babel from 'babel';
`
  ))
