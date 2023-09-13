/** @type {import("prettier").Config} */
const config = {
  ...require('@redhat-cloud-services/eslint-config-redhat-cloud-services/prettier.config.js'),
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
};

module.exports = config;
