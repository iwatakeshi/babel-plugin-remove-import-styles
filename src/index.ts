import { extname } from 'path'
import { NodePath } from '@babel/core'
import { CallExpression, ImportDeclaration } from '@babel/types'

export default function () {
  function extFix(ext: string) {
    return ext.charAt(0) === '.' ? ext : `.${ext}`
  }

  return {
    visitor: {
      CallExpression: {
        enter(path: NodePath<CallExpression>, { opts }: unknown) {
          const extensionsInput = [].concat(opts.extensions || [])
          if (extensionsInput.length === 0) {
            return
          }
          const extensions = extensionsInput.map(extFix)
          const callee = path.get('callee')

          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            const arg = path.get('arguments')[0]
            if (
              arg &&
              arg.isStringLiteral() &&
              extensions.indexOf(extname(arg.node.value)) > -1
            ) {
              if (path.parentPath.isVariableDeclarator()) {
                throw new Error(
                  `${arg.node.value} should not be assigned to variable.`
                )
              } else {
                path.remove()
              }
            }
          }
        },
      },

      ImportDeclaration: {
        enter(path: NodePath<ImportDeclaration>, { opts }: unknown) {
          const extensionsInput = [].concat(opts.extensions || [])

          if (extensionsInput.length === 0) {
            return
          }
          const extensions = extensionsInput.map(extFix)

          if (extensions.indexOf(extname(path.node.source.value)) > -1) {
            const specifiers = path.get('specifiers')

            if (specifiers.length) {
              const specifier = specifiers[specifiers.length - 1]

              if (specifier.isImportDefaultSpecifier()) {
                throw new Error(
                  `${path.node.source.value} should not be imported using default imports.`
                )
              }
              if (specifier.isImportSpecifier()) {
                throw new Error(
                  `${path.node.source.value} should not be imported using named imports.`
                )
              }
              if (specifier.isImportNamespaceSpecifier()) {
                throw new Error(
                  `${path.node.source.value} should not be imported using namespace imports.`
                )
              }
            }

            path.remove()
          }
        },
      },
    },
  }
}
