module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:astro/recommended',
    'standard-with-typescript',
    'prettier-plugin-astro',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
}
