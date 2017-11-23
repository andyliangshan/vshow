/**
 * server config
 */
// ----------------------------------
// local modules
// ----------------------------------
import path from 'path';
import fs from 'fs';

// ----------------------------------
// npm modules
// ----------------------------------
import Loader from 'loader';
import express from 'express';
import partials from 'express-partials';
import session from 'express-session';
import errorhandler from 'errorhandler';
import moment from 'moment';
import _ from 'lodash';
import csurf from 'csurf';
import compress from 'compression';
import bodyParser from 'body-parser';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import busboy from 'connect-busboy';
import bytes from 'bytes';
import favicon from 'serve-favicon';
import connectFlash from 'connect-flash';


// ----------------------------------
// custome file modules
// ----------------------------------
import systemConfig from './server/config/system';
import errorPageMiddleware from './server/middlewares/errorPage';
import requestLog from './server/middlewares/requestLog';
import renderMiddleware from './server/middlewares/render';
import logger from './server/common/logger';
import auth from './server/middlewares/auth';
import ejsRender from './server/middlewares/ejsRender';

const RedisStore = connectRedis(session);

/**
 * static dir
 */
const staticDir = path.join(__dirname, 'public');

/**
 * assets
 */
let assets = {};
if (systemConfig.mini_assets) {
  try {
    assets = require('./assets.json');
  } catch (err) {
    logger.error('must execute `npm run build` before start app when mini_assets is true');
    throw err;
  }
}

const app = express();
app.use(compress());

/**
 * view config
 */
app.set('views', path.join(__dirname, 'server/views'));
//  app.engine('.html', ejsLocals);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');

/**
 * Request logger . 请求时间
 */
app.use(requestLog);

/**
 * 渲染时间
 */
systemConfig.debug && app.use(renderMiddleware.render);

/**
 * static files
 */
app.use('/public', express.static(staticDir, {maxAge: 3600000 * 24 * 365}));

/**
 * normal module
 */
app.use(require('response-time')());
app.use(partials());
app.use(helmet.frameguard('sameorigin')); //  make sure before router---Only let me be framed by people of the same origin:
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(require('method-override')());
app.use(require('cookie-parser')(systemConfig.session_secret));
app.use(session({
  secret: systemConfig.session_secret,
  store: new RedisStore({
    port: systemConfig.redis.port,
    host: systemConfig.redis.host,
  }),
  resave: true,
  saveUninitialized: true,
  name: 'pc.sem.sid'
}));
app.use(connectFlash());
/**
 * custom middleware here 自定义中间件
 */
app.use(auth.authApply);
//app.use(auth.analysisHost);

/**
 * view cache
 */
if (!systemConfig.debug) {
  app.set('view cache', true);
}

_.extend(app.locals, {
  config: systemConfig,
  Loader: Loader,
  assets: assets,
  moment: moment,
});

/**
 * error logs
 */
app.use(errorPageMiddleware.errorPage);

/**
 * csurf token
 */
app.use((req, res, next)=> {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

/**
 * ejs 渲染变量检查
 */
app.use((req, res, next) => {
  ejsRender.ejsSingleVariableHelp(req, res, next);
});

/**
 * files upload limits
 */
app.use(busboy({
  limits: {
    fileSize: bytes('1MB'),  //  1M
  },
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
   // res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
   	 res.send(200); //让options请求快速返回
    } else {
    	next();
    }
});
/**
 * routers loading
 */
app.use('/', require('./server/routers/site'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.render404(err);
});

// development error handler
// will print stacktrace
if (systemConfig.debug) {
  app.use(errorhandler());
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.error('server 500 error: url: ' + req.url);
  console.log('............////////////////...................////////////////////...........');
  return res.status(500).send('500 status');
  //res.status(err.status || 500);
  //res.render('error', {
  //  layout: false,
  //  message: err.message,
  //  error: {},
  //});
});

if (!module.parent) {
  app.listen(systemConfig.server_port, ()=> {
    logger.info('❤️  sem listening on port', systemConfig.server_port || 3001);
    logger.info('❤️  You can debug with http://' + systemConfig.server_host + ':' + systemConfig.server_port);
  });
}

export default app;
