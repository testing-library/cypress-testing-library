describe('dom-testing-library commands', () => {
  it('getByPlaceholderText', () => {
    cy
      .visit('http://localhost:13370')
      .getByPlaceholderText('Placeholder Text')
      .click()
      .type('Hello Placeholder')
  })

  it('getByText', () => {
    cy
      .visit('http://localhost:13370')
      .getByText('Button Text')
      .click()
  })

  it('getByLabelText', () => {
    cy
      .visit('http://localhost:13370')
      .getByLabelText('Label For Input Labelled By Id')
      .click()
      .type('Hello Input Labelled By Id')
  })

  it('getByAltText', () => {
    cy
      .visit('http://localhost:13370')
      .getByAltText('Image Alt Text')
      .click()
  })

  it('getByTestId', () => {
    cy
      .visit('http://localhost:13370')
      .getByTestId('image-with-random-alt-tag')
      .click()
  })
})

/* global cy */
