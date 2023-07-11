const express = require("express");

module.exports = function (app) {
  const HealthService = require("../services/HealthService");
  app.get("/health", HealthService.getHealth);

  const QuestionService = require("../services/QuestionService");
  app.post("/questions", QuestionService.fetchQuestion);

};
