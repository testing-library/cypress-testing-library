describe('dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('getByPlaceholderText', () => {
    cy.getByPlaceholderText('Placeholder Text')
      .click()
      .type('Hello Placeholder')
  })

  it('getByLabelText', () => {
    cy.getByLabelText('Label For Input Labelled By Id')
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
    cy.getAllByText(/^Jackie Chan/)
      .should('have.length', 2)
      .click({multiple: true})
  })

  it('queryByText', () => {
    cy.queryAllByText('Button Text').should('exist')
    cy.queryByText('Non-existing Button Text', {timeout: 100}).should(
      'not.exist',
    )
  })

  it('getByText within', () => {
    cy.get('#nested').within(() => {
      cy.getByText('Button Text').click()
    })
  })

  it('getByText works when another page loads', () => {
    cy.getByText('Next Page').click()
    cy.getByText('New Page Loaded').should('exist')
  })

  it('getByText in container', () => {
    return cy.get('#nested').then(subject => {
      cy.getByText('Button Text', {container: subject}).click()
    })
  })

  // query* behaviour tested
  it('queryByText can return no results message should not error', () => {
    const text = 'Supercalifragilistic'

    cy.queryByText(text, {timeout: 100}).should('have.length', 0)
  })

  it('queryAllByText can return no results message should not error', () => {
    const text = 'Supercalifragilistic'

    cy.queryAllByText(text, {timeout: 100}).should('have.length', 0)
  })

  it('queryAllByText with a should(\'exist\') must provide selector error message', () => {
    const text = 'Supercalifragilistic'
    const errorMessage = `expected 'queryAllByText(\`${text}\`)' to exist in the DOM`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.queryAllByText(text, {timeout: 100}).should('exist') // NOT POSSIBLE WITH QUERYALL?
  })

  // get* behaviour tested
  it('getByText should error if no elements are found', () => {
    const regex = /Supercalifragilistic/
    const errorMessage = `Timed out retrying: Expected to find element: 'getByText(${regex})', but never found it.`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.getByText(regex, {timeout: 100}) // Doesn't explicitly need .should('exist') if it's the last element?
  })

  it('getByText finding multiple items should error', () => {
    const errorMessage = `Found multiple elements with the text: /^getByText/i\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.getByText(/^getByText/i)
  })
})

/* global cy */
