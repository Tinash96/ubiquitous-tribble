import React, { useState } from 'react';
import '../App.css'; 
import { db, FirebaseConfig } from '../components/FirebaseConfig'


function Questionnaire() {
  const [responses, setResponses] = useState([
    { question: "The computer is the invention of the century", response: null },
    { question: "The computer is the invention of the century", response: null },
    { question: "The computer is the invention of the century", response: null },
    { question: "The computer is the invention of the century", response: null },
    { question: "The computer is the invention of the century", response: null },
  ]);



const handleResponseChange = async (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index].response = value;
    setResponses(updatedResponses);
  
    
    try {
      await db.collection('surveyResponses').add({
        question: responses[index].question,
        response: value,
      });
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };
  



  return (
    <div className="survey-container">
      <h2 className="survey-title">Questionnaire</h2>
      <div className="questions-responses-container">
        {responses.map((item, index) => (
          <div className="question-response" key={index}>
            <div className="question">{item.question}</div>
            <form className="response-form">
              <label className="response-option">
                <input
                  type="radio"
                  value="agree"
                  checked={item.response === 'agree'}
                  onChange={() => handleResponseChange(index, 'agree')}
                />
                Agree
              </label>

              <label className="response-option">
                <input
                  type="radio"
                  value="neutral"
                  checked={item.response === 'neutral'}
                  onChange={() => handleResponseChange(index, 'neutral')}
                />
                Neutral
              </label>

              <label className="response-option">
                <input
                  type="radio"
                  value="disagree"
                  checked={item.response === 'disagree'}
                  onChange={() => handleResponseChange(index, 'disagree')}
                />
                Disagree
              </label>
            </form>
          </div>
        ))}
      </div>

      <h2 className="responses-title">Responses</h2>
      <ul className="responses-list">
        {responses.map((item, index) => (
          <li className="response-item" key={index}>
            <strong>{item.question}:</strong> {item.response || 'No response'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questionnaire;
