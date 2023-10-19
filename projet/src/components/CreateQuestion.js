import React, { useState } from 'react';
import '../Style.css';

function App() {

  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log('Is authenticated:', isAuthenticated);
  console.log(storedEmail, storedToken);
  const [questionName, setQuestionName] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const [questionPoint, setQuestionPoint] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
        questionName: questionName,
        questionContent: questionContent,
        questionCategory: questionCategory,
        questionPoint: questionPoint,
        questionAnswer: questionAnswer
    };
    // Envoyer le message à l'API pour l'enregistrer dans la base de données
    fetch('http://localhost:3000/api/question/create', {
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

  const handleQuestionNameChange = (event) => {
    setQuestionName(event.target.value);
  };
  const handleQuestionContentChange = (event) => {
    setQuestionContent(event.target.value);
  };
  const handleQuestionCategoryChange = (event) => {
    setQuestionCategory(event.target.value);
  };
  const handleQuestionPointChange = (event) => {
    setQuestionPoint(event.target.value);
  };
  const handleQuestionAnswerChange = (event) => {
    setQuestionAnswer(event.target.value);
  };

  return (
    <div className="App">
      <p className="Coucou">COUCOU CONTACT</p>
      <form onSubmit={handleSubmit}>
        <label>
        questionName:
          <input type="text" value={questionName} onChange={handleQuestionNameChange} />
          questionContent:
          <input type="text" value={questionContent} onChange={handleQuestionContentChange} />
          questionCategory:
          <input type="text" value={questionCategory} onChange={handleQuestionCategoryChange} />
          questionPoint:
          <input type="text" value={questionPoint} onChange={handleQuestionPointChange} />
          questionAnswer:
          <input type="text" value={questionAnswer} onChange={handleQuestionAnswerChange} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  
  );
}
export default App;