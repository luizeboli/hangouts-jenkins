module.exports = {
  name: 'help',
  description: 'Used to list all available commands',
  execute(req, res) {
    return res.send({ text: "Here's all available commands you can use: \n Teste de quebra de linha" });
  },
};
