const config = require('noenv');
const setup = require('mexpect/lib/setup');
const tearDown = require('mexpect/lib/tearDown');
const path = require('path');
const mongoose = require('mongoose');
const NodeEnvironment = require('jest-environment-node');

class ModelEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    await setup(
      config.database.url,
      path.join(__dirname, '../models'),
      mongoose,
      this
    );
  }

  async teardown() {
    await tearDown(this);
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = ModelEnvironment;
