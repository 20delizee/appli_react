import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../Message.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState([]);  
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  useEffect(() => {
    // Fonction pour récupérer les utilisateurs depuis l'API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Appeler la fonction de récupération des utilisateurs lors du chargement du composant
    fetchUsers();
  }, [storedToken]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (selectedUser) {
          const response = await fetch(`http://localhost:3000/api/message/email/${selectedUser}?sender=${storedEmail}`, {
  headers: {
    Authorization: `Bearer ${storedToken}`,
  },
});
          const data = await response.json();
          console.log(data);
          setConversation(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchConversation();
  }, [selectedUser, storedToken, storedEmail]);

  

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setConversation([]); // Réinitialiser la conversation sélectionnée
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifiez que l'utilisateur sélectionné n'est pas null
    if (selectedUser) {
      try {
        const data = {
          email: selectedUser, // Utiliser l'email du destinataire
          receiver: storedEmail, // Utiliser l'email de l'expéditeur
          message: message,
        };

        const response = await fetch('http://localhost:3000/api/message/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Réponse du serveur :', result);

        // Effacez le champ de message après l'envoi
        setMessage('');
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className='container'>

      {/* Afficher la liste des utilisateurs disponibles */}
      <div className='li'>
        <ul className='a'>
          {users.map((user) => (
          <li className='Test' key={user.email} onClick={() => handleUserSelect(user.email)}>
            {user.email}
          </li>
          ))}
        </ul>
      </div>
      {/* Afficher la conversation sélectionnée */}
      <div className='message'>
        {selectedUser && (
          <div>
            <h2>Conversation avec {selectedUser}</h2>
            <ul>
              {conversation.map((message) => (
                <li key={message._id}>
                  <p>Date: {moment(message.date).format('YYYY-MM-DD')} {message.time}</p>
                  <p>Contenu: {message.message}</p>
                  <p>Expéditeur: {message.receiver}</p> 

                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Formulaire pour envoyer un message */}
        {selectedUser && (
          <form onSubmit={handleSubmit}>
            <label>
              Message:
              <input type="text" value={message} onChange={handleMessageChange} />
            </label>
            <button type="submit">Envoyer</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;