
import React from 'react';

const PlayerList = ({ team, onSelectPlayer, selectedBatsmen, selectedBowler }) => {
    const { players } = team;

    return (
        <div>
            <h2>Select Players</h2>
            <div>
                <h3>Batsmen</h3>
                {players.map(player => (
                    <button 
                        key={player} 
                        onClick={() => onSelectPlayer(player, 'batsman')}
                        disabled={selectedBatsmen.includes(player)}
                    >
                        {player} {selectedBatsmen.includes(player) ? '(Selected)' : ''}
                    </button>
                ))}
            </div>
            <div>
                <h3>Bowler</h3>
                {players.map(player => (
                    <button 
                        key={player} 
                        onClick={() => onSelectPlayer(player, 'bowler')}
                        disabled={selectedBowler === player}
                    >
                        {player} {selectedBowler === player ? '(Selected)' : ''}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;