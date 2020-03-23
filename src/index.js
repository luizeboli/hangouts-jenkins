const express = require('express');
const bodyParser = require('body-parser');
const commands = require('./commands');

const PORT = process.env.PORT || 3000;
const app = express();
const botCommands = new Map();

Object.keys(commands).map((key) => {
  botCommands.set(commands[key].name, commands[key]);
});

app.use(bodyParser.json());

app.post('/jenkins', (req, res) => {
  console.log(req.body);
  const { space, type, message } = req.body || {};

  const args = message.text.split(/ +/);
  const command = args.shift().toLowerCase();

  if (type === 'ADDED_TO_SPACE' && space.type === 'ROOM') {
    res.send({ text: `Thanks for adding me to ${space.displayName}` });
  }

  if (type === 'MESSAGE') {
    // res.send({ text: `Your message was: ${message.text}`})

    if (!botCommands.has(command)) res.send({ text: 'Sorry, I didnt recognize this command' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
