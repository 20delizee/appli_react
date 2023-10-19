import React, { useState } from 'react';
import '../Login.css';
import { Link } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log('Is authenticated:', isAuthenticated);
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
          sessionStorage.setItem('isAuthenticated', 'true');
          console.log('Is authenticated:', isAuthenticated);
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
        <div className='login'>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <br /><br/>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          <br /><br/>
          <button type="submit">Se connecter</button>
          <br/><br/>
          <p>Vous n'avez pas de compte ? <Link to="./CreateAccount">Inscrivez vous ici !</Link></p>
        </div>
      </form>
    </div>
  );
}

export default App;