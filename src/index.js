import {queries} from 'dom-testing-library'

const commands = Object.keys(queries)
  .filter(queryName => queryName.startsWith('getBy'))
  .map(queryName => {
    return {
      name: queryName,
      command: (...args) => {
        const fn = new Function(
          'args',
          'query',
          'getCommandWaiter',
          `
            return function Command__${queryName}({document}) {
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
