import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alert.css';

function ScheduleAlert() {
    const [schedules, setSchedules] = useState([]);
    const [minutes, setMinutes] = useState('');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const user = JSON.parse(localStorage.getItem('email')); // Assuming email is stored in localStorage
    {console.log(user)}
    useEffect(() => {
        axios.get('http://localhost:5000/api/schedule')
            .then(response => {
                setSchedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching schedules:', error);
            });
    }, []);

    const handleAlert = (schedule) => {
        if (minutes) {
            const matchDateTime = new Date(schedule.date + 'T' + schedule.time); // Combine date and time
            const alertTime = new Date(matchDateTime.getTime() - minutes * 60000); // Subtract minutes to get alert time
    
          
    
            axios.post('http://localhost:5000/api/sendAlert', {
                email: user,
                alertTime: alertTime.toISOString(),
                schedule
            })
            .then(response => {
                alert('Alert set successfully!');
            })
            .catch(error => {
                console.error('Error setting alert:', error);
            });
        } else {
            alert('Please enter the number of minutes before the match for the alert.');
        }
    };

    return (
        <div className="schedule-alert-container">
            <h1>Set Alert for Match</h1>
            <label>
                Minutes before match:
                <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                />
            </label>
            <ul>
                {schedules
                    .filter(schedule => new Date(schedule.date).toISOString().split('T')[0] === today) // Filter schedules for today
                    .map(schedule => (
                        <li key={schedule._id}>
                            <h2>Match: {schedule.team1} vs {schedule.team2}</h2>
                            <p>Date: {schedule.date}</p>
                            <p>Time: {schedule.time}</p>
                            <p>Stadium: {schedule.stadium}</p>
                            <button onClick={() => handleAlert(schedule)}>Set Alert</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ScheduleAlert;
