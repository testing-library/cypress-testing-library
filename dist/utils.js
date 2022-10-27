"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstElement = getFirstElement;
function getFirstElement(jqueryOrElement) {
  if (Cypress.dom.isJquery(jqueryOrElement)) {
    return jqueryOrElement.get(0);
  }
  return jqueryOrElement;
}

/* globals Cypress, cy */