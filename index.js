const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", handleIndexRequest);

app.listen(port, () => {
  console.log(`Express app listening on http://localhost:${port}`);
});

function handleIndexRequest(req, res) {
  const code = req.query.code;

  function getCryptos(code) {
    return fetch("https://api.nexchange.io/en/api/v1/currency/")
      .then((cryptoData) => cryptoData.json())
      .then((cryptoData) => {
        return cryptoData.filter((crypto) => crypto.code == code);
      })
      .catch((err) => console.log(err));
  }

  getCryptos(code)
    .then((cryptoData) => {
      res.render("home", { cryptoData: cryptoData });
    })
    .catch((err) => console.error(err));
}

app.set("view engine", "ejs");
