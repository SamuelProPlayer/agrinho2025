import React, { useState } from "react";
import flashcardsData from "./flashcardsData.json";

const Flashcard = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcardsData.length);
    setShowAnswer(false); // Resetar para a próxima pergunta
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectAnswers([...incorrectAnswers, currentCard]);
    handleNext();
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <h2>Pergunta:</h2>
        <p className="question">{flashcardsData[currentCard].question}</p>
        {showAnswer && (
          <div>
            <h3>Resposta:</h3>
            <p className="answer">{flashcardsData[currentCard].answer}</p>
          </div>
        )}
        <div className="buttons">
          {!showAnswer ? (
            <button onClick={handleShowAnswer}>Mostrar Resposta</button>
          ) : (
            <>
              <button onClick={handleNext}>Próximo</button>
              <button onClick={handleIncorrectAnswer}>Marcar como Errado</button>
            </>
          )}
        </div>
      </div>
      {incorrectAnswers.length > 0 && (
        <div className="review">
          <h3>Perguntas marcadas como erradas:</h3>
          <ul>
            {incorrectAnswers.map((index) => (
              <li key={index}>{flashcardsData[index].question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Flashcard;

