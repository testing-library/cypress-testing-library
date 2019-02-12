<div align="center">
<h1>cypress-testing-library</h1>

<a href="https://www.emojione.com/emoji/1f405">
<img height="80" width="80" alt="tiger" src="https://raw.githubusercontent.com/kentcdodds/cypress-testing-library/master/other/tiger.png" />
</a>

<p>Simple and complete custom Cypress commands and utilities that encourage good testing practices.</p>

[**Read the docs**](https://testing-library.com/cypress) | [Edit the docs](https://github.com/alexkrolick/testing-library-docs)

</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

<div align="center">
<a href="https://testingjavascript.com">
<img width="500" alt="TestingJavaScript.com Learn the smart, efficient way to test any JavaScript application." src="https://raw.githubusercontent.com/kentcdodds/cypress-testing-library/master/other/testingjavascript.jpg" />
</a>
</div>

## The problem

You want to use [`dom-testing-library`][dom-testing-library] methods in your [Cypress][cypress] tests.

## This solution

This allows you to use all the useful [`dom-testing-library`][dom-testing-library] methods in your tests.

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
npm install --save-dev cypress-testing-library
```

### With typescript

Typings are defined under `cypress-testing-library/typings`, and should be added as follows in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["cypress", "../cypress-testing-library/typings"]
  }
}
```

## Usage

`cypress-testing-library` extends Cypress' `cy` command.

Add this line to your project's `cypress/support/commands.js`:

```
import 'cypress-testing-library/add-commands';
```

You can now use all of `dom-testing-library`'s `getBy`, `getAllBy`, `queryBy` and `queryAllBy` commands. [See `dom-testing-library` repo for reference](https://github.com/kentcdodds/dom-testing-library#usage)

To show some simple examples (from [cypress/integration/commands.spec.js](cypress/integration/commands.spec.js)):

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

`cypress-testing-library` supports both jQuery elements and DOM nodes. This is necessary because Cypress uses jQuery elements, while `dom-testing-library` expects DOM nodes. When you pass a jQuery element as `container`, it will get the first DOM node from the collection and use that as the `container` parameter for the `dom-testing-library` functions.

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub><b>Kent C. Dodds</b></sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=kentcdodds "Code") [📖](https://github.com/kentcdodds/cypress-testing-library/commits?author=kentcdodds "Documentation") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=kentcdodds "Tests") | [<img src="https://avatars2.githubusercontent.com/u/498274?v=4" width="100px;"/><br /><sub><b>Ivan Babak</b></sub>](https://sompylasar.github.io)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=sompylasar "Code") [🤔](#ideas-sompylasar "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/4002543?v=4" width="100px;"/><br /><sub><b>Łukasz Gandecki</b></sub>](http://team.thebrain.pro)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=lgandecki "Code") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=lgandecki "Tests") | [<img src="https://avatars1.githubusercontent.com/u/25429764?v=4" width="100px;"/><br /><sub><b>Peter Kamps</b></sub>](https://github.com/npeterkamps)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=npeterkamps "Code") [📖](https://github.com/kentcdodds/cypress-testing-library/commits?author=npeterkamps "Documentation") [🤔](#ideas-npeterkamps "Ideas, Planning, & Feedback") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=npeterkamps "Tests") | [<img src="https://avatars3.githubusercontent.com/u/4506749?v=4" width="100px;"/><br /><sub><b>Airat Aminev</b></sub>](https://github.com/airato)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=airato "Code") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=airato "Tests") [🔧](#tool-airato "Tools") | [<img src="https://avatars0.githubusercontent.com/u/5121148?v=4" width="100px;"/><br /><sub><b>Adrian Smijulj</b></sub>](https://www.webiny.com)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=adrian1358 "Code") | [<img src="https://avatars0.githubusercontent.com/u/12230408?v=4" width="100px;"/><br /><sub><b>Soo Jae Hwang</b></sub>](https://www.ossfinder.com)<br />[🐛](https://github.com/kentcdodds/cypress-testing-library/issues?q=author%3Amisoguy "Bug reports") [💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=misoguy "Code") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=misoguy "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="100px;"/><br /><sub><b>Justin Hall</b></sub>](https://github.com/wKovacs64)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=wKovacs64 "Code") [⚠️](https://github.com/kentcdodds/cypress-testing-library/commits?author=wKovacs64 "Tests") | [<img src="https://avatars3.githubusercontent.com/u/9463809?v=4" width="100px;"/><br /><sub><b>euzebe</b></sub>](https://github.com/euZebe)<br />[📖](https://github.com/kentcdodds/cypress-testing-library/commits?author=euZebe "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/19804196?v=4" width="100px;"/><br /><sub><b>jkdowdle</b></sub>](https://github.com/jkdowdle)<br />[💻](https://github.com/kentcdodds/cypress-testing-library/commits?author=jkdowdle "Code") |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/cypress-testing-library.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/cypress-testing-library
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/cypress-testing-library.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/cypress-testing-library
[version-badge]: https://img.shields.io/npm/v/cypress-testing-library.svg?style=flat-square
[package]: https://www.npmjs.com/package/cypress-testing-library
[downloads-badge]: https://img.shields.io/npm/dm/cypress-testing-library.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/cypress-testing-library
[license-badge]: https://img.shields.io/npm/l/cypress-testing-library.svg?style=flat-square
[license]: https://github.com/kentcdodds/cypress-testing-library/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/cypress-testing-library/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/cypress-testing-library.svg?style=social
[github-watch]: https://github.com/kentcdodds/cypress-testing-library/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/cypress-testing-library.svg?style=social
[github-star]: https://github.com/kentcdodds/cypress-testing-library/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20cypress-testing-library%20by%20%40kentcdodds%20https%3A%2F%2Fgithub.com%2Fkentcdodds%2Fcypress-testing-library%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/cypress-testing-library.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[dom-testing-library]: https://github.com/kentcdodds/dom-testing-library
[cypress]: https://www.cypress.io/
