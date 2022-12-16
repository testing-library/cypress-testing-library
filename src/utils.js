function getFirstElement(jqueryOrElement) {
  if (Cypress.dom.isJquery(jqueryOrElement)) {
    return jqueryOrElement.get(0)
  }
  return jqueryOrElement
}

export {getFirstElement}

/* globals Cypress */
