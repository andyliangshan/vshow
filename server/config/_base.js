/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug';
import path from 'path';
import { argv } from 'yargs';

//  const debug = _debug('app:config:_base');
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '../../'),
  dir_client: 'public',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'vshow.com',
  server_port: process.env.PORT || 3001,
  session_secret: 'pc.sem',

};

// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__BASENAME__': JSON.stringify(process.env.BASENAME || ''),
};

config.redis = {
  host: '127.0.0.1',
  port: 6379,
  db: 0,
};

config.sms = {
  host: 'sms-api.luosimao.com',
  path: '/v1/send.json',
  api_key: 'api:key-4c5851f99266d313e4f08a04f440ae1c',
  suffix: '【专业】',
};

config.mail_opts = {
  host: 'smtp.exmail.qq.com',
  port: 25,
  auth: {
    user: '',
    pass: '',
  },
};

config.cacheTime = {
  site: 60 * 60,  // 60*1 = 1min
  local: 60 * 30,
  list: 60 * 20,
  detail: 60 * 60,
};

config.domains = {
  site: 'http://www.vshow.com',
};

config.qnAccess = {
  accessKey: '5ZtczyWc3w1Tpb_4hrRowbAhQVG70wb6Btd6fmdt',
  secretKey: 'hFS_bQKBYPGZsk-Th1MAHoVJiOtzdJiOTVfRMTAg',
  bucket: 'awscrp',
  origin: 'http://7xin9i.com1.z0.glb.clouddn.com',
};

export default config;
