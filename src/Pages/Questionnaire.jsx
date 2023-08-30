



import React, { useState, useEffect } from 'react';
import '../App.css'; 
import { db } from '../components/FirebaseConfig';

function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [responseCounts, setResponseCounts] = useState({
    agree: 0,
    neutral: 0,
    disagree: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await db.collection('questions').get();
        const questionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().question,
        }));
        setQuestions(questionList);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    
    const counts = {
      agree: 0,
      neutral: 0,
      disagree: 0,
    };

    responses.forEach((response) => {
      counts[response.response]++;
    });

    setResponseCounts(counts);
  }, [responses]);

  const handleResponseChange = async (questionId, value) => {
    const updatedResponses = [...responses];
    const existingResponseIndex = updatedResponses.findIndex(
      (response) => response.questionId === questionId
    );

    if (existingResponseIndex !== -1) {
      updatedResponses[existingResponseIndex].response = value;
    } else {
      updatedResponses.push({ questionId, response: value });
    }

    setResponses(updatedResponses);

    
    try {
      await db.collection('surveyResponses').add({
        questionId,
        response: value,
        timestamp: new Date(),
      });
      console.log('Response saved to database');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  return (
    <div className="survey-container">
      <h2 className="survey-title">Questionnaire</h2>
      <div className="questions-responses-container">
        {questions.map((question, index) => (
          <div className="question-response" key={index}>
            <div className="question">{question.text}</div>
            <form className="response-form">
              <label className="response-option">
                <input
                  type="radio"
                  value="agree"
                  checked={responses.some(
                    (response) =>
                      response.questionId === question.id &&
                      response.response === 'agree'
                  )}
                  onChange={() => handleResponseChange(question.id, 'agree')}
                />
                Agree
              </label>

              <label className="response-option">
                <input
                  type="radio"
                  value="neutral"
                  checked={responses.some(
                    (response) =>
                      response.questionId === question.id &&
                      response.response === 'neutral'
                  )}
                  onChange={() => handleResponseChange(question.id, 'neutral')}
                />
                Neutral
              </label>

              <label className="response-option">
                <input
                  type="radio"
                  value="disagree"
                  checked={responses.some(
                    (response) =>
                      response.questionId === question.id &&
                      response.response === 'disagree'
                  )}
                  onChange={() => handleResponseChange(question.id, 'disagree')}
                />
                Disagree
              </label>
            </form>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Questionnaire;







