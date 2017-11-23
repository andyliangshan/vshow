import config from '../config/system';
import Redis from 'ioredis';

const client = new Redis(config.redis);

client.on('error', (err) => {
  if (err) {
    console.log('connect to redis error, please check redis config', err);
    process.exit(1);
  }
});

export default client;
