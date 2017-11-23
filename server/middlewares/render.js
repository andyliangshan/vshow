const logger = require('../common/logger');

/**
 * res.render method to output logger
 * @param req
 * @param res
 * @param next
 */
exports.render = (req, res, next) => {
  res._render = res.render;
  res.render = (view, options, fn) => {
    const t = new Date();
    res._render(view, options, fn);
    const duration = (new Date() - t);
    logger.info('Render view ' + view + ' -- ' + ('(' + duration + 'ms)'));
  };
  next();
};
