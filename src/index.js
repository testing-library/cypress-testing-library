import {configure as configureDTL, queries} from '@testing-library/dom'
import {getContainer} from './utils'

let globalFallbackRetryWithoutPreviousSubject = true
function configure({fallbackRetryWithoutPreviousSubject, ...config}) {
  if (fallbackRetryWithoutPreviousSubject != null) {
    globalFallbackRetryWithoutPreviousSubject = fallbackRetryWithoutPreviousSubject
  }
  return configureDTL(config)
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
  return createCommand(queryName, queryName)
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
        // make the timeout extremely short to ensure `query*` commands pass or fail instantly
        timeout: queryRegex.test(queryName) ? 0 : Cypress.config().defaultCommandTimeout,
        // setting this to false will disable the fallback to querying without a previous subject
        // This is to prevent breaking changes, but also allow for prevSubject scoping
        fallbackRetryWithoutPreviousSubject: globalFallbackRetryWithoutPreviousSubject,
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

      // This state tracking is not ideal, but it allows detection of compatibility mode for a warning message
      let failedNewFunctionality = false
      let failedOldFunctionality = false

      let error

      // Errors will be thrown by @testing-library/dom, but a query might be followed by `.should('not.exist')`
      // We just need to capture the error thrown by @testing-library/dom and return an empty jQuery NodeList
      // to allow Cypress assertions errors to happen naturally. If an assertion fails, we'll have a helpful
      // error message handy to pass on to the user
      const catchQueryError = err => {
        error = err
        failedOldFunctionality = true
        const result = Cypress.$()
        result.selector = getSelector()
        return result
      }

      // Before https://github.com/testing-library/cypress-testing-library/pull/100,
      // queries were run without being scoped to previous subjects. There is code now that depends
      // on functionality before #100. See if we can succeed using old functionality before finally failing
      // This function can be removed as a breaking change
      const catchAndTryOldFunctionality = err => {
        error = err
        failedNewFunctionality = true
        const container = options.fallbackRetryWithoutPreviousSubject ? options.container || win.document : undefined
        return getValue(container)
      }

      const resolveValue = () => {
        // retry calling "getValue" until following assertions pass or this command times out
        return Cypress.Promise.try(getValue)
          .catch(catchAndTryOldFunctionality)
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

      if (queryRegex.test(queryName)) {
        const value = getValue()
        options._log.snapshot().error(Error(`@testing-library/cypress is deprecating all 'query*' commands. 'find*' queries support non-existence starting with version 5 (E.g. cy.findByText('Does Not Exist').should('not.exist')). Please use cy.${queryName.replace(queryRegex, 'find')}(${queryArgument(args)}) instead.`))

        return value
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
          if (failedNewFunctionality && !failedOldFunctionality) {
            options._log.error(Error(`@testing-library/cypress will eventually only use previous subjects when queries are added to a chain of commands. We've detected an instance where the this functionality failed, but the old functionality passed (so your test may break in a future version). Please use cy.${queryName}(${queryArgument(args)}) instead of continuing from a previous chain.`))
          } else {
            options._log.end()
          }
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
