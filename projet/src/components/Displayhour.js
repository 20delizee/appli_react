import React, { useEffect, useState } from 'react';
import moment from 'moment';

function App() {
  const [messages, setMessages] = useState([]);
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);

  useEffect(() => {
    // Fonction pour récupérer les messages depuis l'API
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/message/email/${storedEmail}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        setMessages(data.reverse()); // Inverser l'ordre des messages pour les afficher en bas
      } catch (error) {
        console.error(error);
      }
    };

    // Appeler la fonction de récupération des messages au chargement de la page
    fetchMessages();
  }, [storedEmail, storedToken]);

  return (
    <div>
      <p className="Coucou">COUCOU CONTACT</p>
      <h2>Liste des messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <p>Date: {moment(message.date).format('YYYY-MM-DD')} {message.time}</p>
            <p>Contenu: {message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;