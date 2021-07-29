function getFirstElement(jqueryOrElement) {
  if (Cypress.dom.isJquery(jqueryOrElement)) {
    return jqueryOrElement.get(0)
  }
  return jqueryOrElement
}

function getContainer(container) {
  const withinContainer = cy.state('withinSubject')
  if (container === undefined && withinContainer) {
    return getFirstElement(withinContainer)
  }

  return getFirstElement(container || cy.state('window').document)
}

export {getFirstElement, getContainer}

/* globals Cypress, cy */
