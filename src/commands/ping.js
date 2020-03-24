module.exports = {
  name: 'ping',
  description: 'ping pong party',
  execute(req, res) {
    return res.send({ text: 'Pong!' });
  },
};
