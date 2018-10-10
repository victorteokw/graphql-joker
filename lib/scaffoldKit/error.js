class ScaffoldKitInternalError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ScaffoldKitInternalError';
  }
}

const error = (...args) => new ScaffoldKitInternalError(...args);

module.exports = error;
