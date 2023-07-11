let pjson = require("../package.json");

exports.getHealth = function (req, res) {
  const date = new Date();
  const response = {
    app_name: pjson.name,
    version: pjson.version,
    date: date.toLocaleDateString() + " " + date.toLocaleTimeString("fr-CA"),
  };
  res.json(response);
};
