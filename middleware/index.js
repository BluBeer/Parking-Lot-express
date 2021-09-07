const { redisClient } = require('../database');

function checkData(key) {
  return async (req, res, next) => {
    await redisClient.get(key, (err, data) => {
      if (err) throw err;
      if (data != null) res.status(200).send(data);
      else next();
    });
  };
}

module.exports = {
  checkData,
};
