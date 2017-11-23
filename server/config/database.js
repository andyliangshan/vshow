const configDB = require('./database.' + process.env.NODE_ENV) || {};
export default configDB;
