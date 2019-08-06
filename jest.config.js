module.exports = {
  'transform': {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  'testRegex': '/tests/.*Test\\.ts',
  'moduleFileExtensions': ['ts', 'tsx', 'js', 'jsx', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/expected/'
  ],
  'testEnvironment': 'node'
};
