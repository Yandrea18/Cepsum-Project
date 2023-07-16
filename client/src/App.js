import { ArrowBack, Email } from '@mui/icons-material';
import { Breadcrumbs, Button, CircularProgress, Collapse, Link, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

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
      })
      .catch((error) => {
        //TODO gestin d'erreur
        console.log('Erreur lors de la récupération de la question :', error);
      })
      .finally(() => setLoading(false));
  }, [selectedQuestion]);

  const fetchQuestion = async (params) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/questions`, params);
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
    setSelectedQuestion(questionId);
  };

  const handleGoBack = (currentIndex) => {
    if (questionHistory.length > 0) {
      setQuestionHistory(questionHistory.slice(0, currentIndex));
      setSelectedQuestion(questionHistory[currentIndex].id);
    }
  };

  const handleSendEmail = () => {
    //TODO envoyer couriel
    console.log('Enviar correo');
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
              onClick={() => handleGoBack(questionHistory.length - 1)}
              style={{ cursor: 'pointer' }}
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
                onClick={() => handleGoBack(index)}
                style={{ cursor: 'pointer' }}
              >
                <span className="blue-title">{questionHistory[index].titre}</span>
              </Link>
            ))}
          </Breadcrumbs>
          <hr />
          <Typography variant="h5" style={{ color: '#0077b6', fontWeight: 'bold' }}>
            {currentQuestion.titre}
          </Typography>
          <Typography variant="body1">{currentQuestion.message}</Typography>
          {currentQuestion.image && <img src={`/images/${currentQuestion.image}`} alt="img" />}
          {currentQuestion.titre !== 'Solution' && (
            <div className="button-container">
              <Button variant="contained" color="primary" onClick={() => handleNavigation(currentQuestion.oui, 'oui')}>
                Oui
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavigation(currentQuestion.non, 'non')}
              >
                Non
              </Button>
            </div>
          )}
          {currentQuestion.message.includes('Envoi courriel') && (
            <Button variant="contained" color="primary" onClick={handleSendEmail} startIcon={<Email />}>
              Envoi courriel
            </Button>
          )}
          {currentQuestion.titre === 'Solution' && (
            <>
              <Typography variant="h6" style={{ color: '#0077b6', fontWeight: 'bold' }}>
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

export default App;
