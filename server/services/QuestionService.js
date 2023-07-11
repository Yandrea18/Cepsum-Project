const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const csvFilePath = path.join(__dirname, "../preguntas.csv");

let questions = {};

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const { id, message, oui, non } = row;
    questions[id] = {
      id: parseInt(id),
      message,
      oui: parseInt(oui),
      non: parseInt(non),
    };
  })
  .on("end", () => {
    console.log("Archivo CSV leído correctamente");
  });

const fetchQuestion = function (req, res) {
  console.log(req.body.id);
  const id = req.body.id;
  let response = {};

  if (questions.hasOwnProperty(id)) {
    response = questions[id];
  } else {
    response = {
      id: -1,
      message: "id no encontradooooo",
    };
    console.log("id no encontrado");
  }

  res.json(response);
};

const handleOptionClick = (option) => {
  const selectedQuestion = questions[selectedQuestionId];
  let response = null;

  if (option === "oui" && selectedQuestion.oui) {
    response = selectedQuestion.oui;
  } else if (option === "non" && selectedQuestion.non) {
    response = selectedQuestion.non;
  }

  console.log("Respuesta seleccionada:", response);

 
  if (response) {
    setSelectedQuestionId(response);
  } else {
    setSelectedQuestionId(null);
  }
};

export { fetchQuestion, handleOptionClick };
