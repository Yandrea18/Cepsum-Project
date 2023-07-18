import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const EmailSender = ({ currentQuestion, questionHistory, onSendEmail }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ccEmails, setCCEmails] = useState([]);
  const [message, setMessage] = useState("");
  const defaultEmail = "emily.caceres@umontreal.ca";
  const emailOptions = [
    "example1@example.com",
    "example2@example.com",
    "example3@example.com",
    "example4@example.com",
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectCC = (event) => {
    const selectedEmails = event.target.value;
    setCCEmails(selectedEmails);
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

    const recipientEmail = defaultEmail;
    const ccEmailList = ccEmails.join(", ");
    const emailContent = `Destinataire: ${recipientEmail}\nCopie: ${ccEmailList}\n\n${fullMessage}`;

    setName("");
    setCCEmails([]);
    setMessage("");
    setOpen(false);

    onSendEmail(emailContent);

    alert("Message du courrier électronique :\n\n" + emailContent);
    console.log(emailContent);
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
              label="Destinataire"
              value={defaultEmail}
              disabled
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Copie</InputLabel>
              <Select multiple value={ccEmails} onChange={handleSelectCC}>
                {emailOptions.map((emailOption) => (
                  <MenuItem key={emailOption} value={emailOption}>
                    {emailOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <Button onClick={handleClose}>Annuler</Button>
              <Button type="submit" variant="contained" color="primary">
                Envoyer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailSender;
