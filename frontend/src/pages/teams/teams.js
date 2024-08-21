
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './teams.css';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('https://arjuna-six.vercel.app/api/teams');
                console.log('Fetched teams:', response.data);
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const showTeamDetails = (team) => {
        setSelectedTeam(team);
    };

    const DisplayTeams = (teams) => {
        const rows = [];

        for (let i = 0; i < teams.length; i += 2) {
            rows.push(teams.slice(i, i + 2));
        }

        return rows.map((teamPair, rowIndex) => (
            <div key={rowIndex} className="team-row">
                {teamPair.map((team) => (
                    <div
                        key={team._id}
                        className={`team-card team-${team.teamName.toLowerCase()}`}
                        style={{ backgroundColor: team.color }}
                        onClick={() => showTeamDetails(team)}
                    >
                        <div className="team-name">
                            <h1>{team.teamName}</h1>
                        </div>
                    </div>
                ))}
            </div>
        ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching teams: {error.message}</div>;
    }

    return (
        <div className="page-container">
           
            <header>
                <h1 style={{color:'purple',fontSize:'8vh'}}>Cricket Team Management</h1>
            </header>
            <main>
                <section id="team-list">
                    {teams.length > 0 ? DisplayTeams(teams) : <p>No teams available</p>}
                </section>
                <section id="team-details">
                    <h2>Team Details</h2>
                    <div id="details">
                        {selectedTeam ? (
                            <div>
                                <p><strong>Team Name:</strong> {selectedTeam.teamName}</p>
                                <p><strong>Registration Number:</strong> {selectedTeam.teamCode}</p>
                                <p><strong>Players:</strong></p>
                                <div className="players-list">
                                    {selectedTeam.players.map((player, index) => (
                                        <div key={index} className="player-card">
                                            <p><strong>Name:</strong> {player.name}</p>
                                            <p><strong>Role:</strong> {player.role}</p>
                                            <p><strong>Runs:</strong> {player.runs}</p>
                                            <p><strong>Matches:</strong> {player.matches}</p>
                                            <p><strong>Wickets:</strong> {player.wickets}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>Select a team to view details</p>
                        )}
                    </div>
                </section>
            </main>
            
        </div>
    );
};

export default Teams;