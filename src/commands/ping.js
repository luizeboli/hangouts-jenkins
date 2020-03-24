module.exports = {
  name: 'ping',
  description: 'ping pong!',
  execute(req, res) {
    return res.send({ text: 'Pong!' });
  },
};
