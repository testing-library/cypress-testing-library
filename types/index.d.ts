// TypeScript Version: 3.8

import {
  configure,
  Matcher,
  ByRoleMatcher,
  MatcherOptions as DTLMatcherOptions,
  ByRoleOptions as DTLByRoleOptions,
  SelectorMatcherOptions as DTLSelectorMatcherOptions,
} from '@testing-library/dom'

export interface CTLMatcherOptions
  extends Partial<Cypress.Timeoutable>,
    Partial<Cypress.Loggable> {
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
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByDisplayValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByDisplayValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findByRole<E extends Node = HTMLElement>(
        id: ByRoleMatcher,
        options?: ByRoleOptions,
      ): Chainable<JQuery<E>>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `findBy*` APIs search for an element and throw an error if nothing found
       * `findAllBy*` APIs search for all elements and throw an error if nothing found
       *
       * @see https://github.com/testing-library/cypress-testing-library#usage
       * @see https://github.com/testing-library/dom-testing-library#table-of-contents
       */
      findAllByRole<E extends Node = HTMLElement>(
        id: ByRoleMatcher,
        options?: ByRoleOptions,
      ): Chainable<JQuery<E>>

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
