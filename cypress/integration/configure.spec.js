/// <reference types="cypress" />
describe('configuring fallback globally', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/test-app/')
    cy.configureCypressTestingLibrary({ fallbackRetryWithoutPreviousSubject: false })
  })

  it('findByText with a previous subject', () => {
    cy.get('#nested')
      .findByText('Button Text 1')
      .should('not.exist')
    cy.get('#nested')
      .findByText('Button Text 2')
      .should('exist')
  })
})

/* global cy */
