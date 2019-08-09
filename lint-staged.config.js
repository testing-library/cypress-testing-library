const config = require('kcd-scripts/dist/config/lintstagedrc')

// we need to exclude the test and lint scripts on commit because we run it in the validate script
const jsLinter = Object.keys(config).find(key => key.includes('js'))
config[jsLinter] = config[jsLinter].filter(
  script => !script.includes('test') && !script.includes('lint'),
)

module.exports = config
