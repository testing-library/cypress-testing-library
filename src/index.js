import {queries, waitForElement} from 'dom-testing-library'

const commands = Object.keys(queries)
  .filter(
    queryName =>
      queryName.startsWith('getBy') || queryName.startsWith('getAllBy'),
  )
  .map(queryName => {
    return {
      name: queryName,
      command: (cy, ...args) => {
        const queryImpl = queries[queryName]
        const commandImpl = doc =>
          waitForElement(() => queryImpl(doc, ...args), {container: doc})
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
