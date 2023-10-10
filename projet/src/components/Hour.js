import React, { useState, useEffect } from 'react';
import '../Style.css';
import Displayhour from './Displayhour';
import io from 'socket.io-client';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  const socket = io('http://localhost:3000');
  console.log(storedEmail, storedToken);
  useEffect(() => {
    // Écouter les événements 'chat:message' pour recevoir les messages du serveur
    socket.on('chat:message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      message: message,
      email: storedEmail,
    };
  
    // Envoyer le message au serveur via Socket.IO
    socket.emit('chat:message', data);
  
    // Envoyer le message à l'API pour l'enregistrer dans la base de données
    fetch('http://localhost:3000/api/message/create', {
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
    setMessage('');
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="App">
      <p className="Coucou">COUCOU CONTACT</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={message} onChange={handleMessageChange} />
        </label>
        <button type="submit">Envoyer</button>
        <Displayhour />
      </form>

      <h2>Liste des messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>Date: {message.date} {message.time}</p>
            <p>Contenu: {message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;