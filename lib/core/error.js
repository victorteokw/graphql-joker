class AmurInternalError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'AmurInternalError';
  }
}

const error = (...args) => new AmurInternalError(...args);

module.exports = error;
