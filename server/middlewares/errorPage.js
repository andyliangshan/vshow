/* eslint no-param-reassign:0 no-unused-vars:0 */
/**
 * error page middleware
 */
import logger from '../common/logger';

exports.errorPage = (req, res, next)=> {
  res.render404 = (error)=> {
    logger.info('render404..............' + req.url);
    return res.status(404).render('help/page404', {
      error: 'ㄟ( ▔, ▔ )ㄏ...请求资源不存在!!!',
      tdk: { title: 404 },
      assetsTitle: 'page404',
    });
    //  return res.status(404).render('help/error', {layout: false, error: error});
  };

  res.renderError = (error, statusCode)=> {
    if (statusCode === undefined) {
      statusCode = 400;
    }
    logger.error('renderError..............' + req.url);

    return res.status(statusCode).
    render('help/error', {
      error: error,
      layout: false,
    });
  };

  next();
};
