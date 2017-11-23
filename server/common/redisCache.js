/* eslint no-param-reassign:0 */

import redis from './redis';
import logger from './logger';

class RedisCache {

  /**
   * get value by key
   * @param key string
   * @returns {*} value | null
   */
  static async get(key) {
    key = 'pc|liuxue|' + key;
    const time = new Date();
    let bkData;
    try {
      bkData = await redis.get(key);
      const duration = (new Date() - time);
      logger.debug('redis cache get *  ' + key + '  *' + duration + 'ms');
      return JSON.parse(bkData);
    } catch (error) {
      console.log(error);
      logger.fatal(error);
      return null;
    }
  }

  /**
   * set key-value or add time
   * @param key
   * @param value
   * @param time cache time
   * @returns {*} ok | ''
   */
  static async set(key, value, time) {
    key = 'pc|liuxue|' + key;
    const t = new Date();
    value = JSON.stringify(value);
    let bkSet;
    try {
      if (!time) {
        bkSet = await redis.set(key, value);
      } else {
        bkSet = await redis.setex(key, time, value);
      }
      const duration = (new Date() - t);
      logger.debug('redis cache set *  ' + key + '  *' + duration + 'ms');
      return bkSet;
    } catch (error) {
      console.log(error);
      logger.fatal(error);
      return '';
    }
  }
}

export default RedisCache;
