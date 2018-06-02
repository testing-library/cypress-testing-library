import {queries, waitForElement} from 'dom-testing-library'

const defaults = {
  timeout: 3000,
}

const commands = Object.keys(queries).map(queryName => {
  return {
    name: queryName,
    command: (cy, ...args) => {
      const lastArg = args[args.length - 1]
      const waitOptions = (typeof lastArg === 'object')
        ? Object.assign({}, defaults, lastArg)
        : defaults

      const queryImpl = queries[queryName]
      const baseCommandImpl = doc =>
        waitForElement(() => queryImpl(doc, ...args), Object.assign({}, waitOptions, {
          container: doc,
        }))
      let commandImpl
      if (
        queryName.startsWith('queryBy') ||
        queryName.startsWith('queryAllBy')
      ) {
        commandImpl = doc =>
          baseCommandImpl(doc).catch(_ =>
            doc.querySelector('.___cypressNotExistingSelector'),
          )
      } else {
        commandImpl = doc => baseCommandImpl(doc)
      }
      const thenHandler = new Function(
        'commandImpl',
        `
            return function Command__${queryName}(thenArgs) {
              return commandImpl(thenArgs.document)
            }
          `,
      )(commandImpl)
      return cy
        .window({log: false})
        .then({ timeout: waitOptions.timeout + 100 }, thenHandler)
        .then(subject => {
          Cypress.log({
            $el: subject,
            name: queryName,
            message: args.filter((value) => {
              if (Array.isArray(value) && value.length === 0) {
                return false;
              }
              if (typeof value === 'object' && Object.keys(value).length === 0) {
                return false;
              }
              return Boolean(value);
            }),
          })
          return subject
        })
    },
  }
})

export {commands}

/* eslint no-new-func:0 */
/* globals Cypress */
