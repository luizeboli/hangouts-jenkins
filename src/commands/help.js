module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(req, res) {
    return res.send({ text: "Here's all available commands you can use: \n Teste de quebra de linha" });
  },
};
