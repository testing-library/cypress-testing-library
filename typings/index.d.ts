// TypeScript Version: 2.8

import {
  SelectorMatcherOptions,
  Matcher,
  MatcherOptions as DTLMatcherOptions,
  getByTestId,
} from 'dom-testing-library'

export interface CTLMatcherOptions {
  timeout?: number
}

export type MatcherOptions = DTLMatcherOptions | CTLMatcherOptions

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByPlaceholderText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByPlaceholderText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByPlaceholderText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByPlaceholderText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByPlaceholderText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryBySelectText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryBySelectText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllBySelectText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllBySelectText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getBySelectText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getBySelectText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllBySelectText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllBySelectText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E | null>
      queryByText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E>
      getByText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E[]>
      getAllByText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E | null>
      queryByLabelText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByLabelText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E>
      getByLabelText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByLabelText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<E[]>
      getAllByLabelText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: SelectorMatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByAltText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByAltText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByAltText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByAltText<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByAltText<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByTestId<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByTestId<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByTestId<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByTestId<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByTestId<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByTitle<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByTitle<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByTitle<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByTitle<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByTitle<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByValue<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByValue<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByValue<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByValue<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByValue<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryByRole<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E | null>
      queryByRole<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K] | null>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      queryAllByRole<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(E | null)[]>
      queryAllByRole<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<(HTMLElementTagNameMap[K] | null)[]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getByRole<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E>
      getByRole<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K]>

      /**
       * dom-testing-library helpers for Cypress
       *
       * `getBy*` APIs search for an element and throw an error if nothing found
       * `getAllBy*` APIs search for all elements and an error if nothing found
       * `queryBy*` APIs search for an element and returns null if nothing found
       * `queryAllBy*` APIs search for all elements and return empty array if nothing found
       *
       * @see https://github.com/kentcdodds/cypress-testing-library#usage
       * @see https://github.com/kentcdodds/dom-testing-library#table-of-contents
       */
      getAllByRole<E extends Node = HTMLElement>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<E[]>
      getAllByRole<K extends keyof HTMLElementTagNameMap>(
        id: Matcher,
        options?: MatcherOptions,
      ): Chainable<HTMLElementTagNameMap[K][]>
    }
  }
}
