import React from 'react';

const Controls = ({ updateScoreboard }) => {
    return (
        <div className="controls">
            <button onClick={() => updateScoreboard(1)}>Score 1 Run</button>
            <button onClick={() => updateScoreboard(2)}>Score 2 Runs</button>
            <button onClick={() => updateScoreboard(3)}>Score 3 Runs</button>
            <button onClick={() => updateScoreboard(4)}>Score 4 Runs</button>
            <button onClick={() => updateScoreboard(6)}>Score 6 Runs</button>
            <button onClick={() => updateScoreboard(0, false, false, true)}>Wicket</button>
            <button onClick={() => updateScoreboard(0, true)}>Wide Ball</button>
            <button onClick={() => updateScoreboard(0, false, true)}>No Ball</button>
        </div>
    );
};

export default Controls;