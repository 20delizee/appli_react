import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  console.log(storedEmail);
  console.log(storedToken);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/api/category')
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
        // Gérer l'erreur
      });
  };

  const deleteData = _id => {
    fetch(`http://localhost:3000/api/category/delete/${_id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // La suppression a réussi, mettre à jour les données
          fetchData();
        } else {
          // La suppression a échoué, gérer l'erreur
          console.error('Erreur lors de la suppression de la donnée');
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
            {item.names}{item._id}
            <button onClick={() => deleteData(item._id)}>{item._id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;