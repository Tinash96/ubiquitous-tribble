import React, { useState, useEffect } from 'react';
import { db, FirebaseConfig } from '../components/FirebaseConfig'
import firebase from 'firebase/compat/app'; 

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
        marginTop:"100px"
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
        marginTop:'20px',
        marginLeft:'150px',
      },
      submittedQuestion: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        borderRadius: '10px',
      },

      submit:{

        textAlign:'center',
        marginLeft:'60px',
      },
};

function Create() {
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState('');

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const snapshot = await db.collection('questions').get();
//         const questionList = snapshot.docs.map((doc) => doc.data().question);
//         setQuestions(questionList);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);

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


  const handleEditInputChange = (event) => {
    setEditedQuestion(event.target.value);
  };

  const handleInputChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await db.collection('questions').add({
      question: userQuestion,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSubmittedQuestion(userQuestion);
    setUserQuestion('');
  };


  const deleteQuestion = async (questionId) => {
    try {
      await db.collection('questions').doc(questionId).delete();
      console.log('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const editQuestion = async (questionId) => {
    try {
      await db.collection('questions').doc(questionId).update({
        question: editedQuestion,
      });
      console.log('Question edited successfully');
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };

  const saveEditedQuestion = async (questionId) => {
    try {
      await db.collection('questions').doc(questionId).update({
        question: editedQuestion.text,
      });
      console.log('Question edited successfully');
      setEditedQuestion({ id: '', text: '' });
    } catch (error) {
      console.error('Error saving edited question:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Creating the questionnaire</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label>
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
        <h2 className='submit'>List of questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question.text}
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
            <button onClick={() => editQuestion(question.id)}>Edit</button>
              {editedQuestion && question.id === editedQuestion.id && (
                <div>
                  <input
                    type="text"
                    value={editedQuestion.text}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={() => saveEditedQuestion(question.id)}>Save</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Create;


















