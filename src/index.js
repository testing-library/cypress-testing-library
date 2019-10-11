import {configure, queries} from '@testing-library/dom'
import {getContainer} from './utils'

const getDefaultCommandOptions = () => {
  return {
    timeout: Cypress.config().defaultCommandTimeout,
  }
}

const queryNames = Object.keys(queries);

const getRegex = /^get/;
const queryRegex = /^query/;
const findRegex = /^find/;

const getQueryNames = queryNames.filter(q => getRegex.test(q));
const queryQueryNames = queryNames.filter(q => queryRegex.test(q));
const findQueryNames = queryNames.filter(q => findRegex.test(q));

const getCommands = getQueryNames.map(queryName => {
  return {
    name: queryName,
    command: () => {
      Cypress.log({
        name: queryName
      });

      throw new Error(`You used '${queryName}' which has been removed from Cypress Testing Library because it does not make sense in this context. Please use '${queryName.replace(getRegex, 'find')}' instead.`)
    }
  }
})

const queryCommands = queryQueryNames.map(queryName => {
  return createCommand(queryName, queryName);
})

const findCommands = findQueryNames.map(queryName => {
  // dom-testing-library find* queries use a promise to look for an element, but that doesn't work well with Cypress retryability
  // Use the query* commands so that we can lean on Cypress to do the retry for us
  // When it does return a null or empty array, Cypress will retry until the assertions are satisfied or the command times out
  return createCommand(queryName, queryName.replace(findRegex, 'query'));
})

function createCommand(queryName, implementationName) {
  return {
    name: queryName,
    command: (...args) => {
      const lastArg = args[args.length - 1]
      const defaults = getDefaultCommandOptions()
      const waitOptions =
        typeof lastArg === 'object' ? {...defaults, ...lastArg} : defaults

      const queryImpl = queries[implementationName]
      const baseCommandImpl = doc => {
        const container = getContainer(waitOptions.container || doc)
        return queryImpl(container, ...args)
      }
      const commandImpl = doc => baseCommandImpl(doc)

      const inputArr = args.filter(filterInputs);

      const consoleProps = {
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
        .then({timeout: waitOptions.timeout + 100}, (thenArgs) => {
          const getValue = () => {
            const value = commandImpl(thenArgs.document);
            const result = Cypress.$(value);
          
            // Overriding the selector of the jquery object because it's displayed in the long message of .should('exist') failure message
            // Hopefully it makes it clearer, because I find the normal response of "Expected to find element '', but never found it" confusing
            result.selector = `${queryName}(${queryArgument(args)})`;

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

          if (queryRegex.test(queryName)) {
            // For get* queries, do not retry
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
}

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

function queryArgument(args) {
  const input = args
    .find(value => {
      return (value instanceof RegExp) || (typeof value === 'string')
    });

    if (input && typeof input === 'string') {
      return `\`${input}\``;
    }

    return input;
}

const commands = [
  ...getCommands,
  ...findCommands,
  ...queryCommands
];

export {commands, configure}

/* eslint no-new-func:0, complexity:0 */
/* globals Cypress, cy */
