import React from 'react';

const TeamDetails = ({ team, teamsData }) => {
    console.log(team,teamsData)
    if (!team || !teamsData[team]) {
        return <div>No team selected or team data not available.</div>;
    }

    const teamInfo = teamsData[team];
    const players = Array.isArray(teamInfo.players) ? teamInfo.players : []; // Ensure players is an array

    return (
        <div className="team-details">
            <h2>{teamInfo.name}</h2>
            <p>Coach: {teamInfo.coach}</p>
            <p>Home Ground: {teamInfo.ground}</p>
            <p>Players:</p>
            <ul>
                {players.length > 0 ? (
                    players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))
                ) : (
                    <li>No players available</li>
                )}
            </ul>
        </div>
    );
};

export default TeamDetails;