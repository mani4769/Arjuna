import React, { useState, useEffect } from 'react';
import './Recentmatches.css';

const RecentMatches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://arjuna-six.vercel.app/matches/today');
                if (!response.ok) throw new Error('Failed to fetch today\'s matches');
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error fetching today\'s matches:', error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <div className="matches-container">
            <h1>Today's Matches</h1>
            {matches.map(match => (
                <div className="match-card" key={match._id}>
                    <h2>{match.team1} vs {match.team2}</h2>
                    <p><strong>Date & Time:</strong> {new Date(match.dateTime).toLocaleString()}</p>
                    <p><strong>Venue:</strong> {match.venueName}</p>
                    <p><strong>Scorer:</strong> {match.scorerName}</p>
                    <p><strong>Umpire:</strong> {match.umpireName}</p>
                    <div className="players">
                        <h3>{match.team1} Players:</h3>
                        <ul>
                            {match.team1Players.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                        <h3>{match.team2} Players:</h3>
                        <ul>
                            {match.team2Players.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentMatches;
