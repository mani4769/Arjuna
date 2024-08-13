import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './schedule.css';

const SchedulePage = () => {
  const [teams, setTeams] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    team1: '',
    team2: '',
    date: '',
    stadium: '',
    time: ''
  });

  useEffect(() => {
    // Fetch teams from the server
    axios.get('http://localhost:5000/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setScheduleData({ ...scheduleData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the selected teams are the same
    if (scheduleData.team1 === scheduleData.team2) {
      alert('The selected teams cannot be the same.');
      return;
    }

    // Log the data before sending
    console.log(scheduleData);

    axios.post('http://localhost:5000/api/schedule', scheduleData)
      .then(response => {
        alert(response.data.message);
        setScheduleData({
          team1: '',
          team2: '',
          date: '',
          stadium: '',
          time: ''
        });
      })
      .catch(error => {
        console.error('Error creating schedule:', error);
        alert('Failed to create schedule');
      });
  };

  return (
   
    <div className="schedule-container">
      <h1>Create Schedule</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="team1">Select Team 1:</label>
          <select id="team1" value={scheduleData.team1} onChange={handleInputChange} required>
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team._id} value={team.teamName}>{team.teamName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="team2">Select Team 2:</label>
          <select id="team2" value={scheduleData.team2} onChange={handleInputChange} required>
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team._id} value={team.teamName}>{team.teamName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input type="date" id="date" value={scheduleData.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="stadium">Stadium:</label>
          <input type="text" id="stadium" value={scheduleData.stadium} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" value={scheduleData.time} onChange={handleInputChange} required />
        </div>
        <button type="submit" style={{backgroundColor:'#7f4caf',borderRadius:'20vh',width:'20vh',marginLeft:'32vh',boxshadow: 'inset 0 0 7px rgba(0,0,0,10)',fontSize:'2.2vh'}}>Create Schedule</button>
      </form>
    </div>
  
  );
};

export default SchedulePage;
