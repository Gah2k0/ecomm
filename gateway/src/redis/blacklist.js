import redis from 'redis';

const blacklist = redis.createClient({
  prefix: 'blacklist:',
  host: 'redis'
});

blacklist.on('connect', () => {
  console.log('Redis client connected');
});
blacklist.on('error', (error) => {
  console.log('Redis not connected', error);
});

export default blacklist;
