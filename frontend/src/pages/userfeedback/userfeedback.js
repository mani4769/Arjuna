import React, { useState } from 'react';
import axios from 'axios';
import './userfeedbackform.css'; 

const FeedbackForm = () => {
    const [role, setRole] = useState('');
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const feedbackData = {
            role,
            rating,
            comments,
        };

        try {
            await axios.post('https://arjuna-six.vercel.app/feedback', feedbackData);
            alert('Feedback submitted successfully!');
            setRole('');
            setRating(null);
            setComments('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    return (
        <div className="Afeedback-form">
            <h1>Feedback Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="feedback-item">
                    <label>
                        Role:
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="" disabled>Select your role</option>
                            <option value="user">User</option>
                            <option value="player">Player</option>
                        </select>
                    </label>
                </div>
                <div className="Afeedback-item">
                    <label>Rating:</label>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? 'filled' : ''}`}
                                onClick={() => handleRatingClick(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="Afeedback-item">
                    <label>
                        Comments:
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows="4"
                            required
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;