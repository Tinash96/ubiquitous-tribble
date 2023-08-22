

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'; 
import 'firebase/firestore';
import { firestore } from './FirebaseConfig';



const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
  submittedQuestion: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    border: '2px solid #ccc',
    borderRadius: '10px',
  },
};

function Create() {
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const snapshot = await firestore.collection('questions').get();
        const questionList = snapshot.docs.map((doc) => doc.data().question);
        setQuestions(questionList);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await firestore.collection('questions').add({
      question: userQuestion,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSubmittedQuestion(userQuestion);
    setUserQuestion('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Questionnaire</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label>
          Your Question:
          <input
            type="text"
            value={userQuestion}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Submit Question
        </button>
      </form>
      {submittedQuestion && (
        <div style={styles.submittedQuestion}>
          <p>Submitted Question:</p>
          <p>{submittedQuestion}</p>
        </div>
      )}
      <div style={styles.submittedQuestion}>
        <h2>All Questions:</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Create;
