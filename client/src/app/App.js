import React, { useState } from "react";
import Login from "../components/Login";
import Diagnostic from "../components/Diagnostic";
import Accueil from "../components/Accueil";
import Boutons from "../components/Boutons";
import Logiciel from "../components/Logiciel";

function App() {
  const [estConnecte, setEstConnecte] = useState(false);
  const [estDiagnostic, setEstDiagnostic] = useState(false);
  const [estBoutons, setEstBoutons] = useState(false);
  const [estLogiciel, setEstLogiciel] = useState(false);
  // Fonction de gestion de la connexion
  const handleLogin = () => {
    setEstConnecte(true);
  };

  return (
    <div>
      {!estConnecte && <Login onLogin={handleLogin} />}
      {estConnecte && !estDiagnostic && !estBoutons && !estLogiciel && (
        <Accueil
          onDiagnostic={() => setEstDiagnostic(true)}
          onBoutons={() => setEstBoutons(true)}
          onLogiciel={() => setEstLogiciel(true)}
        />
      )}
      {estConnecte && estDiagnostic && (
        <Diagnostic onDiagnostic={() => setEstDiagnostic(false)} />
      )}
      {estConnecte && estBoutons && (
        <Boutons onBoutons={() => setEstBoutons(false)} />
      )}
      {estConnecte && estLogiciel && (
        <Logiciel onLogiciel={() => setEstLogiciel(false)} />
      )}
    </div>
  );
}

export default App;
