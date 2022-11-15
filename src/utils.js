function getFirstElement(jqueryOrElement) {
  if (Cypress.dom.isJquery(jqueryOrElement)) {
    return jqueryOrElement.get(0)
  }
  return jqueryOrElement
}

function getContainer(container) {
  // Cypress 10 deprecated cy.state('subject') usage and suggest to use new cy.currentSubject.
  // https://docs.cypress.io/guides/references/changelog#10-5-0
  // Below change ensures we do not get spam of warnings and are backward compatible with older cypress versions.
  const subject = cy.currentSubject ? cy.currentSubject() : cy.state('subject');
  const withinContainer = cy.state('withinSubject')

  if (!subject && withinContainer) {
    return getFirstElement(withinContainer)
  }
  return getFirstElement(container)
}

export {getFirstElement, getContainer}

/* globals Cypress, cy */
