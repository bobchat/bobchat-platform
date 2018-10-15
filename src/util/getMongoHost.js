const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
} = require('./../../env');

module.exports = function getMongoHost(){
return `mongodb://${MONGO_DB_HOST}`;
}