module.exports = {
  MONGO_DB_HOST: process.env.MONGO_DB_HOST || 'localhost',
  MONGO_DB_PORT: process.env.MONGO_DB_PORT || '27017',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  HTTP_PORT: process.env.HTTP_PORT || 8080,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'CHANGE_ME',
};
