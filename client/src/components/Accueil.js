import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import "./Accueil.css";

const Accueil = ({ onDiagnostic }) => {
  return (
    <div>
      <h1
        style={{
          fontFamily: "Prohibition",
          color: "white",
          textAlign: "center",
        }}
      >
        Application de diagnostic
      </h1>
      <div className="accueil-container">
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <Paper
              elevation={3}
              className="accueil-paper"
              onClick={() => onDiagnostic()}
            >
              <img
                src="/images/tourniquets.png"
                alt="Problèmes d'accès"
                className="accueil-image"
              />
              <Typography variant="h6">Problèmes d'accès</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper elevation={3} className="accueil-paper">
              <img
                src="/images/logiciel.png"
                alt="Accessibilité"
                className="accueil-image"
              />
              <Typography variant="h6">
                Accessibilité et/ou erreurs de fonctionnement du logiciel
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper elevation={3} className="accueil-paper">
              <img
                src="/images/boutons1.png"
                alt="Boutons de portes"
                className="accueil-image"
              />
              <Typography variant="h6">
                Fonctionnement des boutons d'ouverture des portes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper elevation={3} className="accueil-paper">
              <img
                src="/images/autotest.png"
                alt="Autodiagnostic"
                className="accueil-image"
              />
              <Typography variant="h6">Outil d'auto-diagnostic</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Accueil;
