import {commands} from './'

commands.forEach(({name, command}) => {
  Cypress.Commands.add(name, command.bind(null, cy))
})

/* global Cypress, cy */
