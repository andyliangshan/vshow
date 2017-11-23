import mongoose from 'mongoose';
import logger from '../common/logger';

const traceMQuery = (method, info, query) => {
  return (err, result, millis) => {
    const infos = [];
    infos.push(`${query._collection.collection.name}.${method}`);
    infos.push(JSON.stringify(info));
    infos.push(`${millis} ms`);
    logger.debug('MONGO', infos.join(' '));
  };
};

mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery);
