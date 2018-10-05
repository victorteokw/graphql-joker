module.exports = {
  testRegex: '/tests/.*Test\\.js',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/suites/commands/expected/'
  ],
  'testEnvironment': 'node'
};
