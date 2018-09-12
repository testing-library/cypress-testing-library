declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId<S = string>(x: string): Chainable<S>
  }
}
