import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Diagnostic from "../components/Diagnostic";
import Accueil from "../components/Accueil";

function App() {
  const [estConnecte, setEstConnecte] = useState(false);
  const [estDiagnostic, setEstDiagnostic] = useState(false);

  const handleLogin = () => {
    setEstConnecte(true);
  };

  useEffect(() => {
    console.log("Estado de conexión:", estConnecte);
  }, [estConnecte]);

  return (
    <div>
      {!estConnecte && <Login onLogin={handleLogin} />}
      {estConnecte && !estDiagnostic && (
        <Accueil onDiagnostic={() => setEstDiagnostic(true)} />
      )}
      {estConnecte && estDiagnostic && (
        <Diagnostic onDiagnostic={() => setEstDiagnostic(false)} />
      )}
    </div>
  );
}
export default App;
