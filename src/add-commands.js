import {commands} from './'

commands.forEach(({name, command}) => {
  Cypress.Commands.add(name, command)
})

/* global Cypress */
