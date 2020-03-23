const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post("/top-secret-bot", (req, res) => {
  const { space, type, message } = req.body || {};

  console.log(req.body)
  
  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
  res.send({ text: `Thanks for adding me to ${space.displayName}` });
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});