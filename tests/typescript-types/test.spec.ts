test('includes proper TypeScript types', () => {
  cy.visit('#/foo')

  cy.getByLabelText('foo').should($elements => {
    expect($elements.length).to.eq(0)
    expect($elements[0].tagName).to.eq(0)
  })

  cy.getAllByPlaceholderText('foo').should($elements => {
    expect($elements.length).to.eq(0)
    expect($elements[0].tagName).to.eq(0)
  })

  // With regex
  cy.queryByPlaceholderText<'a'>(/foo/).should($element => {
    const element = $element.get(0)

    if (element) {
      expect(element.href).to.eq('')
    }
  })

  // With matcher function
  const matcherFn = (content: string, $element: HTMLElement) => true

  cy.queryByPlaceholderText<HTMLAudioElement>(matcherFn).should($element => {
    const element = $element.get(0)

    if (element) {
      expect(element.play).to.exist
    }
  })

  // With matcher options
  cy.queryAllByPlaceholderText<HTMLAudioElement>('foo', {
    collapseWhitespace: true,
    exact: true,
    timeout: 500,
    trim: true,
  }).should($elements => {
    const element = $elements[0]

    if (element) {
      expect(element.play).to.exist
    }
  })
})
