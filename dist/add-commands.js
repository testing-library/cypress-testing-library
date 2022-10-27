"use strict";

var _ = require("./");
_.commands.forEach(({
  name,
  command
}) => {
  Cypress.Commands.addQuery(name, command);
});
Cypress.Commands.add('configureCypressTestingLibrary', config => {
  (0, _.configure)(config);
});

/* global Cypress */