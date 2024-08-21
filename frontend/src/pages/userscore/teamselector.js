import React from 'react';

const TeamSelector = ({ teams, onSelectTeam }) => {
    return (
        <div>
            <h2>Select a Team</h2>
            {teams.map((team) => (
                <button key={team} onClick={() => onSelectTeam(team)}>
                    {team}
                </button>
            ))}
        </div>
    );
};

export default TeamSelector;
