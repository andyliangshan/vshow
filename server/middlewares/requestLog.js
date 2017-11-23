const logger = require('../common/logger');

module.exports = (req, res, next) => {
  // Assets do not out log.
  if (exports.ignore.test(req.url)) {
    next();
    return;
  }
  const t = new Date();
  logger.info('\n\nStarted ' + t.toISOString() + ' -- ' + req.method + ' -- ' + req.url + ' -- ' + req.ip);
  res.on('finish', () => {
    const duration = ((new Date()) - t);
    logger.info('Completed ' + res.statusCode + ' -- ' + ('(' + duration + 'ms)'));
  });

  next();
};

exports.ignore = /^\/(public|api)/;
