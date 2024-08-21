import React, { useEffect } from 'react';
import './livescore.css';
import srkr from '../../images/image.png';
import vishnu from '../../images/vishnulogo.jpg';

const LiveScore = () => {
  useEffect(() => {
    const team1ScoreElement = document.getElementById('team1Score');
    const team2RunsGivenElement = document.getElementById('team2RunsGiven');
    const team1OversElement = document.getElementById('team1Overs');
    const team2OversBowledElement = document.getElementById('team2OversBowled');
    const targetElement = document.getElementById('target');
    const runRateElement = document.getElementById('runRate');
    let isSecondInnings = false;
    let targetScore = 120; // Example target score
    const totalOvers = 20;

    function parseScore(scoreString) {
      const [runs, wickets] = scoreString.split('/').map(Number);
      return { runs, wickets };
    }

    function parseOvers(oversString) {
      return parseFloat(oversString.split(': ')[1]);
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(value, max));
    }

    function updateStatistics() {
      const team1Score = parseScore(team1ScoreElement.textContent.split(': ')[1]);
      const team2RunsGiven = parseInt(team2RunsGivenElement.textContent.split(': ')[1]);
      const team1Overs = parseOvers(team1OversElement.textContent);
      const team2Overs = parseOvers(team2OversBowledElement.textContent);

      let team1Performance = 0, team2Performance = 0;
      let currentRunRate = 0;
      let performanceColorA = '#ff5733';
      let performanceColorB = '#33c1ff';

      if (isSecondInnings) {
        const runsScored = team2RunsGiven;
        const targetMet = runsScored >= targetScore;
        const runsToWin = targetScore - runsScored;
        const requiredRunRate = runsToWin / (totalOvers - team2Overs);
        currentRunRate = runsScored / team2Overs;

        if (team2Overs > 0) {
          team2Performance = (currentRunRate / requiredRunRate) * 100;
          team1Performance = 100 - team2Performance;
        }

        if (runsScored >= targetScore) {
          team2Performance = 100;
          team1Performance = 0;
        }

      } else {
        targetElement.textContent = `Target: ${targetScore}`;
        team1Performance = (team1Score.runs / targetScore) * 100;
        team2Performance = 100 - team1Performance;
        currentRunRate = team1Score.runs / team1Overs;
      }

      team1Performance = clamp(team1Performance, 0, 100);
      team2Performance = clamp(team2Performance, 0, 100);

      document.getElementById('chartTooltip').textContent = `Team A: ${Math.round(team1Performance)}% | Team B: ${Math.round(team2Performance)}%`;
      document.getElementById('chart').style.background = `conic-gradient(${performanceColorA} 0% ${team1Performance}%, ${performanceColorB} ${team1Performance}% 100%)`;
      runRateElement.textContent = `Current Run Rate: ${currentRunRate.toFixed(2)}`;
    }

    function handleScoreChange() {
      if (!isSecondInnings) {
        const team1Score = parseScore(team1ScoreElement.textContent.split(': ')[1]);
        if (team1Score.overs >= totalOvers) {
          isSecondInnings = true;
          targetScore = team1Score.runs;
          targetElement.textContent = `Target: ${targetScore}`;
          runRateElement.textContent = `Required Run Rate: ${(targetScore / totalOvers).toFixed(2)}`;
        }
      }

      updateStatistics();
    }

    team1ScoreElement.addEventListener('DOMSubtreeModified', handleScoreChange);
    team2RunsGivenElement.addEventListener('DOMSubtreeModified', handleScoreChange);
    team1OversElement.addEventListener('DOMSubtreeModified', handleScoreChange);
    team2OversBowledElement.addEventListener('DOMSubtreeModified', handleScoreChange);

    updateStatistics();
  }, []);

  return (
    <div>
      <header>
        <h1>SRKR Live Score</h1>
      </header>
      <main>
        <section className="teams">
          <div className="team batting">
            <img className="team-logo" src={srkr} alt="Team A Logo" />
            <div className="team-details">
              <p id="team1Score">Team A: 20/0</p>
              <p id="team1Overs">Overs: 1.0</p>
            </div>
          </div>
          <div className="run-rate-container">
            <div className="target-run-rate" id="runRate">Current Run Rate: 0.00</div>
          </div>
          <div className="team bowling">
            <img className="team-logo" src={vishnu} alt="Team B Logo" />
            <div className="team-details">
              <p id="team2RunsGiven">Runs Given: 20</p>
              <p id="team2OversBowled">Overs Bowled: 1.0</p>
            </div>
          </div>
        </section>
      
      </main>
      <section className="live-statistics">
          <div className="chart-container">
            <div className="chart" id="chart">
              <div className="chart-tooltip" id="chartTooltip"></div>
            </div>
          </div>
          <h3 id="target">Target: 0</h3>
        </section>
    </div>
  );
};

export default LiveScore;
