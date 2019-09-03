describe('get* queries should error', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    const queryPrefixes = ['By', 'AllBy']
    const queryTypes = ['LabelText', 'PlaceholderText', 'Text', 'DisplayValue', 'AltText', 'Title', 'Role', 'TestId']

    queryPrefixes.forEach(queryPrefix => {
        queryTypes.forEach(queryType => {
            const obsoleteQueryName = `get${queryPrefix + queryType}`;
            const preferredQueryName = `find${queryPrefix + queryType}`;
            it(`${obsoleteQueryName} should error and suggest using ${preferredQueryName}`, () => {

                const errorMessage = `You used '${obsoleteQueryName}' which has been removed from Cypress Testing Library because it does not make sense in this context. Please use '${preferredQueryName}' instead.`
                cy.on('fail', err => {
                    expect(err.message).to.eq(errorMessage)
                })

                cy[`${obsoleteQueryName}`]('Irrelevant')
            })
        })
    })
})

/* global cy */