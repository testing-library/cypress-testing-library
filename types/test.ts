/// <reference types="Cypress" />
import {configure} from '@testing-library/cypress'
import '@testing-library/cypress/add-commands'

configure({testIdAttribute: 'data-myown-testid'})

// findBy*
cy.findByPlaceholderText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByLabelText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByAltText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByTestId('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByTitle('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByDisplayValue('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findByRole('foo') // $ExpectType Chainable<JQuery<Element>>

// findAllBy*
cy.findAllByPlaceholderText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByLabelText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByAltText('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByTestId('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByTitle('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByDisplayValue('foo') // $ExpectType Chainable<JQuery<Element>>
cy.findAllByRole('foo') // $ExpectType Chainable<JQuery<Element>>

// configure
cy.configureCypressTestingLibrary({testIdAttribute: 'data-myawesome-testid'}) // $ExpectType Chainable<void>
