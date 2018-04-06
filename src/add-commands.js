import {commands} from './'

commands.forEach(({command, name}) => {
  Cypress.Commands.add(name, command)
})

/* global Cypress */
