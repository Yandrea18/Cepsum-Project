import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HomeIcon from "@mui/icons-material/Home";
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Collapse,
  Icon,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Diagnostic.css";
import EmailSender from "../components/EmailSender";

const Diagnostic = ({ onDiagnostic }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEmailForm, setOpenEmailForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQuestion({ id: selectedQuestion })
      .then((data) => {
        setCurrentQuestion(data);
      })
      .catch((error) => {
        //TODO gestin d'erreur
        console.log("Erreur lors de la récupération de la question :", error);
      })
      .finally(() => setLoading(false));
  }, [selectedQuestion]);

  const fetchQuestion = async (params) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        params
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleNavigation = (questionId, answer) => {
    const question = {
      id: selectedQuestion,
      titre: currentQuestion.titre,
      message: currentQuestion.message,
      answer: answer,
    };
    setQuestionHistory([...questionHistory, question]);
    console.log(questionHistory);
    setSelectedQuestion(questionId);
  };

  const handleGoBack = (currentIndex) => {
    if (questionHistory.length > 0) {
      setQuestionHistory(questionHistory.slice(0, currentIndex));
      setSelectedQuestion(questionHistory[currentIndex].id);
    }
  };

  const handleSendEmail = () => {
    setOpenEmailForm(true);
    console.log("Enviar correo");
    //Valider que le courriel est bien envoye
    onDiagnostic();
  };

  return (
    <div className="container">
      {loading ? (
        <CircularProgress />
      ) : currentQuestion ? (
        <Paper className="paper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <div className="logo-container">
              <img src="/images/LogoCepsum.jpg" alt="Logo" className="logo" />
            </div>
            <div style={{ alignSelf: "center" }}>
              <HomeIcon
                fontSize="large"
                style={{ color: "#0060AC", cursor: "pointer" }}
                onClick={onDiagnostic}
              />
            </div>
          </div>

          <Collapse in={questionHistory.length > 0}>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => handleGoBack(questionHistory.length - 1)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <ArrowCircleLeftIcon
                  fontSize="large"
                  style={{ color: "gray" }}
                />
              </div>
            </Link>
          </Collapse>
          <Breadcrumbs className="breadcrumbs" maxItems={2}>
            {questionHistory.map((questionId, index) => (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                onClick={() => handleGoBack(index)}
                style={{ cursor: "pointer" }}
              >
                <span className="blue-title">
                  {questionHistory[index].titre}
                </span>
              </Link>
            ))}
          </Breadcrumbs>
          <hr />
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              backgroundColor: "#0f192c",
              padding: "10px",
              color: "#ffffff",
              fontFamily: "Prohibition",
            }}
          >
            {currentQuestion.titre}
          </Typography>
          <Typography
            variant="body1"
            style={{
              padding: "30px",
            }}
          >
            {currentQuestion.message}
          </Typography>
          {currentQuestion.image && (
            <img
              src={`/images/${currentQuestion.image}`}
              alt="img"
              className="question-image"
            />
          )}
          {currentQuestion.titre !== "Diagnostic" && (
            <div className="button-container">
              <button
                className="custom-button"
                onClick={() => handleNavigation(currentQuestion.oui, "oui")}
              >
                Oui
              </button>
              <button
                className="custom-button"
                onClick={() => handleNavigation(currentQuestion.non, "non")}
              >
                Non
              </button>
            </div>
          )}
          {currentQuestion.message.includes("Envoi courriel") && (
            <EmailSender
              currentQuestion={currentQuestion}
              questionHistory={questionHistory}
              onSendEmail={handleSendEmail}
            />
          )}
          {currentQuestion.titre === "Diagnostic" && (
            <>
              <Typography
                variant="h6"
                style={{ color: "#0077b6", fontWeight: "bold" }}
              >
                Questions Répondues:
              </Typography>
              {questionHistory.map((answeredQuestion, index) => (
                <Typography key={index} variant="body2">
                  {answeredQuestion.message}: {answeredQuestion.answer}
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

export default Diagnostic;
