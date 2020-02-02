import {configure, commands} from './'

commands.forEach(({name, command, options = {}}) => {
  Cypress.Commands.add(name, options, command)
})

Cypress.Commands.add('configureCypressTestingLibrary', config => {
  configure(config)
})

/* global Cypress */
