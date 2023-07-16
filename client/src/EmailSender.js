import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const EmailSender = ({ currentQuestion, questionHistory, onSendEmail }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("soportetecnico@ejemplo.com");
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let fullMessage = message;

    if (currentQuestion) {
      fullMessage += `\n\n${currentQuestion.titre}: ${currentQuestion.message}`;
      }

    if (questionHistory.length > 0) {
      fullMessage += "\n\nQuestions Répondues:\n";
      fullMessage += questionHistory
        .map(
          (answeredQuestion) =>
            `${answeredQuestion.message}: ${answeredQuestion.answer}`
        )
        .join("\n");
    }
    const diagnosticQuestion = questionHistory.find(
      (question) => question.titre === "Diagnostic"
    );
    if (diagnosticQuestion) {
      fullMessage += `\n\nDiagnostic:\n${diagnosticQuestion.message}: ${diagnosticQuestion.answer}\n`;
    }

    setName("");
    setEmail("");
    setMessage("");
    setOpen(false);

        onSendEmail(fullMessage);

   alert("Message du courrier électronique :\n\n" + fullMessage);
    console.log(fullMessage);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<EmailIcon />}
      >
        Envoi courriel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Envoi Courriel</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              required
              fullWidth
              rows={4}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailSender;
