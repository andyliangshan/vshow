/**
 * sms 短信提醒
 */
import smsConfigs from '../config/system';
import https from 'https';
import querystring from 'querystring';
import logger from './logger';

const send = (number, content) => {
  if (typeof number !== 'string') {
    return false;
  }

  const data = {
    mobile: number,
    message: content + smsConfigs.sms.suffix,
  };

  const sendStr = querystring.stringify(data);

  const options = {
    host: smsConfigs.sms.host,
    path: smsConfigs.sms.path,
    method: 'POST',
    auth: smsConfigs.sms.api_key,
    agent: false,
    rejectUnauthorized: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': sendStr.length,
    },
  };

  try {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        console.log(`----------- SMS Message sent result: ${chunk} -------------`);
      });
      res.on('end', () => {
        console.log('SMS request end.');
      });
    });

    req.write(sendStr);
    req.end();
  } catch (error) {
    logger.error(error);
  }
  return '';
};

export default {
  send,
};
