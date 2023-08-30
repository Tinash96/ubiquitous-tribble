// import React, { useState } from 'react';
// import '../App.css'; 
// import { db, FirebaseConfig } from '../components/FirebaseConfig'


// function Questionnaire() {
//   const [responses, setResponses] = useState([
//     { question: "The computer is the invention of the century", response: null },
//     { question: "The computer is the invention of the century", response: null },
//     { question: "The computer is the invention of the century", response: null },
//     { question: "The computer is the invention of the century", response: null },
//     { question: "The computer is the invention of the century", response: null },
//   ]);

//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const snapshot = await db.collection('questions').get();
//         const questionList = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           text: doc.data().question,
//         }));
//         setQuestions(questionList);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);


  

// const handleResponseChange = async (index, value) => {
//     const updatedResponses = [...responses];
//     updatedResponses[index].response = value;
//     setResponses(updatedResponses);
  
    
//     try {
//       await db.collection('surveyResponses').add({
//         question: responses[index].question,
//         response: value,
//       });
//     } catch (error) {
//       console.error('Error adding response:', error);
//     }
//   };
  



//   return (
//     <div className="survey-container">
//       <h2 className="survey-title">Questionnaire</h2>
//       <div className="questions-responses-container">
//         {questions.map((item, index) => (
//           <div className="question-response" key={index}>
//             <div className="question">{item.question}</div>
//             <form className="response-form">
//               <label className="response-option">
//                 <input
//                   type="radio"
//                   value="agree"
//                   checked={item.response === 'agree'}
//                   onChange={() => handleResponseChange(index, 'agree')}
//                 />
//                 Agree
//               </label>

//               <label className="response-option">
//                 <input
//                   type="radio"
//                   value="neutral"
//                   checked={item.response === 'neutral'}
//                   onChange={() => handleResponseChange(index, 'neutral')}
//                 />
//                 Neutral
//               </label>

//               <label className="response-option">
//                 <input
//                   type="radio"
//                   value="disagree"
//                   checked={item.response === 'disagree'}
//                   onChange={() => handleResponseChange(index, 'disagree')}
//                 />
//                 Disagree
//               </label>
//             </form>
//           </div>
//         ))}
//       </div>

//       <h2 className="responses-title">Responses</h2>
//       <ul className="responses-list">
//         {responses.map((item, index) => (
//           <li className="response-item" key={index}>
//             <strong>{item.question}:</strong> {item.response || 'No response'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Questionnaire;



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
    // Calculate response counts
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

    // Save response to database
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
      {/* <div className="response-counts">
        <p> {responseCounts.agree}</p>
        <p> {responseCounts.neutral}</p>
        <p> {responseCounts.disagree}</p>
      </div> */}
    </div>
  );
}

export default Questionnaire;







