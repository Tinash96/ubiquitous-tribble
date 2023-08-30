import React, { useState, useEffect } from 'react';
import { db, FirebaseConfig } from '../components/FirebaseConfig'
import firebase from 'firebase/compat/app'; 
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa';

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
        marginTop:"30px"
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
      questionList: {
        marginTop: '20px',
        listStyle: 'none',
        padding: '0',
      },
      questionItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      questionText: {
        flex: '1',
        marginRight: '10px',
      },
      buttonGroup: {
        display: 'flex',
        alignItems: 'center',
      },
      actionButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
      },
      editSection: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
      },
      editInput: {
        flex: '1',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      },
      saveButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
      },
};

function Create() {
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState({ id: '', text: '' });


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


  // const handleEditInputChange = (event) => {
  //   setEditedQuestion(event.target.value);
  // };

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

  const editQuestion = (questionId) => {
    const questionToEdit = questions.find((question) => question.id === questionId);
    if (questionToEdit) {
      setEditedQuestion({ id: questionId, text: questionToEdit.text });
    }
  };
  


  const handleEditInputChange = (event) => {
    setEditedQuestion((prevState) => ({
      ...prevState,
      text: event.target.value,
    }));
  };

  const saveEditedQuestion = async () => {
    try {
      await db.collection('questions').doc(editedQuestion.id).update({
        question: editedQuestion.text,
      });
      console.log('Question edited successfully');
      setEditedQuestion({ id: '', text: '' }); 
    } catch (error) {
      console.error('Error saving edited question:', error);
    }
  };
  
  
  // const editQuestion = async (questionId) => {
  //   try {
  //     await db.collection('questions').doc(questionId).update({
  //       question: editedQuestion,
  //     });
  //     console.log('Question edited successfully');
  //   } catch (error) {
  //     console.error('Error editing question:', error);
  //   }
  // };

  // const saveEditedQuestion = async (questionId) => {
  //   try {
  //     await db.collection('questions').doc(questionId).update({
  //       question: editedQuestion.text,
  //     });
  //     console.log('Question edited successfully');
  //     setEditedQuestion({ id: '', text: '' });
  //   } catch (error) {
  //     console.error('Error saving edited question:', error);
  //   }
  // };

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
      {/* <div style={styles.submittedQuestion}>
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
      </div> */}



<div style={styles.submittedQuestion}>
  <h2 className='submit'>List of questions</h2>
  <ul style={styles.questionList}>
    {questions.map((question) => (
      <li key={question.id} style={styles.questionItem}>
        <div style={styles.questionText}>{question.text}</div>
        <div style={styles.buttonGroup}>
          <button
            style={styles.actionButton}
            onClick={() => deleteQuestion(question.id)}
          >
             <FaTrashAlt/>
          </button>
          <button
            style={styles.actionButton}
            onClick={() => editQuestion(question.id)}
          >
            <FaEdit />
          </button>
        </div>
        {editedQuestion.id === question.id && (
          <div style={styles.editSection}>
            <input
              type="text"
              value={editedQuestion.text}
              onChange={handleEditInputChange}
              style={styles.editInput}
            />
            <button
              style={styles.actionButton}
              onClick={() => saveEditedQuestion(question.id)}
            >
              <FaSave />
            </button>
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


















