import {commands} from '../'

test('adds commands to Cypress', () => {
  const addMock = jest.fn().mockName('Cypress.Commands.add')
  global.Cypress = {Commands: {add: addMock}}
  global.cy = {}

  require('../add-commands')

  expect(addMock).toHaveBeenCalledTimes(commands.length)
  commands.forEach(({name}, index) => {
    expect(addMock.mock.calls[index]).toMatchObject([
      name,
      // We get a new function that is `command.bind(null, cy)` i.e. global `cy` passed into the first argument.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      expect.any(Function),
    ])
  })
})
