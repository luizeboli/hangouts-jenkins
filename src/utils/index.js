const { google } = require('googleapis');
const axios = require('axios').default;

const ce = process.env.CLIENT_EMAIL;
const pk = process.env.PRIV_KEY.replace(/\\n/gm, '\n');

function getJWT() {
  return new Promise(((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      ce,
      null,
      pk, ['https://www.googleapis.com/auth/chat.bot'],
    );

    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log('Error create JWT hangoutchat');
        reject(err);
      } else {
        resolve(tokens.access_token);
      }
    });
  }));
}

exports.postMessage = (options) => new Promise(((resolve, reject) => {
  getJWT(ce, pk).then((token) => {
    const newOpt = options;
    newOpt.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios(newOpt).then((res) => console.log(res));
  }).catch((err) => {
    reject(err);
  });
}));
