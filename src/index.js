import {queries} from '@testing-library/dom'
import {getContainer} from './utils'

const getDefaultCommandOptions = () => {
  return {
    timeout: Cypress.config().defaultCommandTimeout,
  }
}

const commands = Object.keys(queries).map(queryName => {
  return {
    name: queryName,
    command: (...args) => {
      const lastArg = args[args.length - 1]
      const defaults = getDefaultCommandOptions()
      const waitOptions =
        typeof lastArg === 'object' ? {...defaults, ...lastArg} : defaults

      const queryImpl = queries[queryName]
      const baseCommandImpl = doc => {
        const container = getContainer(waitOptions.container || doc)
        return queryImpl(container, ...args)
      }
      let commandImpl = doc => baseCommandImpl(doc)

      var inputArr = args.filter(filterInputs);

      var consoleProps = {
        // TODO: Would be good to completely separate out the types of input into their own properties
        input: inputArr
      }

      Cypress.log({
        $el: inputArr,
        name: queryName,
        message: inputArr,
        consoleProps: () => consoleProps
      });

      return cy
        .window({log: false})
        .then((thenArgs) => {
          const getValue = () => {
            var result;
            try {
              var value = commandImpl(thenArgs.document);
              result = Cypress.$(value);
            }
            catch (err) {
              // Catch exceptions where it can't find the element, so we can retry
              if (/Unable to find an element with the text/.test(err.message))
              {
                consoleProps.error = err;
                result = Cypress.$();
              } else {
                throw err;
              }
            }
          
            // Overriding the selector of the jquery object because it's displayed in the long message of .should('exist') failure message
            // Hopefully it makes it clearer, because I find the normal response of "Expected to find element '', but never found it" confusing
            result.selector = queryName + '(' + findTextOrRegex(args) + ')';

            if (result.length > 0) {
              consoleProps.yielded = result.toArray()
            }

            return result;
          }

          const resolveValue = () => {
            // retry calling "getValue" until following assertions pass or this command times out
            return Cypress.Promise.try(getValue).then(value => {
              return cy.verifyUpcomingAssertions(value, waitOptions, {
                onRetry: resolveValue,
              })
            })
          }

          if (/queryBy|queryAllBy/.test(queryName)) {
            return getValue();
          }

          return resolveValue()
            .then(subject => {
    
              // Remove the error that occurred because it is irrelevant now
              if (consoleProps.error) {
                delete consoleProps.error;
              }
    
              return subject;
            })
        })
    },
  }
})

function filterInputs(value) {
  if (Array.isArray(value) && value.length === 0) {
    return false
  }
  if (value instanceof RegExp) {
    return value.toString()
  }
  if (
    typeof value === 'object' &&
    Object.keys(value).length === 0
  ) {
    return false
  }
  return Boolean(value)
}

function findTextOrRegex(args) {
  var input = args
    .find(value => {
      return (value instanceof RegExp) || (typeof value === 'string')
    });

    if (input && typeof input === 'string') {
      return '"' + input + '"';
    }

    return input;
}

export {commands}

/* eslint no-new-func:0, complexity:0 */
/* globals Cypress, cy */
