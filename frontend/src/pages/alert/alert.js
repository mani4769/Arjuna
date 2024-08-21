// ScheduleAlert.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alert.css';

function ScheduleAlert() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/schedule')
            .then(response => {
                console.log('Schedules fetched:', response.data);
                setSchedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching schedules:', error);
            });
    }, []);

    const handleAlert = (schedule, minutes) => {
        if (!minutes || isNaN(minutes) || minutes <= 0) {
            alert('Please enter a valid number of minutes before the match for the alert.');
            return;
        }

        const matchDateTime = new Date(`${schedule.date}T${schedule.time}:00`);
        const alertTime = new Date(matchDateTime.getTime() - minutes * 60000);
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

        if (!userDetails || !userDetails.email) {
            alert('User email not found. Please ensure you are logged in.');
            return;
        }

        const email = userDetails.email;

        if (alertTime > new Date()) {
            axios.post('http://localhost:5000/api/alert', {
                email: email,
                team1: schedule.team1,
                team2: schedule.team2,
                date: schedule.date,
                stadium: schedule.stadium,
                time: schedule.time,
                minutes: minutes 
            })
            .then(response => {
                console.log('Backend response:', response.data);
                alert('Alert set successfully!');
            })
            .catch(error => {
                console.error('Error setting alert:', error);
                alert('Failed to set alert. Please try again later.');
            });
        } else {
            alert('Cannot set alert in the past. Please choose a valid time.');
        }
    };

    return (
        <div className="schedule-alert-container">
            <h1>Set Alert for Matches</h1>
            <div className='mani' style={{ backgroundColor: 'whitesmoke', borderRadius: '5vh', paddingTop: '4vh', paddingBottom: '10vh' }}>
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule._id} style={{ marginBottom: '2vh', padding: '2vh', border: '1px solid #ccc', borderRadius: '2vh' }}>
                            <h2>Match: {schedule.team1} vs {schedule.team2}</h2>
                            <p>Date: {schedule.date}</p>
                            <p>Time: {schedule.time}</p>
                            <p>Stadium: {schedule.stadium}</p>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1vh' }}>
                                <label style={{ marginRight: '1vh' }}>
                                    Minutes before match:
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 30"
                                        style={{ marginLeft: '0.5vh', width: '10vh' }}
                                        id={`minutes-input-${schedule._id}`}
                                    />
                                </label>
                                <button
                                    onClick={() => {
                                        const minutesInput = document.getElementById(`minutes-input-${schedule._id}`);
                                        const minutes = parseInt(minutesInput.value);
                                        handleAlert(schedule, minutes);
                                    }}
                                    style={{ width: '17vh', marginLeft: '2vh', borderRadius: '20vh', fontSize: '2.5vh', backgroundColor: '#7f4caf', color: 'white', border: 'none', padding: '1vh' }}
                                >
                                    Set Alert
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ScheduleAlert;
