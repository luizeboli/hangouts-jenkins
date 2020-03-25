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
        console.log('Error when creating Hangouts JWT');
        reject(err);
      } else {
        resolve(tokens.access_token);
      }
    });
  }));
}

exports.postMessage = async (options) => {
  try {
    const token = await getJWT(ce, pk);

    const newOpt = options;
    newOpt.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    await axios('https://chat.googleapis.com/v1/spaces/AAAARgyH7eU/messages', { method: 'POST', ...newOpt });
  } catch (error) {
    console.error('Error when trying to send a message', error);
  }
};
