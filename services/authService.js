const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateToken(username) {
  return jwt.sign({ sub: username }, process.env.TOKEN_SECRET, { expiresIn: '10h' });
}

module.exports = {
  generateToken,
};
