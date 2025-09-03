module.exports = {
  extends: './node_modules/kcd-scripts/eslint.js',
  rules: {
    'max-lines-per-function': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/no-dom-import': 'off', // We're not using React Testing Library here. We're wrapping DOM Testing Library directly
    '@typescript-eslint/no-explicit-any': 'off', // let's do better in the future
  },
}
