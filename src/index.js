const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post("/jenkins", (req, res) => {
  const { space, type, message } = req.body || {};
  
  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
    res.send({ text: `Thanks for adding me to ${space.displayName}` });
  }

  if (type === "MESSAGE") {
    res.send({ text: `Your message was: ${message.text}`})
  }
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});