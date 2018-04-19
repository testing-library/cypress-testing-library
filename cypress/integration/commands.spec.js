describe('dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('getByPlaceholderText', () => {
    cy
      .getByPlaceholderText('Placeholder Text')
      .click()
      .type('Hello Placeholder')
  })

  it('getByText', () => {
    cy.getByText('Button Text').click()
  })

  it('getByLabelText', () => {
    cy
      .getByLabelText('Label For Input Labelled By Id')
      .click()
      .type('Hello Input Labelled By Id')
  })

  it('getByAltText', () => {
    cy.getByAltText('Image Alt Text').click()
  })

  it('getByTestId', () => {
    cy.getByTestId('image-with-random-alt-tag').click()
  })
})

/* global cy */
