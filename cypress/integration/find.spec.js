/// <reference types="cypress" />
describe('find* dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/test-app/')
  })

  // Test each of the types of queries: LabelText, PlaceholderText, Text, DisplayValue, AltText, Title, Role, TestId

  it('findByLabelText', () => {
    cy.findByLabelText('Label 1').click().type('Hello Input Labelled By Id')
  })

  it('findAllByLabelText', () => {
    cy.findAllByLabelText(/^Label \d$/).should('have.length', 2)
  })

  it('findByPlaceholderText', () => {
    cy.findByPlaceholderText('Input 1').click().type('Hello Placeholder')
  })

  it('findAllByPlaceholderText', () => {
    cy.findAllByPlaceholderText(/^Input \d$/).should('have.length', 2)
  })

  it('findByText', () => {
    cy.findByText('Button Text 1').click().should('contain', 'Button Clicked')
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

  it('findByText should handle non-existence', () => {
    cy.findByText('Does Not Exist').should('not.exist')
  })

  it('findByText should handle eventual existence', () => {
    cy.findByText('Eventually Exists').should('exist')
  })

  it('findByText should handle eventual non-existence', () => {
    cy.findByText('Eventually Not exists').should('not.exist')
  })

  it("findByText with should('not.exist')", () => {
    cy.findAllByText(/^Button Text \d$/).should('exist')
    cy.findByText('Non-existing Button Text', {timeout: 100}).should(
      'not.exist',
    )
  })

  it('findByText with a previous subject', () => {
    cy.get('#nested').findByText('Button Text 1').should('not.exist')
    cy.get('#nested').findByText('Button Text 2').should('exist')
  })

  it('findByText within', () => {
    cy.get('#nested').within(() => {
      cy.findByText('Button Text 1').should('not.exist')
      cy.findByText('Button Text 2').should('exist')
    })
  })

  it('findByText in container', () => {
    cy.get('#nested').then(subject => {
      cy.findByText('Button Text 1', {container: subject}).should('not.exist')
      cy.findByText('Button Text 2', {container: subject}).should('exist')
    })
  })

  it('findByText works when another page loads', () => {
    cy.findByText('Next Page').click()
    cy.findByText('New Page Loaded').should('exist')
  })

  it('findByText should set the Cypress element to the found element', () => {
    // This test is a little strange since snapshots show what element
    // is selected, but snapshots themselves don't give access to those
    // elements. I had to make the implementation specific so that the `$el`
    // is the `subject` when the log is added and the `$el` is the `value`
    // when the log is changed. It would be better to extract the `$el` from
    // each snapshot

    cy.on('log:changed', (attrs, log) => {
      if (log.get('name') === 'findByText') {
        expect(log.get('$el')).to.have.text('Button Text 1')
      }
    })

    cy.findByText('Button Text 1')
  })

  it('findByText should error if no elements are found', () => {
    const regex = /Supercalifragilistic/
    const errorMessage = `Unable to find an element with the text: /Supercalifragilistic/`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.findByText(regex, {timeout: 100})
  })

  it('findByText should default to Cypress non-existence error message', () => {
    const errorMessage = `Expected <button> not to exist in the DOM, but it was continuously found.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.findByText('Button Text 1', {timeout: 100}).should('not.exist')
  })

  it('findByLabelText should forward useful error messages from @testing-library/dom', () => {
    const errorMessage = `Found a label with the text of: Label 3, however no form control was found associated to that label.`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.findByLabelText('Label 3', {timeout: 100})
  })

  it('findByText finding multiple items should error', () => {
    const errorMessage = `Found multiple elements with the text: /^Button Text/i`
    cy.on('fail', err => {
      expect(err.message).to.contain(errorMessage)
    })

    cy.findByText(/^Button Text/i, {timeout: 100})
  })

  it('findByText should show as a parent command if it starts a chain', () => {
    const assertLog = (attrs, log) => {
      if (log.get('name') === 'findByText') {
        expect(log.get('type')).to.equal('parent')
        cy.off('log:added', assertLog)
      }
    }
    cy.on('log:added', assertLog)
    cy.findByText('Button Text 1')
  })

  it('findByText should show as a child command if it continues a chain', () => {
    const assertLog = (attrs, log) => {
      if (log.get('name') === 'findByText') {
        expect(log.get('type')).to.equal('child')
        cy.off('log:added', assertLog)
      }
    }
    cy.on('log:added', assertLog)
    cy.get('body').findByText('Button Text 1')
  })
})

/* global cy */
