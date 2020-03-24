/*
  This command is outside of index.js because circular dependency.
  This way we can dynamically list commands
*/

const commands = require('./index');

module.exports = {
  name: 'help',
  description: 'Used to list all available commands',
  execute(req, res) {
    const help = ["Here's all available commands you can use 👇: \n", '*help*: list all commands'];
    Object.values(commands).forEach((cmd) => help.push(`*${cmd.name}*: ${cmd.description}`));

    return res.send({ text: help.join('\n') });
  },
};
