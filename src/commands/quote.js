const axios = require('axios').default;

module.exports = {
  name: 'quote',
  description: 'receive a single random quote',
  execute(req, res) {
    axios.get('https://api.quotable.io/random')
      .then(({ data }) => {
        res.send({
          cards: [{
            header: {
              title: '1001 Jenkins',
              subtitle: 'Your quote',
              imageUrl: 'https://lh3.googleusercontent.com/proxy/fI_xSzgrxu6Ckw7OSHbutybNupGcnX2tyqnoVG3qZSmDDQcPDJ2YvVwuj5ZM3wi7hzb-CArqASXsre6Mdiv9GsndmYi7CuWeAQdko5VhjreSlxBVqW5qur6F9Q=s88-c-mo',
              imageStyle: 'IMAGE',
            },
            sections: [{
              widgets: [{
                textParagraph: {
                  text: `<i>${data.content}</i><br /><br />- ${data.author}`,
                },
              }],
            }],
          }],
        });
      });
  },
};
