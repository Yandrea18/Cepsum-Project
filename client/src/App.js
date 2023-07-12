import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//   },
//   question: {
//     marginBottom: theme.spacing(2),
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const App = () => {
  // const classes = useStyles();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion({ id: 2 })
      .then((data) => {
        setSelectedQuestion(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log('Error al obtener la pregunta:', error);
      });
  }, []);

  const fetchQuestion = async (params) => {
    try {
      const response = await axios.post('http://localhost:8000/questions', params);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleOptionClick = async (option) => {
    try {
      const response = await fetchQuestion({ id: option });
      setSelectedQuestion(response);
      console.log('Respuesta seleccionada:', response);
    } catch (error) {
      console.log('Error al obtener la pregunta:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : selectedQuestion ? (
        <Paper>
          <Typography variant="h6">Pregunta {selectedQuestion.id}</Typography>
          <Typography variant="body1">{selectedQuestion.message}</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOptionClick(selectedQuestion.oui)}>
            Oui
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleOptionClick(selectedQuestion.non)}>
            Non
          </Button>
        </Paper>
      ) : (
        <Typography variant="body1">No hay pregunta seleccionada</Typography>
      )}
    </div>
  );
};

export default App;
