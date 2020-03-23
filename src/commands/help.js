module.exports = {
  name: 'help',
  description: 'Used to list all available commands',
  execute(req, res) {
    return res.send({ text: "Here's all available commands you can use: \n\n*help*: list all commands\n*buildST*: start building process of static-ticket on QA, *must* specify one branch." });
  },
};
