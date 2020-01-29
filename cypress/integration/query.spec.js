describe('query* dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/test-app/')
  })

  // Test each of the types of queries: LabelText, PlaceholderText, Text, DisplayValue, AltText, Title, Role, TestId

  it('queryByLabelText', () => {
    cy.queryByLabelText('Label 1')
      .click()
      .type('Hello Input Labelled By Id')
  })

  it('queryAllByLabelText', () => {
    cy.queryAllByLabelText(/^Label \d$/).should('have.length', 2)
  })

  it('queryByPlaceholderText', () => {
    cy.queryByPlaceholderText('Input 1')
      .click()
      .type('Hello Placeholder')
  })

  it('queryAllByPlaceholderText', () => {
    cy.queryAllByPlaceholderText(/^Input \d$/).should('have.length', 2)
  })

  it('queryByText', () => {
    cy.queryByText('Button Text 1')
      .click()
      .should('contain', 'Button Clicked')
  })

  it('queryAllByText', () => {
    cy.queryAllByText(/^Button Text \d$/)
      .should('have.length', 2)
      .click({ multiple: true })
      .should('contain', 'Button Clicked')
  })

  it('queryByDisplayValue', () => {
    cy.queryByDisplayValue('Display Value 1')
      .click()
      .clear()
      .type('Some new text')
  })

  it('queryAllByDisplayValue', () => {
    cy.queryAllByDisplayValue(/^Display Value \d$/)
      .should('have.length', 2)
  })

  it('queryByAltText', () => {
    cy.queryByAltText('Image Alt Text 1').click()
  })

  it('queryAllByAltText', () => {
    cy.queryAllByAltText(/^Image Alt Text \d$/).should('have.length', 2)
  })

  it('queryByTitle', () => {
    cy.queryByTitle('Title 1').click()
  })

  it('queryAllByTitle', () => {
    cy.queryAllByTitle(/^Title \d$/).should('have.length', 2)
  })

  it('queryByRole', () => {
    cy.queryByRole('dialog').click()
  })

  it('queryAllByRole', () => {
    cy.queryAllByRole(/^dialog/).should('have.length', 2)
  })

  it('queryByTestId', () => {
    cy.queryByTestId('image-with-random-alt-tag-1').click()
  })

  it('queryAllByTestId', () => {
    cy.queryAllByTestId(/^image-with-random-alt-tag-\d$/).should('have.length', 2)
  })

  /* Test the behaviour around these queries */

  it('queryByText with .should(\'not.exist\')', () => {
    cy.queryAllByText(/^Button Text \d$/).should('exist')
    cy.queryByText('Non-existing Button Text', {timeout: 100}).should('not.exist')
  })

  it('queryByText within', () => {
    cy.get('#nested').within(() => {
      cy.queryByText('Button Text 2').click()
    })
  })

  it('query* will return immediately, and never retry', () => {
    cy.queryByText('Next Page').click()

    const errorMessage = `expected 'queryByText(\`New Page Loaded\`)' to exist in the DOM`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.queryByText('New Page Loaded', { timeout: 300 }).should('exist')
  })

  it('query* in container', () => {
    return cy.get('#nested')
      .then(subject => {
        cy.queryByText(/^Button Text/, {container: subject}).click()
      })
  })

  it('queryByText can return no result, and should not error', () => {
    const text = 'Supercalifragilistic'

    cy.queryByText(text, {timeout: 100})
      .should('have.length', 0)
      .and('not.exist')
  })

  it('queryAllByText can return no results message should not error', () => {
    const text = 'Supercalifragilistic'

    cy.queryAllByText(text, {timeout: 100})
      .should('have.length', 0)
      .and('not.exist')
  })

  it('queryAllByText with a should(\'exist\') must provide selector error message', () => {
    const text = 'Supercalifragilistic'
    const errorMessage = `expected 'queryAllByText(\`${text}\`)' to exist in the DOM`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.queryAllByText(text, {timeout: 100}).should('exist') // NOT POSSIBLE WITH QUERYALL?
  })

  it('queryByText finding multiple items should error', () => {
    const errorMessage = `Found multiple elements with the text: /^queryByText/i\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.queryByText(/^queryByText/i)
  })
})

/* global cy */
