
import React from 'react';

const Scoreboard = ({ scoreboard }) => (
    <div className="scoreboard">
        <h2>Scoreboard</h2>
        <p>Runs: {scoreboard.runs}</p>
        <p>Wickets: {scoreboard.wickets}</p>
        <p>Overs: {scoreboard.overs}</p>
        <p>Balls: {scoreboard.balls}</p>
        <p>Wides: {scoreboard.wides}</p>
        <p>No Balls: {scoreboard.noBalls}</p>
    </div>
);

export default Scoreboard;