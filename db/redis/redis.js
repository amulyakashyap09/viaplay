const config = require('config');
const Redis = require('ioredis');

const { prefix } = config.redis;
const TTL = 24 * 3600;

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

module.exports = {
  setInCache: async (key, payload, ttl = TTL) => {
    redis.set(prefix + key, JSON.stringify(payload), 'EX', ttl);
  },
  getFromCache: async (key) => JSON.parse(await redis.get(prefix + key)),
};
