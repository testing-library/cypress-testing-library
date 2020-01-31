import {commands} from './'

commands.forEach(({name, command, options = {}}) => {
  Cypress.Commands.add(name, options, command)
})

/* global Cypress */
