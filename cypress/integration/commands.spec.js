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

  it('getAllByText', () => {
    cy.getAllByText(/^Jackie Chan/).click({multiple: true})
  })

  it('queryByText', () => {
    cy.queryByText('Button Text').should('exist')
    cy.queryByText('Non-existing Button Text').should('not.exist')
  })

  it('getByText within', () => {
    cy.get('#nested')
      .within(() => {
        cy.getByText('Button Text').click()
      })
  })

  it('getByText in container', () => {
    cy.get('#nested')
      .then((subject) => {
        cy.getByText('Button Text', { container: subject }).click()
      })
  })
})

/* global cy */
