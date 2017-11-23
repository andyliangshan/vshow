/**
 * Created by noodles
 * description logs/log4js using Log
 */


const log4js = require('log4js');
const path = require('path');
const colors = require('colors');

const filePath = path.join(__dirname, '../../logs/log4js/vShow');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red',
});


log4js.configure({
  appenders: [
    {
      type: 'dateFile',
      filename: filePath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
  ],
}, {});

const logger = log4js.getLogger('vShow');

exports.info = (message) => {
  console.log(message.info);
  logger.info(message);
};

exports.debug = (message) => {
  console.log(message.magenta);
  logger.debug(message);
};

exports.trace = (message) => {
  console.log(message.data);
  logger.trace(message);
};

exports.warn = (message) => {
  console.log(message.yellow);
  logger.warn(message);
};

exports.error = (message) => {
  console.log(message.red);
  logger.error(message);
};

exports.fatal = (message) => {
  console.log(message.rainbow);
  logger.fatal(message);
};
