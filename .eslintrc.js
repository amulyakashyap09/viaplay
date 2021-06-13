module.exports = {
  "ignorePatterns": ["**/node_modules/*", "**/logs/*", "**/*.test.js"],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};