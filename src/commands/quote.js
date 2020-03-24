const axios = require('axios').default;

module.exports = {
  name: 'quote',
  description: 'receive a single random quote',
  execute(req, res) {
    axios.get('https://api.quotable.io/random')
      .then(({ data }) => res.send({ text: `_"${data.content}"_\n - ${data.author}.` }));
  },
};
