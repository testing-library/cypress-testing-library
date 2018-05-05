import {queries, waitForElement} from 'dom-testing-library'

const commands = Object.keys(queries).map(queryName => {
  return {
    name: queryName,
    command: (cy, ...args) => {
      const queryImpl = queries[queryName]
      const baseCommandImpl = doc =>
        waitForElement(() => queryImpl(doc, ...args), {
          container: doc,
          timeout: 3000,
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
        .then(thenHandler)
        .then(subject => {
          Cypress.log({
            $el: subject,
            name: queryName,
            message: args,
          })
          return subject
        })
    },
  }
})

export {commands}

/* eslint no-new-func:0 */
/* globals Cypress */
