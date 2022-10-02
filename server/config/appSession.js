function setAppSessionRedis(app) {
  const session = require('express-session');
  const redis = require('redis');
  const client = redis.createClient({
    legacyMode: true,
  });
  client
    .connect()
    .then(() => {
      console.log('Connected to Redis');
    })
    .catch((e) => {
      console.error(e);
      throw new Error('can not connect to the Redis');
    });
  const RedisStore = require('connect-redis')(session);

  app.use(
    session({
      store: new RedisStore({ host: 'localhost', port: 6379, client, ttl: 300 }),
      secret: 'keyboard cat',
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 86400000, // 1 dia
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );
}

module.exports = { setAppSessionRedis };
