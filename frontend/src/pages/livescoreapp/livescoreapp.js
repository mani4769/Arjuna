import React, { useState } from 'react';
import './livescoreapp.css';

const LiveCricketScore = () => {
    const [teams] = useState({
        "Team A": [
            "Player A1", "Player A2", "Player A3", "Player A4", "Player A5", 
            "Player A6", "Player A7", "Player A8", "Player A9", "Player A10", 
            "Player A11", "Player A12", "Player A13", "Player A14", "Player A15"
        ],
        "Team B": [
            "Player B1", "Player B2", "Player B3", "Player B4", "Player B5", 
            "Player B6", "Player B7", "Player B8", "Player B9", "Player B10", 
            "Player B11", "Player B12", "Player B13", "Player B14", "Player B15"
        ]
    });

    const [currentBatsmen, setCurrentBatsmen] = useState([
        { name: "SELECT batsman from team A", runs: 0, balls: 0 },
        { name: "SELECT batsman from team A", runs: 0, balls: 0 }
    ]);

    const [currentBowler, setCurrentBowler] = useState({
        name: "SELECT bowler from team B",
        oversBowled: 0,
        runsGiven: 0,
        ballsBowled: 0,
        wicketsTaken: 0
    });

    const [batsmenStats, setBatsmenStats] = useState({});
    const [bowlersStats, setBowlersStats] = useState({});
    const [outPlayers, setOutPlayers] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [totalBalls, setTotalBalls] = useState(0);
    const [totalWickets, setTotalWickets] = useState(0);
    const [totalWides, setTotalWides] = useState(0);
    const [totalNoBalls, setTotalNoBalls] = useState(0);
    const [showTeamPlayers, setShowTeamPlayers] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const displayTeamPlayers = (teamName) => {
        setSelectedTeam(teamName);
        setShowTeamPlayers(true);
    };

    const selectPlayer = (playerName) => {
        if (selectedTeam === "Team A") {
            // Update previous batsman stats before setting new batsman
            const previousBatsman = currentBatsmen[0].name;
            if (previousBatsman !== "SELECT batsman from team A") {
                setBatsmenStats(prevStats => ({
                    ...prevStats,
                    [previousBatsman]: {
                        runs: currentBatsmen[0].runs,
                        balls: currentBatsmen[0].balls
                    }
                }));
            }

            // Set the new batsman
            setCurrentBatsmen(prevBatsmen => [
                {
                    name: playerName,
                    runs: batsmenStats[playerName]?.runs || 0,
                    balls: batsmenStats[playerName]?.balls || 0
                },
                ...prevBatsmen.slice(0, 1)
            ]);
        } else if (selectedTeam === "Team B") {
            // Update previous bowler stats before setting new bowler
            const previousBowler = currentBowler.name;
            if (previousBowler !== "SELECT bowler from team B") {
                setBowlersStats(prevStats => ({
                    ...prevStats,
                    [previousBowler]: {
                        oversBowled: currentBowler.oversBowled,
                        runsGiven: currentBowler.runsGiven,
                        ballsBowled: currentBowler.ballsBowled,
                        wicketsTaken: currentBowler.wicketsTaken
                    }
                }));
            }

            // Set the new bowler
            setCurrentBowler({
                name: playerName,
                oversBowled: bowlersStats[playerName]?.oversBowled || 0,
                runsGiven: bowlersStats[playerName]?.runsGiven || 0,
                ballsBowled: bowlersStats[playerName]?.ballsBowled || 0,
                wicketsTaken: bowlersStats[playerName]?.wicketsTaken || 0
            });
        }
        setShowTeamPlayers(false);
    };

    const updateBatsmanStats = (batsman, runsToAdd) => {
        const updatedStats = { ...batsmenStats };
        if (updatedStats[batsman]) {
            updatedStats[batsman].runs += runsToAdd;
            updatedStats[batsman].balls += 1;
        } else {
            updatedStats[batsman] = { runs: runsToAdd, balls: 1 };
        }
        setBatsmenStats(updatedStats);
    };

    const updateBowlerStats = (runsToAdd) => {
        const updatedBowler = {
            ...currentBowler,
            runsGiven: currentBowler.runsGiven + runsToAdd,
            ballsBowled: currentBowler.ballsBowled + 1
        };
        setCurrentBowler(updatedBowler);
        setBowlersStats(prevStats => ({
            ...prevStats,
            [updatedBowler.name]: updatedBowler
        }));
    };

    const handleRunClick = (runsToAdd) => {
        const updatedScore = currentScore + runsToAdd;
        const updatedBatsmen = [...currentBatsmen];
        updatedBatsmen[0].runs += runsToAdd;
        updatedBatsmen[0].balls += 1;

        setCurrentScore(updatedScore);
        setTotalBalls(prevBalls => prevBalls + 1);
        setCurrentBatsmen(updatedBatsmen);
        updateBatsmanStats(updatedBatsmen[0].name, runsToAdd);
        updateBowlerStats(runsToAdd);

        setHistory(prevHistory => [...prevHistory, { type: 'run', runs: runsToAdd }]);
        setRedoStack([]);

        checkOverChange(currentBowler.ballsBowled + 1);
    };

    const handleWideClick = (runsToAdd = 1) => {
        setTotalWides(prevWides => prevWides + 1);
        setCurrentScore(prevScore => prevScore + runsToAdd);
        updateBowlerStats(runsToAdd);

        setHistory(prevHistory => [...prevHistory, { type: 'wide', runs: runsToAdd }]);
        setRedoStack([]);
    };

    const handleNoBallClick = () => {
        setTotalNoBalls(prevNoBalls => prevNoBalls + 1);
        setCurrentScore(prevScore => prevScore + 1);
        updateBowlerStats(1);

        setHistory(prevHistory => [...prevHistory, { type: 'no-ball' }]);
        setRedoStack([]);
    };

    const handleWicketClick = () => {
        setTotalWickets(prevWickets => prevWickets + 1);
        const updatedBowler = {
            ...currentBowler,
            wicketsTaken: currentBowler.wicketsTaken + 1
        };
        setCurrentBowler(updatedBowler);
        setBowlersStats(prevStats => ({
            ...prevStats,
            [updatedBowler.name]: updatedBowler
        }));

        setHistory(prevHistory => [...prevHistory, { type: 'wicket' }]);
        setRedoStack([]);
        alert("Select the next batsman");
        setShowTeamPlayers(true);
    };

    const swapBatsmen = () => {
        setCurrentBatsmen([currentBatsmen[1], currentBatsmen[0]]);
    };

    const checkOverChange = (ballsBowled) => {
        if (ballsBowled % 6 === 0) {
            alert("Over completed. Please select a new bowler.");
            setShowTeamPlayers(true);
        }
    };

    const undoLastAction = () => {
        const lastAction = history.pop();
        if (!lastAction) return;

        switch (lastAction.type) {
            case 'run':
                setCurrentScore(prevScore => prevScore - lastAction.runs);
                setTotalBalls(prevBalls => prevBalls - 1);
                setCurrentBatsmen(prevBatsmen => {
                    const updatedBatsmen = [...prevBatsmen];
                    updatedBatsmen[0].runs -= lastAction.runs;
                    updatedBatsmen[0].balls -= 1;
                    return updatedBatsmen;
                });
                setCurrentBowler(prevBowler => ({
                    ...prevBowler,
                    runsGiven: prevBowler.runsGiven - lastAction.runs
                }));
                break;
            case 'wide':
                setTotalWides(prevWides => prevWides - 1);
                setCurrentScore(prevScore => prevScore - lastAction.runs);
                setCurrentBowler(prevBowler => ({
                    ...prevBowler,
                    runsGiven: prevBowler.runsGiven - lastAction.runs
                }));
                break;
            case 'no-ball':
                setTotalNoBalls(prevNoBalls => prevNoBalls - 1);
                setCurrentScore(prevScore => prevScore - 1);
                setCurrentBowler(prevBowler => ({
                    ...prevBowler,
                    runsGiven: prevBowler.runsGiven - 1
                }));
                break;
            case 'wicket':
                setTotalWickets(prevWickets => prevWickets - 1);
                setCurrentBowler(prevBowler => ({
                    ...prevBowler,
                    wicketsTaken: prevBowler.wicketsTaken - 1
                }));
                break;
            default:
                break;
        }
        setHistory(prevHistory => prevHistory.slice(0, -1));
        setRedoStack([...redoStack, lastAction]);
    };

    const redoLastAction = () => {
        const lastRedo = redoStack.pop();
        if (!lastRedo) return;

        switch (lastRedo.type) {
            case 'run':
                handleRunClick(lastRedo.runs);
                break;
            case 'wide':
                handleWideClick(lastRedo.runs);
                break;
            case 'no-ball':
                handleNoBallClick();
                break;
            case 'wicket':
                handleWicketClick();
                break;
            default:
                break;
        }
        setRedoStack(redoStack);
    };

    return (
        <div className="live-score-app">
            <div className="team-selector">
                <button onClick={() => displayTeamPlayers("Team A")}>Select Batsman from Team A</button>
                <button onClick={() => displayTeamPlayers("Team B")}>Select Bowler from Team B</button>
            </div>
            {showTeamPlayers && (
                <div className="player-selection">
                    <h2>{selectedTeam}</h2>
                    <ul>
                        {teams[selectedTeam].map(player => (
                            <li key={player} onClick={() => selectPlayer(player)}>{player}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="current-stats">
                <h2>Current Batsmen</h2>
                <p>Batsman 1: {currentBatsmen[0].name} - Runs: {currentBatsmen[0].runs} - Balls: {currentBatsmen[0].balls}</p>
                <p>Batsman 2: {currentBatsmen[1].name} - Runs: {currentBatsmen[1].runs} - Balls: {currentBatsmen[1].balls}</p>
                <h2>Current Bowler</h2>
                <p>Bowler: {currentBowler.name} - Overs: {currentBowler.oversBowled} - Runs Given: {currentBowler.runsGiven} - Balls: {currentBowler.ballsBowled} - Wickets: {currentBowler.wicketsTaken}</p>
            </div>
            <div className="score-controls">
                <button onClick={() => handleRunClick(1)}>Add 1 Run</button>
                <button onClick={() => handleRunClick(2)}>Add 2 Runs</button>
                <button onClick={() => handleRunClick(3)}>Add 3 Runs</button>
                <button onClick={() => handleRunClick(4)}>Add 4 Runs</button>
                <button onClick={() => handleRunClick(6)}>Add 6 Runs</button>
                <button onClick={handleWideClick}>Add Wide</button>
                <button onClick={handleNoBallClick}>Add No Ball</button>
                <button onClick={handleWicketClick}>Add Wicket</button>
                <button onClick={swapBatsmen}>Swap Batsmen</button>
            </div>
            <div className="undo-redo">
                <button onClick={undoLastAction}>Undo</button>
                <button onClick={redoLastAction}>Redo</button>
            </div>
            <div className="score-summary">
                <h2>Score Summary</h2>
                <p>Current Score: {currentScore}</p>
                <p>Total Balls: {totalBalls}</p>
                <p>Total Wickets: {totalWickets}</p>
                <p>Total Wides: {totalWides}</p>
                <p>Total No Balls: {totalNoBalls}</p>
            </div>
        </div>
    );
};

export default LiveCricketScore;
