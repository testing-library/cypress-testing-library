describe('Foo', () => {
  it('has proper types', () => {
    cy.visit('#/foo')

    cy.getAllByPlaceholderText('foo').should(elements => {
      // argument should be an array of HTML elements
      expect(elements.length).to.eq(0)
      expect(elements[0].tagName).to.eq(0)
    })

    // with regex
    cy.queryByPlaceholderText<'a'>(/foo/).should(element => {
      // node can be null
      if (element) {
        // argument should be an anchor
        expect(element.href).to.eq('')
      }
    })

    // with matcher function
    const matcherFn = (content: string, element: HTMLElement) => true

    cy.queryByPlaceholderText<HTMLAudioElement>(matcherFn).should(element => {
      // node can be null
      if (element) {
        // argument should be an Audio element
        expect(element.play).to.exist
      }
    })

    // with matcher options
    cy.queryAllByPlaceholderText<HTMLAudioElement>('foo', {
      collapseWhitespace: true,
      exact: true,
      timeout: 500,
      trim: true,
    }).should(elements => {
      const el = elements[0]
      // node can be null
      if (el) {
        // argument should be an array of Audio elements
        expect(el.play).to.exist
      }
    })
  })
})
