import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Collapse,
  Button
} from "@mui/material";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import "./App.css";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleNavigation = (questionId) => {
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
                Pregunta {questionId}
              </Link>
            ))}
          </Breadcrumbs>
          <Typography variant="h6">Question {currentQuestion.id}</Typography>
          <Typography variant="body1">{currentQuestion.message}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigation(currentQuestion.oui)}
          >
            Oui
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleNavigation(currentQuestion.non)}
          >
            Non
          </Button>
        </Paper>
      ) : (
        <Typography variant="body1">Aucune question sélectionnée</Typography>
      )}
    </div>
  );
};

export default App;
