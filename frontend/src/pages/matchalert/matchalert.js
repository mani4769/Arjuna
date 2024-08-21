import React, { useState } from 'react';
import './matchalert.css';

const MatchAlert = () => {
    const [selectedTeam1, setSelectedTeam1] = useState('');
    const [selectedTeam2, setSelectedTeam2] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [minutes, setMinutes] = useState(0);

    const handleSetAlert = async () => {
        try {
            const response = await fetch('https://arjuna-six.vercel.app/api/set-alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    teamNames: [selectedTeam1, selectedTeam2], 
                    dateTime, 
                    minutes: parseInt(minutes, 10) // Convert minutes to a number
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Alert set successfully!');
            } else {
                alert(`Failed to set alert: ${data.message}`);
            }
        } catch (error) {
            console.error('Error setting alert:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div>
            <div className='mat'>
            <h1>Set Match Alert</h1>
            <div>
                <label>
                    Select Team 1:
                    <input type="text" value={selectedTeam1} onChange={e => setSelectedTeam1(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Select Team 2:
                    <input type="text" value={selectedTeam2} onChange={e => setSelectedTeam2(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Date and Time of Match:
                    <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Minutes Before Alert:
                    <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} />
                </label>
            </div>
            <button onClick={handleSetAlert} style={{ backgroundColor: '#7f4caf',borderRadius:'50px',boxshadow: 'inset 0 0 8px rgba(0, 0, 0, 10)'}}>Set Alert</button>
        </div>
        </div>
    );
};

export default MatchAlert;
