/**
 * 发送自定义警报
 * @type {exports|module.exports}
 */
const mailer = require('nodemailer');
const config = require('../config/system');
const util = require('util');

const transport = mailer.createTransport(config.mail_opts);

const sendMail = mailObj => {
  transport.sendMail(mailObj, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};

const sendWarningMail = (warnMsg) => {
  const from = util.format('%s<%s>', '警报', config.mail_opts.auth.user);
  const sub = 'sem警报';
  const html = `<p>警报:${warnMsg} </p>'`;
  /* eslint-disable */
  sendMail({
    from: from,
    to: 'andyliang@shunshunliuxue.com',
    subject: sub,
    html: html,
  });
};
/* eslint-enable */

export default sendWarningMail;
