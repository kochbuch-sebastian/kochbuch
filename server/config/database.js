const keys = process.env;

module.exports = {
  database: keys.MONGO_URI,
  secret: 'nosecret',
};
