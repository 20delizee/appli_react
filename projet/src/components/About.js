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

  return (
    <div>
      <h1>Données</h1>
      {data.map(item => (
      <ul>  
        <li key={item.id}>{item.names}</li>
      </ul>
      ))}
    </div>
  );
}

export default App;