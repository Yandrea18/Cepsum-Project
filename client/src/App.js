import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Collapse,
  Button,
} from "@mui/material";
import axios from "axios";
import { ArrowBack, Email } from "@mui/icons-material";
import "./App.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchQuestion({ id: selectedQuestion })
      .then((data) => {
        setCurrentQuestion(data);
        console.log("Question obtenue :", data);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération de la question :", error);
      })
      .finally(() => setLoading(false));
  }, [selectedQuestion]);

  const fetchQuestion = async (params) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/questions",
        params
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleNavigation = (questionId, answer) => {
    const answeredQuestion = {
      questionTitre: currentQuestion.titre,
      questionMessage: currentQuestion.message,
      answer: answer,
    };
    setAnsweredQuestions([...answeredQuestions, answeredQuestion]);
    setQuestionHistory([...questionHistory, selectedQuestion]);
    setSelectedQuestion(questionId);
  };

  const handleGoBack = () => {
    if (questionHistory.length > 0) {
      const previousQuestion = questionHistory.pop();
      setQuestionHistory([...questionHistory]);
      setSelectedQuestion(previousQuestion);
    }
  };

  const handleSendEmail = () => {
    console.log("Enviar correo");
  };

  return (
    <div className="container">
      {loading ? (
        <CircularProgress />
      ) : currentQuestion ? (
        <Paper className="paper">
          <Collapse in={questionHistory.length > 0}>
            <Link
              underline="hover"
              color="inherit"
              onClick={handleGoBack}
              style={{ cursor: "pointer" }}
            >
              <ArrowBack />
            </Link>
          </Collapse>
          <Breadcrumbs maxItems={2}>
            {questionHistory.map((questionId, index) => (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                onClick={() => setSelectedQuestion(questionId)}
              >
                <span className="blue-title">
                  {answeredQuestions[index].questionTitre}
                </span>
              </Link>
            ))}
          </Breadcrumbs>
          <Typography
            variant="h5"
            style={{ color: "#0077b6", fontWeight: "bold" }}
          >
            {currentQuestion.titre}
          </Typography>
          <Typography variant="body1">{currentQuestion.message}</Typography>
          {currentQuestion.titre !== "Solution" && (
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation(currentQuestion.oui, "oui")}
              >
                Oui
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavigation(currentQuestion.non, "non")}
              >
                Non
              </Button>
            </div>
          )}
          {currentQuestion.message.includes("Envoi courriel") && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
              startIcon={<Email />}
            >
              Envoi courriel
            </Button>
          )}
          {currentQuestion.titre === "Solution" && (
            <>
              <Typography
                variant="h6"
                style={{ color: "#0077b6", fontWeight: "bold" }}
              >
                Questions Répondues:
              </Typography>
              {answeredQuestions.map((answeredQuestion, index) => (
                <Typography  key={index} variant="body2">
                  {answeredQuestion.questionMessage}: {answeredQuestion.answer}
                </Typography>
              ))}
            </>
          )}
        </Paper>
      ) : (
        <Typography variant="body1">Aucune question sélectionnée</Typography>
      )}
    </div>
  );
};

export default App;
