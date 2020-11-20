// TypeScript Version: 3.8

import {
  configure,
  Matcher,
  MatcherOptions as DTLMatcherOptions,
  ByRoleOptions as DTLByRoleOptions,
  SelectorMatcherOptions as DTLSelectorMatcherOptions,
} from '@testing-library/dom'

export interface CTLMatcherOptions {
  timeout?: number
  container?: Element | JQuery<Element>
}

export type MatcherOptions = DTLMatcherOptions | CTLMatcherOptions
export type ByRoleOptions = DTLByRoleOptions | CTLMatcherOptions
export type SelectorMatcherOptions =
  | DTLSelectorMatcherOptions
  | CTLMatcherOptions

declare global {
  namespace Cypress {
    // 🤔 unsure why this Subject is unused, nor what to do with it...
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject = any> {
      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByPlaceholderText(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByPlaceholderText(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByText(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByText(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByLabelText(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByLabelText(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByAltText(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByAltText(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByTestId(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByTestId(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByTitle(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByTitle(id: Matcher, options?: MatcherOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByDisplayValue(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByDisplayValue(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByRole(id: Matcher, options?: ByRoleOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByRole(id: Matcher, options?: ByRoleOptions): Chainable<JQuery>

      /**
       * dom-testing-library helpers for Cypress
       *
       * Configure dom-testing-library through Cypress object. Wraps `configure(config)`
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      configureCypressTestingLibrary(
        config: Parameters<typeof configure>[0],
      ): Chainable<void>
    }
  }
}

export {configure}
