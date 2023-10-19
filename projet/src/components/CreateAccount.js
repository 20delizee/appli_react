import React, { useState } from 'react';
import '../Style.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [group, setGroup] = useState('');
  const [role, setRole] = useState('');
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        email: email,
        password: password,
        lastname: lastname,
        firstname: firstname,
        group: group,
        role: role
    };

    fetch('http://localhost:3000/api/auth/signup', {
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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };  
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };  
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };  
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div className="App">
      <p className="Coucou">COUCOU CONTACT</p>
      <form onSubmit={handleSubmit}>
        <label>
            Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br/><br/>
        <label>
          password:
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <br/><br/>
        <label>
          lastname:
          <input type="text" value={lastname} onChange={handleLastnameChange} />
        </label>
        <br/><br/>
        <label>
          firstname:
          <input type="text" value={firstname} onChange={handleFirstnameChange} />
        </label>
        <br/><br/>
        <label>
          role:
          <input type="text" value={role} onChange={handleRoleChange} />
        </label>
        <br/><br/>
        <label>
          group:
          <input type="text" value={group} onChange={handleGroupChange} />
        </label>
        <br/><br/>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;