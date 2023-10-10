import React, { useEffect, useState } from 'react';

function App() {
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    namesInput: '',
    emailsInput: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/api/category')
      .then(response => response.json())
      .then(result => {
        setData(result);
        // Mettre à jour les valeurs initiales de formData avec la première catégorie
        if (result.length > 0) {
          const firstCategory = result[0];
          setFormData({
            id: firstCategory._id,
            namesInput: firstCategory.names,
            emailsInput: firstCategory.emails
          });
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        // Gérer l'erreur
      });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateData = _id => {
    fetch(`http://localhost:3000/api/category/modify/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        names: formData.namesInput,
        emails: formData.emailsInput
      })
    })
      .then(response => {
        if (response.ok) {
          // La mise à jour a réussi, mettre à jour les données
          fetchData();
        } else {
          // La mise à jour a échoué, gérer l'erreur
          console.error('Erreur lors de la mise à jour de la donnée');
          // Gérer l'erreur
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        // Gérer l'erreur
      });
  };

  return (
    <div>
      <h1>Données</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            {item.names} - {item.emails} - {item._id}
            <input
              type="text"
              name="namesInput"
              value={formData.namesInput}
              onChange={handleChange}
            />
            <input
              type="text"
              name="emailsInput"
              value={formData.emailsInput}
              onChange={handleChange}
            />
            <button onClick={() => updateData(item._id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;