import React from 'react';

const Batsman = ({ batsmen }) => {
    return (
        <div className="batsman">
            <h2>Selected Batsmen</h2>
            <ul>
                {batsmen.length > 0 ? (
                    batsmen.map((batsman, index) => (
                        <li key={index}>
                            {batsman.name} (Runs: {batsman.runs})
                        </li>
                    ))
                ) : (
                    <li>No batsmen selected</li>
                )}
            </ul>
        </div>
    );
};

export default Batsman;
