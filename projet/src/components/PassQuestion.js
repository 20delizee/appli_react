import React, { useEffect, useState } from 'react';

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionsAsked, setQuestionsAsked] = useState(0);
    const [askedQuestionIds, setAskedQuestionIds] = useState([]);

  useEffect(() => {
    // Effectuer la requête pour obtenir les questions depuis votre API avec les champs spécifiques
    fetch('http://localhost:3000/api/question/')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Erreur lors de la requête :', error));
  }, []);

  const getRandomQuestion = () => {
    if (questions.length > 0) {
      if (questionsAsked < 10) {
        const availableQuestions = questions.filter(question => !askedQuestionIds.includes(question._id));
  
        if (availableQuestions.length === 0) {
          setCurrentQuestion("Vous avez posé toutes les questions disponibles.");
        } else {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          const randomQuestion = availableQuestions[randomIndex];
  
          // Marquez la question comme posée
          setAskedQuestionIds([...askedQuestionIds, randomQuestion._id]);
  
          // Extraire les valeurs spécifiques de la question
          const { questionName, questionContent, questionCategory, questionPoint, questionAnswer } = randomQuestion;
  
          // Mettre à jour l'état avec la nouvelle question
          setCurrentQuestion(
            `Question : ${questionName}\nContenu : ${questionContent}\nCatégorie : ${questionCategory}\nPoints : ${questionPoint}\nRéponse : ${questionAnswer}`
          );
  
          // Incrémenter le nombre de questions posées
          setQuestionsAsked(questionsAsked + 1);
        }
      } else {
        setCurrentQuestion("Vous avez posé 10 questions. Aucune autre question n'est autorisée.");
      }
    } else {
      setCurrentQuestion("Aucune question disponible.");
    }
  };

  return (
    <div>
      <button onClick={getRandomQuestion}>Poser une question</button>
      <button onClick={() => setCurrentQuestion(null)}>Effacer la question</button>
      {currentQuestion && <p>{currentQuestion}</p>}
    </div>
  );
}
  
export default App;