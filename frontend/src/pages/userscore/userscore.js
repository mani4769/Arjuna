import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './userscore.css';
import TeamSelector from './teamselector';
import playerlist from './playerlist';
import Scoreboard from './Scoreboard';
import Batsman from './Batsman';
import Bowler from './Bowler';
import Controls from './Controls';
import TeamDetails from './TeamDetails';
import PlayerList from './playerlist';
import axios from 'axios';

const teamsData = {
    TeamA: { players: ['Player A1', 'Player A2', 'Player A3', 'Player A4', 'Player A5', 'Player A6', 'Player A7', 'Player A8', 'Player A9', 'Player A10', 'Player A11'] },
    TeamB: { players: ['Player B1', 'Player B2', 'Player B3', 'Player B4', 'Player B5', 'Player B6', 'Player B7', 'Player B8', 'Player B9', 'Player B10', 'Player B11'] }
};

const TeamsData = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState({ batsmen: [], bowler: null });
    const [scoreboard, setScoreboard] = useState({ runs: 0, wickets: 0, overs: '0.0', balls: 0, wides: 0, noBalls: 0 });
    const [matchId, setMatchId] = useState(null);

    const updateLocalStorage = (updatedScoreboard, updatedPlayers) => {
        localStorage.setItem('scoreboard', JSON.stringify(updatedScoreboard));
        localStorage.setItem('selectedPlayers', JSON.stringify(updatedPlayers));
    };

    const selectTeam = (team) => {
        setSelectedTeam(team);
    };

    const selectPlayer = (playerName, role) => {
        const playerTeam = selectedTeam;
        const oppositeTeam = 'TeamA' ? 'TeamB' : 'TeamA';
        if (role === 'batsman') {
            // Allow batsman selection from the same team
            if (selectedPlayers.batsmen.length < 2) {
                setSelectedPlayers((prev) => ({
                    ...prev,
                    batsmen: [...prev.batsmen, { name: playerName, runs: 0 }],
                }));
            } else {
                alert('You can only select 2 batsmen.');
            }
        } else if (role === 'bowler') {
        
            // Ensure bowler is selected from the opposite team and only one bowler is selected
            if (teamsData[oppositeTeam].players.includes(playerName)) {
            
                if (!selectedPlayers.bowler) {
                    setSelectedPlayers((prev) => ({
                        ...prev,
                        bowler: playerName,
                    }));
                } else {
                    alert('You can only select one bowler.');
                }
            } else {
                alert("Selected bowler must be from the opposite team.");
            }
        }
    };
    const updateScoreboard = async (runs, isWide = false, isNoBall = false, isWicket = false) => {
        if (selectedPlayers.batsmen.length === 0) {
            alert('Please select at least two batsmen before updating the score.');
            return;
        }

        const newBalls = scoreboard.balls + 1;
        const newOvers = Math.floor(newBalls / 6);
        const remainingBalls = newBalls % 6;
        const updatedOvers = `${newOvers}.${remainingBalls}`;

        const updatedScoreboard = {
            runs: scoreboard.runs + runs,
            balls: newBalls,
            overs: updatedOvers,
            wides: isWide ? scoreboard.wides + 1 : scoreboard.wides,
            noBalls: isNoBall ? scoreboard.noBalls + 1 : scoreboard.noBalls,
            wickets: isWicket ? scoreboard.wickets + 1 : scoreboard.wickets,
            teamA: {
                name: 'TeamA',
                players: selectedPlayers.batsmen.map(b => ({ name: b.name, runs: b.runs })),
                totalRuns: scoreboard.runs,
                wickets: scoreboard.wickets,
            },
            teamB: {
                name: 'TeamB',
                players: teamsData.TeamB.players,
                totalRuns: 0,
                wickets: 0,
            },
        };

        // Store data in local storage
        updateLocalStorage(updatedScoreboard, selectedPlayers);

        setScoreboard(updatedScoreboard);

        if (isWicket) {
            alert(`Wicket! ${selectedPlayers.batsmen[0].name} is out!`);
            setSelectedPlayers(prev => ({
                ...prev,
                batsmen: prev.batsmen.slice(1)
            }));
        } else if (!isWide && !isNoBall) {
            setSelectedPlayers(prev => {
                const updatedBatsmen = [...prev.batsmen];
                updatedBatsmen[0].runs += runs;

                if (runs === 1 || runs === 3) {
                    const temp = updatedBatsmen[0];
                    updatedBatsmen[0] = updatedBatsmen[1];
                    updatedBatsmen[1] = temp;
                }

                return { ...prev, batsmen: updatedBatsmen };
            });
        }

        // Check if an over is completed
        if (newBalls % 6 === 0) {
            alert("Over completed. Please select a new bowler.");
            setSelectedPlayers(prev => ({ ...prev, bowler: null }));

            // Clear bowler data in local storage
            const savedScoreboard = JSON.parse(localStorage.getItem('scoreboard'));
            const savedPlayers = JSON.parse(localStorage.getItem('selectedPlayers'));

            if (savedPlayers) {
                savedPlayers.bowler = null;
                updateLocalStorage(savedScoreboard, savedPlayers);
            }
        }
    };

    const resetApp = () => {
        setSelectedTeam(null);
        setSelectedPlayers({ batsmen: [], bowler: null });
        setScoreboard({ runs: 0, wickets: 0, overs: '0.0', balls: 0, wides: 0, noBalls: 0 });
        setMatchId(null);
        localStorage.clear();
    };

    useEffect(() => {
        const savedScoreboard = localStorage.getItem('scoreboard');
        const savedPlayers = localStorage.getItem('selectedPlayers');

        if (savedScoreboard) {
            setScoreboard(JSON.parse(savedScoreboard));
        }

        if (savedPlayers) {
            setSelectedPlayers(JSON.parse(savedPlayers));
        }
    }, []);

    useEffect(() => {
        const checkServerId = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/score', updateScoreboard);
                const data = await response.json();
                const localServerId = localStorage.getItem('serverId');

                if (localServerId !== data.serverId) {
                    localStorage.clear();
                    localStorage.setItem('serverId', data.serverId);
                }
            } catch (error) {
                console.error('Error fetching server ID:', error);
            }
        };

        checkServerId();
    }, []);

    return (
        
            <div className="app">
                <header>
                    <h1>Live Cricket Score Updates</h1>
                </header>
                {/* <nav>
                    <Link to="/">Home</Link>
                </nav> */}
                
                <TeamSelector teams={Object.keys(teamsData)} onSelectTeam={selectTeam}  />
                
                {selectedTeam && (
                    <>
                        <PlayerList
                            team={teamsData[selectedTeam]}
                            onSelectPlayer={selectPlayer}
                            selectedBatsmen={selectedPlayers.batsmen.map(b => b.name)}
                            selectedBowler={selectedPlayers.bowler}
                        />
                        <TeamDetails team={selectedTeam} teamsData={teamsData} />
                    </>
                )}
                <Scoreboard scoreboard={scoreboard} />
                <Batsman batsmen={selectedPlayers.batsmen} />
                <Bowler bowler={selectedPlayers.bowler} />
                <Controls updateScoreboard={updateScoreboard} />
                <button className="reset-button" onClick={resetApp}>Reset</button>
            </div>
    );
};

export default TeamsData;
