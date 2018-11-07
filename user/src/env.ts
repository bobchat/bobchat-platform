
  export const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'localhost';
  export const MONGO_DB_PORT = process.env.MONGO_DB_PORT || '27017';
  export const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

  console.log(NATS_URL);
