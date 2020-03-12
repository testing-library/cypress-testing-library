import {configure as configureDTL, queries} from '@testing-library/dom'
import {getContainer} from './utils'

function configure({fallbackRetryWithoutPreviousSubject, ...config}) {
  return configureDTL(config)
}

const queryNames = Object.keys(queries)

const deprecatedRegex = /^(get|query)/
const findRegex = /^find/

const deprecatedQueryNames = queryNames.filter(q => deprecatedRegex.test(q))
const findQueryNames = queryNames.filter(q => findRegex.test(q))

const deprecatedCommands = deprecatedQueryNames.map(queryName => {
  return {
    name: queryName,
    command: () => {
      throw new Error(
        `You used '${queryName}' which has been removed from Cypress Testing Library because it does not make sense in this context. Please use '${queryName.replace(
          deprecatedRegex,
          'find',
        )}' instead.`,
      )
    },
  }
})

const findCommands = findQueryNames.map(queryName => {
  return createCommand(queryName, queryName.replace(findRegex, 'get'))
})

function createCommand(queryName, implementationName) {
  return {
    name: queryName,
    options: {prevSubject: ['optional']},
    command: (prevSubject, ...args) => {
      const lastArg = args[args.length - 1]
      const defaults = {
        timeout: Cypress.config().defaultCommandTimeout,
        log: true,
      }
      const options =
        typeof lastArg === 'object' ? {...defaults, ...lastArg} : defaults

      const queryImpl = queries[implementationName]
      const baseCommandImpl = container => {
        return queryImpl(getContainer(container), ...args)
      }
      const commandImpl = container => baseCommandImpl(container)

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
          type: prevSubject ? 'child' : 'parent',
          name: queryName,
          message: inputArr,
          consoleProps: () => consoleProps,
        })
      }

      const getValue = (container = options.container || prevSubject || win.document) => {
        const value = commandImpl(container)

        const result = Cypress.$(value)
        if (value && options._log) {
          options._log.set('$el', result)
        }

        // Overriding the selector of the jquery object because it's displayed in the long message of .should('exist') failure message
        // Hopefully it makes it clearer, because I find the normal response of "Expected to find element '', but never found it" confusing
        result.selector = getSelector()

        consoleProps.elements = result.length
        if (result.length === 1) {
          consoleProps.yielded = result.toArray()[0]
        } else if (result.length > 0) {
          consoleProps.yielded = result.toArray()
        }

        if (result.length > 1 && !/All/.test(queryName)) {
          // Is this useful?
          throw Error(`Found multiple elements with the text: ${queryArgument(args)}`)
        }

        return result
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

const commands = [...findCommands, ...deprecatedCommands]

export {commands, configure}

/* eslint no-new-func:0, complexity:0 */
/* globals Cypress, cy */
