import React from 'react';

const Bowler = ({ bowler }) => {
    return (
        <div className="bowler">
            <h2>Selected Bowler</h2>
            {bowler ? <p>{bowler}</p> : <p>No bowler selected</p>}
        </div>
    );
};

export default Bowler;