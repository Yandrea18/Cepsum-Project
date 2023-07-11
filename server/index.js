const express = require("express");
const routes = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 8000;
var cors = require("cors");

app.use(cors());

app.use(express.json());
routes(app);

app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto " + PORT);
});

module.exports = app;
