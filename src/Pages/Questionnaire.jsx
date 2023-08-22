import React, { useState } from "react";
import "../App.css";

function Questionnaire() {
    const [ratings, setRatings] = useState([0, 0, 0, 0]);

    const handleRatingChange = (index, rating) => {
        const newRatings = [...ratings];
        newRatings[index] = rating;
        setRatings(newRatings);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted ratings:", ratings);
    };

    const statements = [
        "I like to eat out",
        "I like to watch movies",
        "I like to watch TV",
        "I like to listen to the radio"
    ];

    return (
        <div className="survey-container">
            <form onSubmit={handleSubmit}>
                <table className="survey-table">
                    <thead>
                        <tr>
                            <th>Options</th>
                            <th>Strongly Agree</th>
                            <th>Agree</th>
                            <th>Neutral</th>
                            <th>Disagree</th>
                            <th>Strongly Disagree</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statements.map((statement, index) => (
                            <tr key={index}>
                                <td>{statement}</td>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <td key={rating}>
                                        <label className="custom-radio">
                                            <input
                                                type="radio"
                                                value={rating}
                                                checked={ratings[index] === rating}
                                                onChange={() => handleRatingChange(index, rating)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Questionnaire;
