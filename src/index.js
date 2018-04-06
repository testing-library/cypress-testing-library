import {queries} from 'dom-testing-library'

const commands = Object.keys(queries)
  .filter(queryName => queryName.startsWith('query'))
  .map(queryName => {
    const commandName = queryName.replace(/^query/, 'get')
    return {
      commandName,
      command: (...args) => {
        const fn = new Function(
          'args',
          'query',
          'getCommandWaiter',
          `
            return function Command__${commandName}({document}) {
              return getCommandWaiter(document, () => query(document, ...args))();
            };
          `,
        )(args, queries[queryName], getCommandWaiter)
        return cy.window({log: false}).then(fn)
      },
    }
  })

function getCommandWaiter(container, fn) {
  return function waiter() {
    const val = fn()
    if (val) {
      return val
    } else {
      return new Promise(resolve => {
        const observer = new MutationObserver(() => {
          observer.disconnect()
          resolve(waiter())
        })
        observer.observe(container, {subtree: true, childList: true})
      })
    }
  }
}

export {commands, getCommandWaiter}

/* eslint no-new-func:0, import/default:0 */
/* global cy */
