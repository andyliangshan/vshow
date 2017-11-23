import fs from 'fs';
import _debug from 'debug';
import config from './_base';

const debug = _debug('app:config');
debug('Create configuration.');
debug(`Apply environment overrides for NODE_ENV "${config.env}".`);

const overridesFilename = `system.${config.env}`;

const overrides = require(`./${overridesFilename}`);

export default Object.assign({}, config, overrides(config));
