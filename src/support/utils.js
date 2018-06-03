function getElement(element) {
  if (Cypress.dom.isJquery(element)) {
    return element.get(0)
  }
  return element
}

function getContainer(cy, container) {
  const withinContainer = cy.state('withinSubject')
  if (withinContainer) {
    return getElement(withinContainer)
  }
  return getElement(container)
}

export {
  getElement,
  getContainer,
}

/* globals Cypress */
