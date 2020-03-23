module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(req, res) {
    return res.send({ text: 'Pong!' });
  },
};
