require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const commands = require('./commands');
const help = require('./commands/help');

const PORT = process.env.PORT || 3000;
const app = express();
const botCommands = new Map();

Object.keys(commands).map((key) => botCommands.set(commands[key].name, commands[key]));

app.use(bodyParser.json());

app.post('/jenkins', (req, res) => {
  const { space, type, message } = req.body || {};

  if (space.type === 'DM') return res.send({ text: 'Sorry, I am forbidden to answer DM.' });

  if (type === 'ADDED_TO_SPACE' && space.type === 'ROOM') return res.send({ text: `Thanks for adding me to ${space.displayName}` });

  if (type === 'MESSAGE') {
    const command = message.argumentText.split(' ')[1].trim();

    if (command === 'help') {
      return help.execute(req, res);
    }

    if (!botCommands.has(command)) return res.send({ text: 'Sorry, I didnt recognize this command. Say *help* to list all available commands.' });

    try {
      botCommands.get(command).execute(req, res);
    } catch (error) {
      console.error(error);
      res.send({ text: 'There was an error trying to execute your command.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
