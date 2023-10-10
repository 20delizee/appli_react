import React, { useState } from 'react';
import '../Style.css';

function App() {
  const [names, setNames] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      names: names,
    };

    fetch('http://localhost:3000/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
  };

  const handleNameChange = (event) => {
    setNames(event.target.value);
  };


  return (
    <div className="App">
      <p className="Coucou">COUCOU CONTACT</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={names} onChange={handleNameChange} />
        </label>
       
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;