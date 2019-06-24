<div align="center">
<h1>cypress-testing-library</h1>

<a href="https://www.emojione.com/emoji/1f405">
  <img
    height="80"
    width="80"
    alt="tiger"
    src="https://raw.githubusercontent.com/testing-library/cypress-testing-library/master/other/tiger.png"
  />
</a>

<p>Simple and complete custom Cypress commands and utilities that encourage good
testing practices.</p>

[**Read the docs**](https://testing-library.com/cypress) |
[Edit the docs](https://github.com/alexkrolick/testing-library-docs)

</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

<div align="center">
  <a href="https://testingjavascript.com">
    <img
      width="500"
      alt="TestingJavaScript.com Learn the smart, efficient way to test any JavaScript application."
      src="https://raw.githubusercontent.com/testing-library/cypress-testing-library/master/other/testingjavascript.jpg"
    />
  </a>
</div>

## The problem

You want to use [`dom-testing-library`][dom-testing-library] methods in your
[Cypress][cypress] tests.

## This solution

This allows you to use all the useful
[`dom-testing-library`][dom-testing-library] methods in your tests.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [With typescript](#with-typescript)
- [Usage](#usage)
- [Other Solutions](#other-solutions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/cypress
```

### With typescript

Typings are defined under `@testing-library/cypress/typings`, and should be
added as follows in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["cypress", "../@testing-library/cypress/typings"]
  }
}
```

Or if tsconfig.json has a `baseUrl` of `../node_modules` as recommended in
the official Cypress documentation use:

```json
{
  "compilerOptions": {
    "types": ["cypress", "@testing-library/cypress/typings"]
  }
}
```

## Usage

`cypress-testing-library` extends Cypress' `cy` command.

Add this line to your project's `cypress/support/commands.js`:

```
import '@testing-library/cypress/add-commands';
```

You can now use all of `dom-testing-library`'s `getBy`, `getAllBy`, `queryBy`
and `queryAllBy` commands.
[See the `dom-testing-library` docs for reference](https://testing-library.com)

You can find [all Library definitions here](./typings/index.d.ts).

To show some simple examples (from
[cypress/integration/commands.spec.js](cypress/integration/commands.spec.js)):

```javascript
cy.getAllByText('Jackie Chan').click()
cy.queryByText('Button Text').should('exist')
cy.queryByText('Non-existing Button Text').should('not.exist')
cy.queryByLabelText('Label text', {timeout: 7000}).should('exist')
cy.get('form').within(() => {
  cy.getByText('Button Text').should('exist')
})
cy.get('form').then(subject => {
  cy.getByText('Button Text', {container: subject}).should('exist')
})
```

`cypress-testing-library` supports both jQuery elements and DOM nodes. This is
necessary because Cypress uses jQuery elements, while `dom-testing-library`
expects DOM nodes. When you pass a jQuery element as `container`, it will get
the first DOM node from the collection and use that as the `container` parameter
for the `dom-testing-library` functions.

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=kentcdodds" title="Tests">⚠️</a></td><td align="center"><a href="https://sompylasar.github.io"><img src="https://avatars2.githubusercontent.com/u/498274?v=4" width="100px;" alt="Ivan Babak"/><br /><sub><b>Ivan Babak</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=sompylasar" title="Code">💻</a> <a href="#ideas-sompylasar" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="http://team.thebrain.pro"><img src="https://avatars1.githubusercontent.com/u/4002543?v=4" width="100px;" alt="Łukasz Gandecki"/><br /><sub><b>Łukasz Gandecki</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=lgandecki" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=lgandecki" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/npeterkamps"><img src="https://avatars1.githubusercontent.com/u/25429764?v=4" width="100px;" alt="Peter Kamps"/><br /><sub><b>Peter Kamps</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Documentation">📖</a> <a href="#ideas-npeterkamps" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=npeterkamps" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/airato"><img src="https://avatars3.githubusercontent.com/u/4506749?v=4" width="100px;" alt="Airat Aminev"/><br /><sub><b>Airat Aminev</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=airato" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=airato" title="Tests">⚠️</a> <a href="#tool-airato" title="Tools">🔧</a></td><td align="center"><a href="https://www.webiny.com"><img src="https://avatars0.githubusercontent.com/u/5121148?v=4" width="100px;" alt="Adrian Smijulj"/><br /><sub><b>Adrian Smijulj</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=adrian1358" title="Code">💻</a></td><td align="center"><a href="https://www.ossfinder.com"><img src="https://avatars0.githubusercontent.com/u/12230408?v=4" width="100px;" alt="Soo Jae Hwang"/><br /><sub><b>Soo Jae Hwang</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3Amisoguy" title="Bug reports">🐛</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=misoguy" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=misoguy" title="Tests">⚠️</a></td></tr><tr><td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="100px;" alt="Justin Hall"/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=wKovacs64" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=wKovacs64" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/euZebe"><img src="https://avatars3.githubusercontent.com/u/9463809?v=4" width="100px;" alt="euzebe"/><br /><sub><b>euzebe</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=euZebe" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/jkdowdle"><img src="https://avatars0.githubusercontent.com/u/19804196?v=4" width="100px;" alt="jkdowdle"/><br /><sub><b>jkdowdle</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=jkdowdle" title="Code">💻</a></td><td align="center"><a href="https://brian.ng"><img src="https://avatars3.githubusercontent.com/u/56288?v=4" width="100px;" alt="Brian Ng"/><br /><sub><b>Brian Ng</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=existentialism" title="Code">💻</a></td><td align="center"><a href="https://karilaari.fi"><img src="https://avatars2.githubusercontent.com/u/2477131?v=4" width="100px;" alt="Kari Laari"/><br /><sub><b>Kari Laari</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=klaari" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/ppi-buck"><img src="https://avatars2.githubusercontent.com/u/37330764?v=4" width="100px;" alt="Basti Buck"/><br /><sub><b>Basti Buck</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=ppi-buck" title="Code">💻</a></td><td align="center"><a href="https://github.com/ShimiTheFirst"><img src="https://avatars2.githubusercontent.com/u/25421369?v=4" width="100px;" alt="ShimiTheFirst"/><br /><sub><b>ShimiTheFirst</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/issues?q=author%3AShimiTheFirst" title="Bug reports">🐛</a></td></tr><tr><td align="center"><a href="https://github.com/omerose"><img src="https://avatars2.githubusercontent.com/u/9358542?v=4" width="100px;" alt="omerose"/><br /><sub><b>omerose</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=omerose" title="Documentation">📖</a></td><td align="center"><a href="http://www.aaronmcadam.com"><img src="https://avatars3.githubusercontent.com/u/37928?v=4" width="100px;" alt="Aaron Mc Adam"/><br /><sub><b>Aaron Mc Adam</b></sub></a><br /><a href="https://github.com/testing-library/cypress-testing-library/commits?author=aaronmcadam" title="Code">💻</a> <a href="https://github.com/testing-library/cypress-testing-library/commits?author=aaronmcadam" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]:
  https://img.shields.io/travis/testing-library/cypress-testing-library.svg?style=flat-square
[build]: https://travis-ci.org/testing-library/cypress-testing-library
[coverage-badge]:
  https://img.shields.io/codecov/c/github/testing-library/cypress-testing-library.svg?style=flat-square
[coverage]: https://codecov.io/github/testing-library/cypress-testing-library
[version-badge]:
  https://img.shields.io/npm/v/cypress-testing-library.svg?style=flat-square
[package]: https://www.npmjs.com/package/@testing-library/cypress
[downloads-badge]:
  https://img.shields.io/npm/dm/@testing-library/cypress.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/@testing-library/cypress
[license-badge]:
  https://img.shields.io/npm/l/@testing-library/cypress.svg?style=flat-square
[license]:
  https://github.com/testing-library/cypress-testing-library/blob/master/LICENSE
[prs-badge]:
  https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]:
  https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]:
  https://github.com/testing-library/cypress-testing-library/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]:
  https://img.shields.io/github/watchers/testing-library/cypress-testing-library.svg?style=social
[github-watch]:
  https://github.com/testing-library/cypress-testing-library/watchers
[github-star-badge]:
  https://img.shields.io/github/stars/testing-library/cypress-testing-library.svg?style=social
[github-star]:
  https://github.com/testing-library/cypress-testing-library/stargazers
[twitter]:
  https://twitter.com/intent/tweet?text=Check%20out%20cypress-testing-library%20by%20%40kentcdodds%20https%3A%2F%2Fgithub.com%2Fkentcdodds%2Fcypress-testing-library%20%F0%9F%91%8D
[twitter-badge]:
  https://img.shields.io/twitter/url/https/github.com/testing-library/cypress-testing-library.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[dom-testing-library]: https://github.com/testing-library/dom-testing-library
[cypress]: https://www.cypress.io/
