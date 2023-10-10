import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer une requête au serveur pour vérifier les informations de connexion
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Connexion réussie, enregistrer le token dans le stockage local ou les cookies
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('email', email);
          console.log(data.token);
          console.log(email);
          console.log('Connexion réussie');
          alert('REUSSI')
        } else {
          // Afficher un message d'erreur
          setErrorMessage(data.msg);
        }
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };

  return (
    <div>
      <h2>Portail de connexion</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default App;