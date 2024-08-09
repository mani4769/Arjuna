import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userschedule.css'

const UserSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Fetch schedules from the server
    axios.get('http://localhost:5000/api/schedule')
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  }, []);

  return (
    <div className="user-schedule-container">
      <h1>Match Schedules</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Match</th>
            <th>Stadium</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule._id}>
              <td>{schedule.date}</td>
              <td>{schedule.team1} vs {schedule.team2}</td>
              <td>{schedule.stadium}</td>
              <td>{schedule.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSchedulePage;
