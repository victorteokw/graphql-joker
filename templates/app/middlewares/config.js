module.exports = function(config) {
  return async function(ctx, next) {
    ctx.config = config;
    await next();
  };
};
