class ParseSDLError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ParseSDLError';
  }
}

export default ParseSDLError;
