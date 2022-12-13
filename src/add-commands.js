import {configure, commands} from './'

commands.forEach(({name, command}) => {
  Cypress.Commands.addQuery(name, command)
})

Cypress.Commands.add('configureCypressTestingLibrary', config => {
  configure(config)
})

/* global Cypress */
