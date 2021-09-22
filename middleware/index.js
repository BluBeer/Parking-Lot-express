/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
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

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

const isLogIn = (req, res, next) => {
  if (req.user) next();
  else {
    req.session.returnTo = req.originalUrl;
    res.redirect('/google');
  }
};

module.exports = {
  checkData, auth, isLogIn,
};
