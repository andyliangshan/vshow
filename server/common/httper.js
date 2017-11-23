/* eslint arrow-body-style:0 */

const config = require('../config/system');
const request = require('request');
const logger = require('./logger');
const mail = require('./mail');
const util = require('util');
const moment = require('moment');

const headers = {
  'User-Agent': 'request-api-panamera',
  'X_HPZ_APPLICATION_ID': 'huracan',
  'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
};

/**
 * just for es6 promise /get
 * @param url
 */
exports.pormiseGet = (url, headersInfo) => new Promise((resolve, reject)=> {
  const preTime = Date.now();
  logger.info('request-get-url: ' + url);
  const options = {
    url: url,
    method: 'GET',
    headers: headers,
    timeout: 20000,
  };
  // add login cookie
  if (headersInfo) {
    Object.assign(options.headers, headersInfo);
  }
  request(options, (error, response, content)=> {
    //  reject({ Error: 'getaddrinfo ENOTFOUND'});
    //  return;
    if (!error && response.statusCode === 200) {
      logger.info('request-get-url: ' + url + '****' + (Date.now() - preTime) + 'ms');
      let data;
      try {
        data = JSON.parse(content);
        resolve(data);
      } catch (err) {
        logger.error('request-get-url parse return data : ' + error + ' url:' + url);
        reject(err);
      }
    } else {
      logger.error('request-get-url-error: ' + error + ' content:' + content + ' url:' + url + '****' + (Date.now() - preTime) + 'ms');
      if (!headersInfo) {
        !config.debug && mail('北京时间:' + moment().format('YYYY-MM-DD H:mm:ss') + '; \n请求接口' + url + ' 出错. 错误信息为: ' + util.inspect(error));
      }
      reject(error);
    }
  });
});

/**
 * just for es6 promise /post
 * @param url
 * @param params  form data
 */
exports.promisePost = (url, params) => new Promise((resolve, reject)=> {
  logger.info('request-post-url: ' + url);
  const options = {
    url: url,
    method: 'POST',
    json: true,
    formData: params,
    timeout: config.httper.timeout,
  };
  request(options, (error, response, content) => {
    if (!error && response.statusCode === 200) {
      console.log(content);
      resolve(content);
    } else {
      logger.error('request-post-error: ' + error + ' url:' + url);
      reject(error);
    }
  });
});

exports.get = (url, callback) => {
  logger.info('request-get-url: ' + url);
  const options = {
    url: url,
    method: 'GET',
    headers: headers,
    timeout: config.httper.timeout,
  };
  request(options, (error, response, content)=> {
    if (!error && response.statusCode === 200) {
      callback(error, JSON.parse(content));
    } else {
      logger.error('request-get-url-error: ' + error + ' url:' + url);
      callback(error);
    }
  });
};

exports.post = (url, params, callback) => {
  logger.info('request-post-url: ' + url);
  const options = {
    url: url,
    method: 'POST',
    json: true,
    formData: params,
    timeout: config.httper.timeout,
  };
  //  request.post({url:url,formData:params}, function (error, response, content) {
  //  if (!error && response.statusCode === 200) {
  //    callback(error, content);
  //  } else {
  //    logger.error('request-post-error: ' + error + ' url:' + url);
  //    callback(error);
  //  }
  //  });
  request(options, (error, response, content) => {
    if (!error && response.statusCode === 200) {
      callback(error, content);
    } else {
      logger.error('request-post-error: ' + error + ' url:' + url);
      callback(error);
    }
  });
};
