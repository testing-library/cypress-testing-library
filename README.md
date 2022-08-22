<div align="center">
<h1>Cypress Testing Library</h1>

<a href="https://www.emojione.com/emoji/1f405">
  <img
    height="80"
    width="80"
    alt="tiger"
    src="https://raw.githubusercontent.com/testing-library/cypress-testing-library/main/other/tiger.png"
  />
</a>

<p>Simple and complete custom Cypress commands and utilities that encourage good
testing practices.</p>

[**Read the docs**](https://testing-library.com/cypress) |
[Edit the docs](https://github.com/alexkrolick/testing-library-docs)

</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

<div align="center">
  <a href="https://testingjavascript.com">
    <img
      width="500"
      alt="TestingJavaScript.com Learn the smart, efficient way to test any JavaScript application."
      src="https://raw.githubusercontent.com/testing-library/cypress-testing-library/main/other/testingjavascript.jpg"
    />
  </a>
</div>

## The problem

You want to use [`DOM Testing Library`][dom-testing-library] methods in your
[Cypress][cypress] tests.

## This solution

This allows you to use all the useful
[`DOM Testing Library`][dom-testing-library] methods in your tests.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [With TypeScript](#with-typescript)
  - [Intellisense for JavaScript with VS Code](#intellisense-for-javascript-with-vs-code)
- [Usage](#usage)
  - [Differences from DOM Testing Library](#differences-from-dom-testing-library)
- [Config testIdAttribute](#config-testidattribute)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/cypress
```

### With TypeScript

Typings should be added as follows in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["cypress", "@testing-library/cypress"]
  }
}
```

### Intellisense for JavaScript with VS Code

If you're not using TypeScript, you use VS Code, and want to have
code-completion with the methods from this library, simply add the following
line to your project's root-level `jsconfig.json` file:

```json
{
  "include": ["node_modules/cypress", "./cypress/**/*.js"]
}
```

## Usage

`Cypress Testing Library` extends Cypress' `cy` command.

Add this line to your project's `cypress/support/commands.js`:

```javascript
import '@testing-library/cypress/add-commands'
```

You can now use all of `DOM Testing Library`'s `findBy` and `findAllBy`
commands.
[See the `DOM Testing Library` docs for reference](https://testing-library.com)

You can find
[all Library definitions here](https://github.com/testing-library/cypress-testing-library/tree/main/types/index.d.ts).

To configure DOM Testing Library, use the following custom command:

```javascript
cy.configureCypressTestingLibrary(config)
```

To show some simple examples (from
[cypress/e2e/find.cy.js](cypress/e2e/find.cy.js)):

```javascript
cy.findAllByText('Button Text').should('exist')
cy.findAllByText('Non-existing Button Text').should('not.exist')
cy.findAllByLabelText('Label text', {timeout: 7000}).should('exist')
cy.findAllByText('Jackie Chan').click()

// findAllByText _inside_ a form element
cy.get('form').findAllByText('Button Text').should('exist')
```

### Differences from DOM Testing Library

`Cypress Testing Library` supports both jQuery elements and DOM nodes. This is
necessary because Cypress uses jQuery elements, while `DOM Testing Library`
expects DOM nodes. When you chain a query, it will get the first DOM node from
`subject` of the collection and use that as the `container` parameter for the
`DOM Testing Library` functions.

`query*` queries are not supported. You should use the `should('not.exist')`
assertion instead to check for the absence of an element.

`get*` queries are not supported. `find*` queries do not use the Promise API of
`DOM Testing Library`, but instead forward to the `get*` queries and use
Cypress' built-in retryability using error messages from `get*` APIs to forward
as error messages if a query fails.

`findAll*` can select more than one element and is closer in functionality to
how Cypress built-in commands work. `find*` commands will fail if more than one
element is found that matches the criteria which is not how built-in Cypress
commands work, but is provided for closer compatibility to other Testing
Libraries.

Cypress handles actions when there is only one element found. For example, the
following will work without having to limit to only 1 returned element. The
`cy.click` will automatically fail if more than 1 element is returned by the
`findAllByText`:

```javascript
cy.findAllByText('Some Text').click()
```

If you intend to enforce only 1 element is returned by a selector, the following
examples will both fail if more than one element is found.

```javascript
cy.findAllByText('Some Text').should('have.length', 1)
cy.findByText('Some Text').should('exist')
```

## Config testIdAttribute

If you would like to change the default testId from `data-testId` to
`data-test-id`, add to your project's `cypress/support/index.js`:

```javascript
import {configure} from '@testing-library/cypress'
configure({testIdAttribute: 'data-test-id'})
```

It accepts all configurations listed in
[DOM testing library](https://testing-library.com/docs/dom-testing-library/api-configuration).

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://sompylasar.github.io"><img src="https://avatars2.githubusercontent.com/u/498274?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan Babak</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=sompylasar" title="Code">💻</a> <a href="#ideas-sompylasar" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://team.thebrain.pro"><img src="https://avatars1.githubusercontent.com/u/4002543?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Łukasz Gandecki</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=lgandecki" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=lgandecki" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/npeterkamps"><img src="https://avatars1.githubusercontent.com/u/25429764?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Peter Kamps</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Documentation">📖</a> <a href="#ideas-npeterkamps" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/airato"><img src="https://avatars3.githubusercontent.com/u/4506749?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Airat Aminev</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=airato" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=airato" title="Tests">⚠️</a> <a href="#tool-airato" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.webiny.com"><img src="https://avatars0.githubusercontent.com/u/5121148?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrian Smijulj</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=adrian1358" title="Code">💻</a></td>
    <td align="center"><a href="https://www.ossfinder.com"><img src="https://avatars0.githubusercontent.com/u/12230408?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Soo Jae Hwang</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3Amisoguy" title="Bug reports">🐛</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=misoguy" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=misoguy" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=wKovacs64" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=wKovacs64" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/euZebe"><img src="https://avatars3.githubusercontent.com/u/9463809?v=4?s=100" width="100px;" alt=""/><br /><sub><b>euzebe</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=euZebe" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jkdowdle"><img src="https://avatars0.githubusercontent.com/u/19804196?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jkdowdle</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=jkdowdle" title="Code">💻</a></td>
    <td align="center"><a href="https://brian.ng"><img src="https://avatars3.githubusercontent.com/u/56288?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brian Ng</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=existentialism" title="Code">💻</a></td>
    <td align="center"><a href="https://karilaari.fi"><img src="https://avatars2.githubusercontent.com/u/2477131?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kari Laari</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=klaari" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ppi-buck"><img src="https://avatars2.githubusercontent.com/u/37330764?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Basti Buck</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=ppi-buck" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ShimiTheFirst"><img src="https://avatars2.githubusercontent.com/u/25421369?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ShimiTheFirst</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3AShimiTheFirst" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/omerose"><img src="https://avatars2.githubusercontent.com/u/9358542?v=4?s=100" width="100px;" alt=""/><br /><sub><b>omerose</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=omerose" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.aaronmcadam.com"><img src="https://avatars3.githubusercontent.com/u/37928?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aaron Mc Adam</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=aaronmcadam" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=aaronmcadam" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/karlhorky"><img src="https://avatars2.githubusercontent.com/u/1935696?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Karl Horky</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=karlhorky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/NoriSte"><img src="https://avatars0.githubusercontent.com/u/173663?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stefano Magni</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=NoriSte" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=NoriSte" title="Tests">⚠️</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=NoriSte" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/weyert"><img src="https://avatars3.githubusercontent.com/u/7049?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Weyert de Boer</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=weyert" title="Code">💻</a></td>
    <td align="center"><a href="https://simjes.dev/"><img src="https://avatars0.githubusercontent.com/u/6494049?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simon Jespersen</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=simjes" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/pulls?q=is%3Apr+reviewed-by%3Asimjes" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://afontcu.dev"><img src="https://avatars0.githubusercontent.com/u/9197791?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrià Fontcuberta</b></sub></a><br /><a href="#infra-afontcu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=afontcu" title="Documentation">📖</a> <a href="https://github.com/testing-library/cypress-testing-library/pulls?q=is%3Apr+reviewed-by%3Aafontcu" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Megoos"><img src="https://avatars2.githubusercontent.com/u/9866017?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mikhail Guskov</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3AMegoos" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://jds.work"><img src="https://avatars1.githubusercontent.com/u/10285055?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JD Gonzales</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=juliusdelta" title="Documentation">📖</a></td>
    <td align="center"><a href="https://yvonnickfrin.dev"><img src="https://avatars0.githubusercontent.com/u/13099512?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yvonnick FRIN</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=frinyvonnick" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.franck-abgrall.me/"><img src="https://avatars3.githubusercontent.com/u/9840435?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Franck Abgrall</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/pulls?q=is%3Apr+reviewed-by%3Akefranabg" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://twitter.com/tlrobinson"><img src="https://avatars0.githubusercontent.com/u/18193?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tom Robinson</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=tlrobinson" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=tlrobinson" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/NicholasBoll"><img src="https://avatars2.githubusercontent.com/u/338257?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nicholas Boll</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=NicholasBoll" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=NicholasBoll" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/FlopieUtd"><img src="https://avatars3.githubusercontent.com/u/23555863?v=4?s=100" width="100px;" alt=""/><br /><sub><b>FlopieUtd</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=FlopieUtd" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/leosuncin"><img src="https://avatars1.githubusercontent.com/u/4307697?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jaime Leonardo Suncin Cruz</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3Aleosuncin" title="Bug reports">🐛</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=leosuncin" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=leosuncin" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://matt.travi.org"><img src="https://avatars1.githubusercontent.com/u/126441?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Travi</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=travi" title="Code">💻</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=MichaelDeBoey" title="Code">💻</a></td>
    <td align="center"><a href="https://huchen.dev"><img src="https://avatars3.githubusercontent.com/u/2078389?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hu Chen</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=huchenme" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/frederickfogerty"><img src="https://avatars0.githubusercontent.com/u/615334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Frederick Fogerty</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=frederickfogerty" title="Code">💻</a></td>
    <td align="center"><a href="https://kylemh.com"><img src="https://avatars1.githubusercontent.com/u/9523719?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle Holmberg</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=kylemh" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Thisen"><img src="https://avatars2.githubusercontent.com/u/10807938?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mathis Møller</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=Thisen" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=Thisen" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/SimenB"><img src="https://avatars1.githubusercontent.com/u/1404810?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simen Bekkhus</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=SimenB" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/amitmiran137"><img src="https://avatars.githubusercontent.com/u/47772523?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Amit Miran</b></sub></a><br /><a href="#infra-amitmiran137" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/leschdom"><img src="https://avatars.githubusercontent.com/u/62334278?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dominik Lesch</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=leschdom" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Andarist"><img src="https://avatars.githubusercontent.com/u/9800850?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mateusz Burzyński</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=Andarist" title="Code">💻</a></td>
    <td align="center"><a href="https://nielsdb97.nl"><img src="https://avatars.githubusercontent.com/u/11021818?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Niels de Bruin</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=nielsdB97" title="Code">💻</a></td>
    <td align="center"><a href="https://matan.io"><img src="https://avatars.githubusercontent.com/u/12711091?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matan Borenkraout</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=MatanBobi" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/testing-library/cypress-testing-library/validate?logo=github&style=flat-square
[build]: https://github.com/testing-library/cypress-testing-library/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/testing-library/cypress-testing-library.svg?style=flat-square
[coverage]: https://codecov.io/github/testing-library/cypress-testing-library
[version-badge]: https://img.shields.io/npm/v/@testing-library/cypress.svg?style=flat-square
[package]: https://www.npmjs.com/package/@testing-library/cypress
[downloads-badge]: https://img.shields.io/npm/dm/@testing-library/cypress.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/@testing-library/cypress
[license-badge]: https://img.shields.io/npm/l/@testing-library/cypress.svg?style=flat-square
[license]: https://github.com/testing-library/cypress-testing-library/blob/main/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/testing-library/cypress-testing-library/blob/main/other/CODE_OF_CONDUCT.md
[emojis]: https://allcontributors.org/docs/en/emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/testing-library/cypress-testing-library?color=orange&style=flat-square
[bugs]: https://github.com/testing-library/cypress-testing-library/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%90%9B+Bug%22+sort%3Acreated-desc
[requests]: https://github.com/testing-library/cypress-testing-library/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/testing-library/cypress-testing-library/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A%22good+first+issue%22

[cypress]: https://cypress.io
[dom-testing-library]: https://github.com/testing-library/dom-testing-library
<!-- prettier-ignore-end -->
