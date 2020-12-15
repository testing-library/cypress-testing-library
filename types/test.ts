/// <reference types="Cypress" />
import {configure} from '.'
 import './add-commands'

configure({testIdAttribute: 'data-myown-testid'})

// findBy*
cy.findByPlaceholderText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByLabelText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByAltText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByTestId('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByTitle('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByDisplayValue('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findByRole('foo') // $ExpectType Chainable<JQuery<HTMLElement>>

// findAllBy*
cy.findAllByPlaceholderText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByLabelText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByAltText('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByTestId('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByTitle('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByDisplayValue('foo') // $ExpectType Chainable<JQuery<HTMLElement>>
cy.findAllByRole('foo') // $ExpectType Chainable<JQuery<HTMLElement>>

// configure
cy.configureCypressTestingLibrary({testIdAttribute: 'data-myawesome-testid'}) // $ExpectType Chainable<void>
