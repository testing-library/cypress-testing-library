import {commands} from '../'

test('exports expected commands', () => {
  expect(commands).toMatchObject(expect.any(Array))
  expect(commands.map(({name}) => name)).toMatchSnapshot()
  commands.forEach(command =>
    expect(command).toMatchObject({
      name: expect.any(String),
      // We get a new function that wraps the respective query from `dom-testing-library`.
      // The commands themselves will be tested separately in the Cypress end-to-end tests.
      command: expect.any(Function),
    }),
  )
})
