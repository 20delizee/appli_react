import React, { useState } from 'react';
import '../Style.css';

function App() {

  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log('Is authenticated:', isAuthenticated);
  console.log(storedEmail, storedToken);
  const [names, setNames] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
        names: names,
    };
    // Envoyer le message à l'API pour l'enregistrer dans la base de données
    fetch('http://localhost:3000/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Réponse du serveur :', result);
        // Faire quelque chose avec la réponse du serveur
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        // Gérer l'erreur
      });
  
    // Réinitialiser le champ de message
  };

  const handleNamesChange = (event) => {
    setNames(event.target.value);
  };

  return (
    <div className="App">
      <p className="Coucou">COUCOU CONTACT</p>
      <form onSubmit={handleSubmit}>
        <label>
        category:
          <input type="text" value={names} onChange={handleNamesChange} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  
  );
}

export default App;