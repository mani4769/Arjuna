// ScheduleAlert.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alert.css';

function ScheduleAlert() {
    const [schedules, setSchedules] = useState([]);
    const [minutes, setMinutes] = useState('');
    const[email,setEmail]=useState("")
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only the date part
    // const userEmail = sessionStorage.getItem('email');

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

    const handleAlert = (schedule) => {
        if (minutes) {
            const matchDateTime = new Date(`${schedule.date}T${schedule.time}:00`);
            const alertTime = new Date(matchDateTime.getTime() - minutes * 60000);
            // setEmail(sessionStorage.getItem("email"))
            let a = JSON.parse(sessionStorage.getItem('userDetails'))
            setEmail(a.email)           
            if (alertTime > new Date()) {
                axios.post('http://localhost:5000/api/alert', {
                    email:email,
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
                .then()
                .catch(error => {
                    console.error('Error setting alert:', error);
                    alert('Failed to set alert. Please try again later.');
                });
            } else {
                alert('Cannot set alert in the past. Please choose a valid time.');
            }
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
            <div  className='mani' style={{backgroundColor:'whitesmoke',borderRadius:'5vh',paddingTop:'4vh',paddingBottom:'10vh'}}>
            <ul>
                {schedules
                    .filter(schedule => {
                        const matchDate = new Date(schedule.date);
                        matchDate.setHours(0, 0, 0, 0);
                        return matchDate.getTime() === today.getTime();
                    })
                    
                    .map(schedule => (
                        <li key={schedule._id}>
                            <h2>Match: {schedule.team1} vs {schedule.team2}</h2>
                            <p>Date: {schedule.date}</p>
                            <p>Time: {schedule.time}</p>
                            <p>Stadium: {schedule.stadium}</p>
                            <button onClick={() => handleAlert(schedule)} style={{width:'17vh',marginLeft:'9vh',borderRadius:'20vh',fontSize:'3vh',backgroundColor:'#7f4caf'}}>Set Alert</button>
                        </li>
                    ))}
               
            </ul>
        </div>
        </div>
    );
}

export default ScheduleAlert;
