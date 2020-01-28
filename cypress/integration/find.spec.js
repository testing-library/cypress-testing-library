describe('find* dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Test each of the types of queries: LabelText, PlaceholderText, Text, DisplayValue, AltText, Title, Role, TestId

  it('findByLabelText', () => {
    cy.findByLabelText('Label 1')
      .click()
      .type('Hello Input Labelled By Id')
  })

  it('findAllByLabelText', () => {
    cy.findAllByLabelText(/^Label \d$/).should('have.length', 2)
  })

  it('findByPlaceholderText', () => {
    cy.findByPlaceholderText('Input 1')
      .click()
      .type('Hello Placeholder')
  })

  it('findAllByPlaceholderText', () => {
    cy.findAllByPlaceholderText(/^Input \d$/).should('have.length', 2)
  })

  it('findByText', () => {
    cy.findByText('Button Text 1')
      .click()
      .should('contain', 'Button Clicked')
  })

  it('findAllByText', () => {
    cy.findAllByText(/^Button Text \d$/)
      .should('have.length', 2)
      .click({multiple: true})
      .should('contain', 'Button Clicked')
  })

  it('findByDisplayValue', () => {
    cy.findByDisplayValue('Display Value 1')
      .click()
      .clear()
      .type('Some new text')
  })

  it('findAllByDisplayValue', () => {
    cy.findAllByDisplayValue(/^Display Value \d$/).should('have.length', 2)
  })

  it('findByAltText', () => {
    cy.findByAltText('Image Alt Text 1').click()
  })

  it('findAllByAltText', () => {
    cy.findAllByAltText(/^Image Alt Text \d$/).should('have.length', 2)
  })

  it('findByTitle', () => {
    cy.findByTitle('Title 1').click()
  })

  it('findAllByTitle', () => {
    cy.findAllByTitle(/^Title \d$/).should('have.length', 2)
  })

  it('findByRole', () => {
    cy.findByRole('dialog').click()
  })

  it('findAllByRole', () => {
    cy.findAllByRole(/^dialog/).should('have.length', 2)
  })

  it('findByTestId', () => {
    cy.findByTestId('image-with-random-alt-tag-1').click()
  })

  it('findAllByTestId', () => {
    cy.findAllByTestId(/^image-with-random-alt-tag-\d$/).should(
      'have.length',
      2,
    )
  })

  /* Test the behaviour around these queries */

  it("findByText with should('not.exist')", () => {
    cy.findAllByText(/^Button Text \d$/).should('exist')
    cy.findByText('Non-existing Button Text', {timeout: 100}).should(
      'not.exist',
    )
  })

  it('findByText with a previous subject', () => {
    cy.get('#nested')
      .findByText('Button Text 1')
      .should('not.exist')
    cy.get('#nested')
      .findByText('Button Text 2')
      .should('exist')
  })

  it('findByText within', () => {
    cy.get('#nested').within(() => {
      cy.findByText('Button Text 1').should('not.exist')
      cy.findByText('Button Text 2').should('exist')
    })
  })

  it('findByText in container', () => {
    // NOTE: Cypress' `then` doesn't actually return a promise
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('#nested').then(subject => {
      cy.findByText('Button Text 1', {container: subject}).should('not.exist')
      cy.findByText('Button Text 2', {container: subject}).should('exist')
    })
  })

  it('findByText works when another page loads', () => {
    cy.findByText('Next Page').click()
    cy.findByText('New Page Loaded').should('exist')
  })

  it('findByText should error if no elements are found', () => {
    const regex = /Supercalifragilistic/
    const errorMessage = `Timed out retrying: Expected to find element: 'findByText(${regex})', but never found it.`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.findByText(regex, {timeout: 100}) // Doesn't explicitly need .should('exist') if it's the last element?
  })

  it('findByText finding multiple items should error', () => {
    const errorMessage = `Found multiple elements with the text: /^Button Text/i\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.findByText(/^Button Text/i)
  })
})

/* global cy */
