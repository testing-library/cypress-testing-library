import {configure, commands} from './'

commands.forEach(({name, command}) => {
  if (cy[name]) {
    Cypress.Commands.overwriteQuery(name, command)
  } else {
    Cypress.Commands.addQuery(name, command)
  }
})

Cypress.Commands.add('configureCypressTestingLibrary', config => {
  configure(config)
})

/* global Cypress */
