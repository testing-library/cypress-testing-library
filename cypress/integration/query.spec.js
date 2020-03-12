/// <reference types="cypress" />
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

  it('queryByText should show a deprecation warning', () => {
    let addedLog
    function addLog (_, log) {
      addedLog = log
      cy.off('log:added', addLog)
    }
    cy.on('log:added', addLog)

    cy.queryByText('Button Text 1')
      // query* doesn't retry more than once, but our log could be updated later depending on timing.
      // the `cy.wrap` adds a retryable step in to deal with possible timing issues of the assertions.
      cy.wrap(null).should(() => {
        const attrs = addedLog.toJSON()
        expect(attrs).to.have.property('state', 'failed')
        expect(attrs).to.have.nested.property('err.message')
        expect(attrs.err.message).to.contain(`@testing-library/cypress is deprecating all 'query*' commands.`)
      })
  })

  it('queryByText with .should(\'not.exist\')', () => {
    cy.queryAllByText(/^Button Text \d$/).should('exist')
    cy.queryByText('Non-existing Button Text', {timeout: 100}).should('not.exist')
  })

  it('queryByText within', () => {
    cy.get('#nested').within(() => {
      cy.queryByText('Button Text 2').click()
    })
  })

  it('queryByText should set the Cypress element to the found element', (done) => {
    // This test is a little strange since snapshots show what element
    // is selected, but snapshots themselves don't give access to those
    // elements. I had to make the implementation specific so that the `$el`
    // is the `subject` when the log is added and the `$el` is the `value`
    // when the log is changed. It would be better to extract the `$el` from
    // each snapshot

    cy.on('log:changed', (attrs, log) => {
      if (log.get('name') === 'queryByText') {
        expect(log.get('$el')).to.have.text('Button Text 1')
        done()
      }
    })

    cy.queryByText('Button Text 1')
  })

  it('query* will return immediately, and never retry', () => {
    cy.queryByText('Next Page').click()

    const errorMessage = `Unable to find an element with the text: New Page Loaded.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
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

  it('queryAllByText should forward existence error message from @testing-library/dom', () => {
    const text = 'Supercalifragilistic'
    const errorMessage = `Unable to find an element with the text: Supercalifragilistic.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.queryAllByText(text, {timeout: 100}).should('exist')
  })

  it('queryByLabelText should forward useful error messages from @testing-library/dom', () => {
    const errorMessage = `Found a label with the text of: Label 3, however no form control was found associated to that label.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.queryByLabelText('Label 3', {timeout: 100}).should('exist')
  })

  it('queryAllByText should default to Cypress non-existence error message', () => {
    const errorMessage = `Expected <button> not to exist in the DOM, but it was continuously found.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.queryAllByText('Button Text 1', {timeout: 100})
      .should('not.exist')
  })

  it('queryByText finding multiple items should error', () => {
    const errorMessage = `Found multiple elements with the text: /^Button Text/i\n\n(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.queryByText(/^Button Text/i)
  })
})

/* global cy */
