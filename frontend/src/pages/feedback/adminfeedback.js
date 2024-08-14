
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminfeedback.css'; 

const AdminFeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="admin-feedback-page">
            <h1 style={{textAlign:'center',color:'#333',color:'blue',fontSize:'5vh'}}>Admin Feedback Dashboard</h1>
            <div className="feedback-list">
                {feedbacks.length === 0 ? (
                    <p>No feedbacks available.</p>
                ) : (
                    <ul>
                        {feedbacks.map((feedback, index) => (
                            <li key={index} className="feedback-item">
                                <p><strong>Role:</strong> {feedback.role}</p>
                                <p><strong>Rating:</strong> {feedback.rating}</p>
                                <p><strong>Comments:</strong> {feedback.comments}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminFeedbackPage;
