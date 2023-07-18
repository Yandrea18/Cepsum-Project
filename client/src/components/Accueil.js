import React from "react";
import { Grid, Typography } from "@mui/material";
import "./Accueil.css";

const Accueil = ({ onDiagnostic, onBoutons, onLogiciel }) => {
  // Fonction pour afficher une alerte lorsqu'un élément est en construction
  const onConstruction = () => {
    alert("Le site est actuellement en construction.");
  };

  return (
    <div>
      <h1 className="h1">Application de diagnostic</h1>
      <div className="accueil-container">
        <Grid container spacing={3}>
          {/* Composant pour les problèmes d'accès */}
          <Grid item xs={6} sm={6}>
            <div className="accueil-custom-component" onClick={onDiagnostic}>
              <img
                src="/images/tourniquets.png"
                alt="Problèmes d'accès"
                className="accueil-image"
              />
              <Typography variant="h6">Problèmes d'accès</Typography>
            </div>
          </Grid>
          {/* Composant pour l'accessibilité et les erreurs de fonctionnement du logiciel */}
          <Grid item xs={6} sm={6}>
            <div className="accueil-custom-component" onClick={onLogiciel}>
              <img
                src="/images/logiciel.png"
                alt="Accessibilité"
                className="accueil-image"
              />
              <Typography variant="h6">
                Accessibilité et/ou erreurs de fonctionnement du logiciel
              </Typography>
            </div>
          </Grid>
          {/* Composant pour le fonctionnement des boutons d'ouverture des portes */}
          <Grid item xs={6} sm={6}>
            <div className="accueil-custom-component" onClick={onBoutons}>
              <img
                src="/images/boutons1.png"
                alt="Boutons de portes"
                className="accueil-image"
              />
              <Typography variant="h6">
                Fonctionnement des boutons d'ouverture des portes
              </Typography>
            </div>
          </Grid>
          {/* Composant pour l'outil d'auto-diagnostic */}
          <Grid item xs={6} sm={6}>
            <div className="accueil-custom-component" onClick={onConstruction}>
              <img
                src="/images/autotest.png"
                alt="Autodiagnostic"
                className="accueil-image"
              />
              <Typography variant="h6">Outil d'auto-diagnostic</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Accueil;
