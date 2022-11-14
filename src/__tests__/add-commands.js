import {commands} from '../'

test('adds commands to Cypress', () => {
  const addMock = jest.fn().mockName('Cypress.Commands.add')
  const addQueryMock = jest.fn().mockName('Cypress.Commands.addQuery')
  global.Cypress = {Commands: {add: addMock, addQuery: addQueryMock}}
  global.cy = {}

  require('../add-commands')

  expect(addQueryMock).toHaveBeenCalledTimes(commands.length)
  expect(addMock).toHaveBeenCalledTimes(1) // we're also adding a configuration command
  commands.forEach(({name}, index) => {
    expect(addQueryMock.mock.calls[index]).toMatchObject([
      name,
      // We get a new function that is `command.bind(null, cy)` i.e. global `cy` passed into the first argument.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      expect.any(Function),
    ])
  })
})
