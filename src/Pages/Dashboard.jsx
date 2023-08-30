






import React, { useState, useEffect } from 'react';
import { db } from '../components/FirebaseConfig';
import '../App.css';

function Dashboard() {
  const [responseCounts, setResponseCounts] = useState({ agree: 0, neutral: 0, disagree: 0 });
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const responsesRef = db.collection('surveyResponses');
    responsesRef.get().then(querySnapshot => {
      const counts = { agree: 0, neutral: 0, disagree: 0 };
      querySnapshot.forEach(doc => {
        const response = doc.data().response;
        counts[response]++;
      });
      setResponseCounts(counts);
    });

    const fetchTotalQuestions = async () => {
      try {
        const snapshot = await db.collection('questions').get();
        const totalCount = snapshot.docs.length;
        setTotalQuestions(totalCount);
      } catch (error) {
        console.error('Error fetching total questions:', error);
      }
    };
    fetchTotalQuestions();
  }, []);

  return (
    <div className="container2">
      <h2 className="heading">Dashboard</h2>
      <div className="card">
        <p className="summary">Total Questions: {totalQuestions}</p>
        <ul className="response-list">
          <li className="response-item">
            <span className="response-label">Agreements:</span>
            <span className="response-count">{responseCounts.agree}</span>
          </li>
          <li className="response-item">
            <span className="response-label">Neutral:</span>
            <span className="response-count">{responseCounts.neutral}</span>
          </li>
          <li className="response-item">
            <span className="response-label">Disagreements:</span>
            <span className="response-count">{responseCounts.disagree}</span>
          </li>
        </ul>
      </div>
      <p className="footer">Hover over response items for a highlight effect.</p>
    </div>
  );
}

export default Dashboard;



























