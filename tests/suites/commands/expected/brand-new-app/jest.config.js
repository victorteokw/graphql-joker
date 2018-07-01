module.exports = {
  projects: [
    {
      "displayName": "Model Test",
      "automock": false,
      "testMatch": ["<rootDir>/tests/models/*Test.js"],
      "setupTestFrameworkScriptFile": "mexpect",
      "testEnvironment": "./tests/modelEnv"
    },
    {
      "displayName": "Integration Test",
      "automock": false,
      "testMatch": ["<rootDir>/tests/integration/*Test.js"]
    }
  ]
};
