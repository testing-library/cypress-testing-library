import {queries, waitForElement} from 'dom-testing-library'

const commands = Object.keys(queries).map(queryName => {
  return {
    name: queryName,
    command: (cy, text, options = {}) => {
      const { timeout = 3000 } = options;
      const queryImpl = queries[queryName]
      const baseCommandImpl = doc =>
        waitForElement(() => queryImpl(doc, text, options), {
          container: doc,
          timeout,
        })
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
        .then({ timeout: timeout + 100 }, thenHandler)
        .then(subject => {
          Cypress.log({
            $el: subject,
            name: queryName,
            message: [text, options].filter((value) => {
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
