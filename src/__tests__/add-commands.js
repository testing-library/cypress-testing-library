import {commands} from '../'

test('adds commands to Cypress', () => {
  const addMock = jest.fn().mockName('Cypress.Commands.add')
  const addQueryMock = jest.fn().mockName('Cypress.Commands.addQuery')
  const overwriteQueryMock = jest
    .fn()
    .mockName('Cypress.Commands.overwriteQuery')
  global.Cypress = {
    Commands: {
      add: addMock,
      addQuery: addQueryMock,
      overwriteQuery: overwriteQueryMock,
    },
  }
  global.cy = {
    findAllByLabelText: jest.fn(),
  }

  require('../add-commands')

  /** Commands that we're adding to the cy. namespace */
  const newCommands = commands.filter(({name}) => !global.cy[name])
  /** Commands that we're overwriting in the cy. namespace */
  const overwrittenCommands = commands.filter(({name}) => global.cy[name])

  expect(addQueryMock).toHaveBeenCalledTimes(newCommands.length)
  expect(overwriteQueryMock).toHaveBeenCalledTimes(overwrittenCommands.length)
  expect(addMock).toHaveBeenCalledTimes(1) // we're also adding a configuration command

  newCommands.forEach(({name}, index) => {
    expect(addQueryMock.mock.calls[index]).toMatchObject([
      name,
      // We get a new function that is `command.bind(null, cy)` i.e. global `cy` passed into the first argument.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      expect.any(Function),
    ])
  })
  overwrittenCommands.forEach(({name}, index) => {
    expect(overwriteQueryMock.mock.calls[index]).toMatchObject([
      name,
      // We get a new function that is `command.bind(null, cy)` i.e. global `cy` passed into the first argument.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      expect.any(Function),
    ])
  })
})
