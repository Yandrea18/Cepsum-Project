import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchQuestion({ id: selectedQuestion })
      .then((data) => {
        setCurrentQuestion(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error al obtener la pregunta:", error);
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

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : currentQuestion ? (
        <Paper>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Catalog
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Accessories
            </Link>
            <Link underline="hover" color="inherit" href="#">
              New Collection
            </Link>
            <Typography color="text.primary">Belts</Typography>
          </Breadcrumbs>
          <Typography variant="h6">Pregunta {currentQuestion.id}</Typography>
          <Typography variant="body1">{currentQuestion.message}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedQuestion(currentQuestion.oui)}
          >
            Oui
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSelectedQuestion(currentQuestion.non)}
          >
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
