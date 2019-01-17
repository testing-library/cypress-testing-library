describe('dom-testing-library commands', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('getByPlaceholderText', () => {
    cy.getByPlaceholderText('Placeholder Text')
      .click()
      .type('Hello Placeholder')
  })

  it('getByText', () => {
    cy.getByText('Button Text').click()
  })

  it('getByLabelText', () => {
    cy.getByLabelText('Label For Input Labelled By Id')
      .click()
      .type('Hello Input Labelled By Id')
  })

  it('getByAltText', () => {
    cy.getByAltText('Image Alt Text').click()
  })

  context.only('getByTestId', () => {
    it('it finds image', () => {
      cy.getByTestId('image-with-random-alt-tag').click()
    })

    it('retries finding by test id attribute', () => {
      cy.getByTestId('dynamically-added-data-test-id-123')
        .should('exist')
        .click()
    })

    it('retries should not exist assertion', () => {
      // initially the image is there
      cy.getByTestId('image-with-random-alt-tag')
        .should('exist')
        .should('have.id', 'test-image-with-data-testid')
      // then its attribute is removed
      cy.getByTestId('image-with-random-alt-tag').should('not.exist')
    })
  })

  it('getAllByText', () => {
    cy.getAllByText(/^Jackie Chan/).click({ multiple: true })
  })

  it('queryByText', () => {
    cy.queryByText('Button Text').should('exist')
    cy.queryByText('Non-existing Button Text').should('not.exist')
  })

  it('getByText within', () => {
    cy.get('#nested').within(() => {
      cy.getByText('Button Text').click()
    })
  })

  it('getByText in container', () => {
    cy.get('#nested').then(subject => {
      cy.getByText('Button Text', { container: subject }).click()
    })
  })

  // commands now properly retry
  it.skip('getByTestId only throws the error message', () => {
    const testId = 'Some random id'
    const errorMessage = `Unable to find an element by: [data-testid="${testId}"]`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.getByTestId(testId).click()
  })

  it('getByText only throws the error message', () => {
    const text = 'Some random text'
    const errorMessage = `Unable to find an element with the text: ${text}. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`
    cy.on('fail', err => {
      expect(err.message).to.eq(errorMessage)
    })

    cy.getByText('Some random text').click()
  })
})

/* global cy */
