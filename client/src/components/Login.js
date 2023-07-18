import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  //function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/images/LogoCepsum.jpg" alt="Logo" className="logoC" />
        <h1 className="h2">Connexion</h1>
        <div className="line"></div>

        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Identifiant utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Afficher le mot de passe
          </label>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Maintenir la connexion</label>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Connexion
        </button>
      </div>
    </div>
  );
};

export default Login;
