const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const csvFilePath = path.join(__dirname, "../preguntas.csv");

let questions = {};

// Lire le fichier CSV et remplir l'objet questions avec les données
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const { id, titre, image, message, oui, non } = row;
    questions[id] = {
      id: parseInt(id),
      message,
      titre,
      image,
      oui: parseInt(oui),
      non: parseInt(non),
    };
  })
  .on("end", () => {
    console.log("Fichier CSV lu avec succès");
  });

// Exporter une fonction pour récupérer une question en fonction de son ID
exports.fetchQuestion = function (req, res) {
  console.log(req.body.id);
  const id = req.body.id;
  let response = {};

  if (questions.hasOwnProperty(id)) {
    response = questions[id];
  } else {
    response = {
      id: -1,
      message: "ID non trouvé",
    };
    console.log("ID non trouvé");
  }

  res.json(response);
};
