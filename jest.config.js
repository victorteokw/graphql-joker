module.exports = {
  testRegex: '/tests/.*Test\\.js',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/oldTests/',
    '/tests/suites/commands/expected/'
  ],
  'testEnvironment': 'node'
};
