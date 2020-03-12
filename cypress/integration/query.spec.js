describe('get* queries should error', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/test-app/')
  })

  const queryPrefixes = ['By', 'AllBy']
  const queryTypes = [
    'LabelText',
    'PlaceholderText',
    'Text',
    'DisplayValue',
    'AltText',
    'Title',
    'Role',
    'TestId',
  ]

  queryPrefixes.forEach(queryPrefix => {
    queryTypes.forEach(queryType => {
      const obsoleteQueryName = `query${queryPrefix + queryType}`
      const preferredQueryName = `find${queryPrefix + queryType}`
      it(`${obsoleteQueryName} should error and suggest using ${preferredQueryName}`, () => {
        const errorMessage = `You used '${obsoleteQueryName}' which has been removed from Cypress Testing Library because it does not make sense in this context. Please use '${preferredQueryName}' instead.`
        cy.on('fail', err => {
          expect(err.message).to.eq(errorMessage)
        })

        cy[`${obsoleteQueryName}`]('Irrelevant')
      })

      it(`${obsoleteQueryName} should not log more than once`, () => {
        let logCount = 0
        cy.on('log:added', (attrs, log) => {
          if (log.get('name') === obsoleteQueryName) {
            logCount = logCount + 1
          }
        })

        cy.on('fail', _ => {
          expect(logCount).to.equal(1)
          cy.removeAllListeners('log:added')
        })

        cy[`${obsoleteQueryName}`]('Irrelevant')
      })
    })
  })
})

/* global cy */
