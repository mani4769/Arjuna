import React, { useState, useEffect } from 'react';
import './schedulematch.css';

const ScheduleMatch = () => {
    const [teams, setTeams] = useState([]);
    const [scorers, setScorers] = useState([]);
    const [umpires, setUmpires] = useState([]);
    const [venues, setVenues] = useState([]);
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);
    const [team1SelectedPlayers, setTeam1SelectedPlayers] = useState([]);
    const [team2SelectedPlayers, setTeam2SelectedPlayers] = useState([]);
    const [scorerName, setScorerName] = useState('');
    const [umpireName, setUmpireName] = useState('');
    const [venueName, setVenueName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [teamResponse, scorerResponse, umpireResponse, venueResponse] = await Promise.all([
                    fetch('http://localhost:5000/teams'),
                    fetch('http://localhost:5000/scorers'),
                    fetch('http://localhost:5000/umpires'),
                    fetch('http://localhost:5000/venues')
                ]);
                //  console.log()
                if (!teamResponse.ok) throw new Error('Failed to fetch teams');
                if (!scorerResponse.ok) throw new Error('Failed to fetch scorers');
                if (!umpireResponse.ok) throw new Error('Failed to fetch umpires');
                if (!venueResponse.ok) throw new Error('Failed to fetch venues');

                const teamData = await teamResponse.json();
                setTeams(teamData);
                console.log('Teams:', teamData); // Logging teams data

                const scorerData = await scorerResponse.json();
                setScorers(scorerData);
                console.log('Scorers:', scorerData); // Logging scorers data

                const umpireData = await umpireResponse.json();
                console.log(umpireData,"um")
                setUmpires(umpireData);
                console.log('Umpires:', umpireData); // Logging umpires data

                const venueData = await venueResponse.json();
                setVenues(venueData);
                console.log('Venues:', venueData); // Logging venues data
            } catch (error) {
                console.error('Error fetching options:', error);
                alert('Error fetching data');
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        if (team1) {
            fetch(`http://localhost:5000/teams/${team1}`)
                .then(response => response.json())
                .then(data => setTeam1Players(data.players))
                .catch(() => setMessage('Error fetching team players'));
        } else {
            setTeam1Players([]);
        }
    }, [team1]);

    useEffect(() => {
        if (team2) {
            fetch(`http://localhost:5000/teams/${team2}`)
                .then(response => response.json())
                .then(data => setTeam2Players(data.players))
                .catch(() => setMessage('Error fetching team players'));
        } else {
            setTeam2Players([]);
        }
    }, [team2]);

    const handlePlayerSelection = (team, playerEmail, isChecked) => {
        if (team === 'team1') {
            setTeam1SelectedPlayers(prev =>
                isChecked ? [...prev, playerEmail] : prev.filter(email => email !== playerEmail)
            );
        } else {
            setTeam2SelectedPlayers(prev =>
                isChecked ? [...prev, playerEmail] : prev.filter(email => email !== playerEmail)
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/schedule-match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    team1, 
                    team1Players: team1SelectedPlayers,
                    team2, 
                    team2Players: team2SelectedPlayers,
                    scorerName, 
                    umpireName, 
                    venueName, 
                    dateTime 
                }),
            });

            if (!response.ok) throw new Error('Failed to schedule match');

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error scheduling match:', error);
            alert('Error scheduling match');
        }
    };

    const filteredTeamsForTeam1 = teams.filter(team => team.teamName !== team2);
    const filteredTeamsForTeam2 = teams.filter(team => team.teamName !== team1);

    return (
        <div>
            <h1>Schedule a Match</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team 1:</label>
                    <select value={team1} onChange={e => setTeam1(e.target.value)}>
                        <option value="">Select Team 1</option>
                        {filteredTeamsForTeam1.map(team => (
                            <option key={team._id} value={team.teamName}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Team 2:</label>
                    <select value={team2} onChange={e => setTeam2(e.target.value)}>
                        <option value="">Select Team 2</option>
                        {filteredTeamsForTeam2.map(team => (
                            <option key={team._id} value={team.teamName}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Scorer:</label>
                    <select value={scorerName} onChange={e => setScorerName(e.target.value)}>
                        <option value="">Select Scorer</option>
                        {scorers.length > 0 ? (
                            scorers.map(scorer => (
                                <option key={scorer._id} value={scorer.name}>
                                    {scorer.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No scorers available</option>
                        )}
                    </select>
                </div>
                <div>
              
                    <label>Umpire:</label>
                    <select value={umpireName} onChange={e => setUmpireName(e.target.value)}>
                        <option value="">Select Umpire</option>
                        {umpires.length > 0 ? (
                            umpires.map(umpire => (
                                
                                <option key={umpire._id} value={umpire.name}>
                                    {umpire.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No umpires available</option>
                        )}
                    </select>
                </div>
                <div>
                    <label>Venue:</label>
                    <select value={venueName} onChange={e => setVenueName(e.target.value)}>
                        <option value="">Select Venue</option>
                        {venues.length > 0 ? (
                            venues.map(venue => (
                                <option key={venue._id} value={venue.venueName}>
                                    {venue.venueName}
                                </option>
                            ))
                        ) : (
                            <option value="">No venues available</option>
                        )}
                    </select>
                </div>
                <div>
                    <label>Date and Time:</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={e => setDateTime(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Team 1 Players:</h3>
                    {team1Players.length > 0 ? (
                        team1Players.map(player => (
                            <div key={player.email}>
                                <input
                                    type="checkbox"
                                    onChange={e => handlePlayerSelection('team1', player.email, e.target.checked)}
                                />
                                {player.name}
                            </div>
                        ))
                    ) : (
                        <p>No players available for Team 1</p>
                    )}
                </div>
                <div>
                    <h3>Team 2 Players:</h3>
                    {team2Players.length > 0 ? (
                        team2Players.map(player => (
                            <div key={player.email}>
                                <input
                                    type="checkbox"
                                    onChange={e => handlePlayerSelection('team2', player.email, e.target.checked)}
                                />
                                {player.name}
                            </div>
                        ))
                    ) : (
                        <p>No players available for Team 2</p>
                    )}
                </div>
                <button type="submit">Schedule Match</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ScheduleMatch;
