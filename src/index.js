/// <reference types="cypress" />
import { queries, waitForElement } from 'dom-testing-library'
import { getContainer } from './utils'

const getDefaultCommandOptions = () => {
  return {
    timeout: Cypress.config().defaultCommandTimeout
  }
}

const commands = Object.keys(queries)
  .filter(name => name === 'getByTestId')
  .map(queryName => {
    console.log('query name', queryName)

    return {
      name: queryName,
      command: (...args) => {
        const lastArg = args[args.length - 1]
        const defaults = getDefaultCommandOptions()
        const waitOptions =
          typeof lastArg === 'object'
            ? Object.assign({}, defaults, lastArg)
            : defaults

        const queryImpl = queries[queryName]
        const baseCommandImpl = doc => {
          const container = getContainer(waitOptions.container || doc)
          return waitForElement(
            () => queryImpl(container, ...args),
            Object.assign({}, waitOptions, {
              container,
              timeout: 10
            })
          )
        }
        let commandImpl
        if (
          queryName.startsWith('queryBy') ||
          queryName.startsWith('queryAllBy')
        ) {
          commandImpl = doc =>
            baseCommandImpl(doc).catch(_ =>
              doc.querySelector('.___cypressNotExistingSelector')
            )
        } else {
          commandImpl = () => {
            const doc = cy.state('window').document
            // console.log('calling', baseCommandImpl.name)
            // debugger
            return baseCommandImpl(doc).catch(e => {
              // do nothing?
            })
          }
        }
        // const thenHandler = new Function(
        //   'commandImpl',
        //   `
        //     return function Command__${queryName}(thenArgs) {
        //       return commandImpl(thenArgs)
        //     }
        //   `
        // )(commandImpl)

        const resolveValue = () => {
          return Cypress.Promise.try(commandImpl).then(value => {
            // console.log('value', value)
            return cy.verifyUpcomingAssertions(Cypress.$(value), waitOptions, {
              onRetry: resolveValue
            })
          })
        }

        return (
          // cy
          //   .window({ log: false })
          //   .then({ log: false, timeout: waitOptions.timeout + 100 }, w => {
          //     return resolveValue(w.document)()
          //   })
          resolveValue()
            // .then({ timeout: waitOptions.timeout + 100 }, thenHandler)
            // .then({ timeout: waitOptions.timeout + 100 }, resolveValue())
            .then(subject => {
              Cypress.log({
                $el: subject,
                name: queryName,
                message: args.filter(value => {
                  if (Array.isArray(value) && value.length === 0) {
                    return false
                  }
                  if (
                    typeof value === 'object' &&
                    Object.keys(value).length === 0
                  ) {
                    return false
                  }
                  return Boolean(value)
                })
              })
              return subject
            })
        )
      }
    }
  })

export { commands }

/* eslint no-new-func:0 */
/* globals Cypress, cy */
