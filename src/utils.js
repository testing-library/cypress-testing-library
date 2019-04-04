function getFirstElement(jqueryOrElement) {
  if (Cypress.dom.isJquery(jqueryOrElement)) {
    return jqueryOrElement.get(0)
  }
  return jqueryOrElement
}

function getContainer(container) {
  const withinContainer = cy.state('withinSubject')
  if (withinContainer) {
    return getFirstElement(withinContainer)
  }
  return getFirstElement(container)
}

export {getFirstElement, getContainer}

/* globals Cypress, cy */
