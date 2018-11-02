// TypeScript Version: 2.8
import {
  SelectorMatcherOptions,
  Matcher,
  MatcherOptions,
  getByTestId,
} from 'dom-testing-library'

declare global {
  export namespace Cypress {
    type GetByAttribute = (id: Matcher, options?: MatcherOptions) => Chainable

    type QueryByText = (
      id: Matcher,
      options?: SelectorMatcherOptions,
    ) => Chainable

    type AllByText = (id: Matcher, options?: SelectorMatcherOptions) => Chainable

    type GetByText = (id: Matcher, options?: SelectorMatcherOptions) => Chainable

    interface Chainable {
      getByPlaceholderText: GetByAttribute
      queryByText: QueryByText
      queryAllByText: AllByText
      getByText: GetByText
      getAllByText: AllByText
      queryByLabelText: QueryByText
      queryAllByLabelText: AllByText
      getByLabelText: GetByText
      getAllByLabelText: AllByText
      getByAltText: GetByAttribute
      getByTestId: GetByAttribute
      getByTitle: GetByAttribute
      getByValue: GetByAttribute
      getByTRole: GetByAttribute
    }
  }
}
