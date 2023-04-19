const JWT = require('jsonwebtoken');
require('dotenv').config();

const nodeMailerToken = ({ name, redirectUrl }) => {
  return new Promise((resolve, reject) => {
    const payload = {
      name,
      redirectUrl,
    };
    const nodeMailerKey = process.env.NODEMAILER_SECRET_KEY;
    JWT.sign(
      payload,
      nodeMailerKey,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

const accessToken = ({ name, role, email }) => {
  return new Promise((resolve, reject) => {
    const payload = {
      role,
      email,
    };
    const accessTokenKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    JWT.sign(payload, accessTokenKey, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = {
  nodeMailerToken,
  accessToken,
};
