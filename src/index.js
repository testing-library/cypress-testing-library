import {configure as configureDTL, queries} from '@testing-library/dom'
import {getFirstElement} from './utils'

function configure({fallbackRetryWithoutPreviousSubject, ...config}) {
  return configureDTL(config)
}

const findRegex = /^find/
const queryNames = Object.keys(queries).filter(q => findRegex.test(q))

const commands = queryNames.map(queryName => {
  return createQuery(queryName, queryName.replace(findRegex, 'get'))
})

function createQuery(queryName, implementationName) {
  return {
    name: queryName,
    command(...args) {
      const lastArg = args[args.length - 1]
      const options = typeof lastArg === 'object' ? {...lastArg} : {}

      this.set('timeout', options.timeout)

      const queryImpl = queries[implementationName]
      const inputArr = args.filter(filterInputs)

      const selector = `${queryName}(${queryArgument(args)})`

      const consoleProps = {
        // TODO: Would be good to completely separate out the types of input into their own properties
        input: inputArr,
        Selector: selector,
      }

      const log =
        options.log !== false &&
        Cypress.log({
          name: queryName,
          type:
            this.get('prev')?.get('chainerId') === this.get('chainerId')
              ? 'child'
              : 'parent',
          message: inputArr,
          timeout: options.timeout,
          consoleProps: () => consoleProps,
        })

      const withinSubject = cy.state('withinSubjectChain')

      let error
      this.set('onFail', err => {
        if (error) {
          err.message = error.message
        }
      })

      return subject => {
        const container = getFirstElement(
          options.container ||
            subject ||
            cy.getSubjectFromChain(withinSubject) ||
            cy.state('window').document,
        )
        consoleProps['Applied To'] = container

        let value

        try {
          value = queryImpl(container, ...args)
        } catch (e) {
          error = e
          value = Cypress.$()
          value.selector = selector
        }

        const result = Cypress.$(value)

        if (value && log) {
          log.set('$el', result)
        }

        // Overriding the selector of the jquery object because it's displayed in the long message of .should('exist') failure message
        // Hopefully it makes it clearer, because I find the normal response of "Expected to find element '', but never found it" confusing
        result.selector = selector

        consoleProps.elements = result.length
        if (result.length === 1) {
          consoleProps.yielded = result.toArray()[0]
        } else if (result.length > 0) {
          consoleProps.yielded = result.toArray()
        }

        if (result.length > 1 && !/All/.test(queryName)) {
          // Is this useful?
          throw Error(
            `Found multiple elements with the text: ${queryArgument(args)}`,
          )
        }

        return result
      }
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

export {commands, configure}

/* eslint no-new-func:0, complexity:0 */
/* globals Cypress, cy */
