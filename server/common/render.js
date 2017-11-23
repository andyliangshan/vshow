/**
 * Created by noodles on 16/3/27.
 * description
 */

import logger from './logger';
import mail from './mail';
import util from 'util';
import moment from 'moment';
import config from '../config/system';

const renderCallback = (req, res, err, content) => {
  const reqUrl = req.url;
  if (err) {
    logger.error(`render page: ${reqUrl}; err message: ${err}`);
    !config.debug && mail('北京时间:' + moment(new Date().valueOf()).format('YYYY-MM-DD HH:ss') + '; \n页面渲染:' + req.url + '出错. 错误信息为: ' + util.inspect(err));
    if (config.debug) {
      res.send(err);
    } else {
      //  渲染错误直接抛404
      res.render404(err);
      //  res.send(500);
    }
  } else {
    //  !config.debug && !apiData.isCache && !req.session.currUser && cache.set(req.holeURL, content, config.cacheTime[pagestr]);
    res.send(content);
  }
};

const abroadTips = str => {
  return `vShow/${str}/`;
};

export default {
  renderCallback,
  abroadTips,
};

