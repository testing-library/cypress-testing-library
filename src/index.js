import {configure, queries} from '@testing-library/dom'
import {getContainer} from './utils'

const getDefaultCommandOptions = () => {
  return {
    timeout: Cypress.config().defaultCommandTimeout,
    log: true,
  }
}

const queryNames = Object.keys(queries)

const getRegex = /^get/
const queryRegex = /^query/
const findRegex = /^find/

const getQueryNames = queryNames.filter(q => getRegex.test(q))
const queryQueryNames = queryNames.filter(q => queryRegex.test(q))
const findQueryNames = queryNames.filter(q => findRegex.test(q))

const getCommands = getQueryNames.map(queryName => {
  return {
    name: queryName,
    command: () => {
      throw new Error(
        `You used '${queryName}' which has been removed from Cypress Testing Library because it does not make sense in this context. Please use '${queryName.replace(
          getRegex,
          'find',
        )}' instead.`,
      )
    },
  }
})

const queryCommands = queryQueryNames.map(queryName => {
  return createCommand(queryName, queryName.replace(queryRegex, 'get'))
})

const findCommands = findQueryNames.map(queryName => {
  // dom-testing-library find* queries use a promise to look for an element, but that doesn't work well with Cypress retryability
  // Use the query* commands so that we can lean on Cypress to do the retry for us
  // When it does return a null or empty array, Cypress will retry until the assertions are satisfied or the command times out
  return createCommand(queryName, queryName.replace(findRegex, 'get'))
})

function createCommand(queryName, implementationName) {
  return {
    name: queryName,
    options: {prevSubject: ['optional', 'document', 'element', 'window']},
    command: (prevSubject, ...args) => {
      const lastArg = args[args.length - 1]
      const defaults = getDefaultCommandOptions()
      const options =
        typeof lastArg === 'object' ? {...defaults, ...lastArg} : defaults

      const queryImpl = queries[implementationName]
      const baseCommandImpl = doc => {
        const container = getContainer(
          options.container || prevSubject || doc,
        )
        return queryImpl(container, ...args)
      }
      const commandImpl = doc => baseCommandImpl(doc)

      const inputArr = args.filter(filterInputs)

      const getSelector = () => `${queryName}(${queryArgument(args)})`

      const win = cy.state('window')

      const consoleProps = {
        // TODO: Would be good to completely separate out the types of input into their own properties
        input: inputArr,
        Selector: getSelector(),
        'Applied To': getContainer(
          options.container || prevSubject || win.document,
        )
      }

      if (options.log) {
        options._log = Cypress.log({
          name: queryName,
          message: inputArr,
          consoleProps: () => consoleProps,
        })
      }

      const getValue = () => {
        const value = commandImpl(win.document)

        const result = Cypress.$(value)
        if (value && options._log) {
          options._log.set('$el', result)
        }

        // Overriding the selector of the jquery object because it's displayed in the long message of .should('exist') failure message
        // Hopefully it makes it clearer, because I find the normal response of "Expected to find element '', but never found it" confusing
        result.selector = getSelector()

        consoleProps.elements = result.length
        if (result.length === 1) {
          consoleProps.yielded = result.toArray()[0];
        } else if (result.length > 0) {
          consoleProps.yielded = result.toArray();
        }

        if (result.length > 1 && !/all/i.test(queryName)) {
          // Is this useful?
          throw Error(`Found multiple elements with the text: ${queryArgument(args)}`)
        }

        return result
      }

      if (queryRegex.test(queryName)) {
        // make the timeout extremely short to ensure `query*` commands pass or fail instantly
        options.timeout = 0
      }

      let error
      // Errors will be thrown by @testing-library/dom, but a query might be followed by `.should('not.exist')`
      // We just need to capture the error thrown by @testing-library/dom and return an empty jQuery NodeList
      // to allow Cypress assertions errors to happen naturally. If an assertion fails, we'll have a helpful
      // error message handy to pass on to the user
      const catchQueryError = err => {
        error = err
        const result = Cypress.$()
        result.selector = getSelector()
        return result
      }

      const resolveValue = () => {
        // retry calling "getValue" until following assertions pass or this command times out
        return Cypress.Promise.try(getValue)
          .catch(catchQueryError)
          .then(value => {
            return cy.verifyUpcomingAssertions(value, options, {
              onRetry: resolveValue,
              onFail: () => {
                // We want to override Cypress's normal non-existence message with @testing-library/dom's more helpful ones
                if (error) {
                  options.error = error
                }
              }
            })
        })
      }

      return resolveValue().then(subject => {
        // Remove the error that occurred because it is irrelevant now
        if (consoleProps.error) {
          delete consoleProps.error
        }
        if (options._log) {
          options._log.snapshot()
        }

        return subject
      }).finally(() => {
        if (options._log) {
          options._log.end()
        }
      })
    },
  }
}

function filterInputs(value) {
  if (Array.isArray(value) && value.length === 0) {
    return false
  }
  if (value instanceof RegExp) {
    return value.toString()
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return false
  }
  return Boolean(value)
}

function queryArgument(args) {
  const input = args.find(value => {
    return value instanceof RegExp || typeof value === 'string'
  })

  if (input && typeof input === 'string') {
    return `\`${input}\``
  }

  return input
}

const commands = [...getCommands, ...findCommands, ...queryCommands]

export {commands, configure}

/* eslint no-new-func:0, complexity:0 */
/* globals Cypress, cy */
