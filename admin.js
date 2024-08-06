let teams = {
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
};

let currentBatsmen = [
    { name: "John Doe", runs: 0 },
    { name: "Jane Smith", runs: 0 }
];

let currentBowler = {
    name: "Mark Taylor",
    oversBowled: 0,
    runsGiven: 0,
    ballsBowled: 0
};

let currentScore = 0;
let totalBalls = 0;
let totalWickets = 0;
let totalWides = 0;
let totalNoBalls = 0;

document.querySelectorAll('.team-button').forEach(button => {
    button.addEventListener('click', function() {
        const teamName = button.getAttribute('data-team');
        displayTeamPlayers(teamName);
    });
});

function displayTeamPlayers(teamName) {
    const playerListElement = document.getElementById('player-list');
    playerListElement.innerHTML = "";

    teams[teamName].forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = player;
        listItem.addEventListener('click', function() {
            selectPlayer(player);
        });
        playerListElement.appendChild(listItem);
    });

    document.querySelector('.team-players').style.display = 'block';
}

function selectPlayer(playerName) {
    const newBatsman = prompt(`Is ${playerName} a new batsman or bowler? (Enter 'batsman' or 'bowler')`);
    if (newBatsman === 'batsman') {
        currentBatsmen.push({ name: playerName, runs: 0 });
        updateBatsmanInfo();
    } else if (newBatsman === 'bowler') {
        currentBowler = {
            name: playerName,
            oversBowled: 0,
            runsGiven: 0,
            ballsBowled: 0
        };
        displayBowlerInfo();
    }
}

// Existing run update function
document.querySelectorAll('.button-run[data-runs]').forEach(button => {
    button.addEventListener('click', function() {
        const runsToAdd = parseInt(button.getAttribute('data-runs'));
        
        // Update score
        currentScore += runsToAdd;
        currentBatsmen[0].runs += runsToAdd;
        currentBowler.runsGiven += runsToAdd;

        // Display updates
        displayScoreboard();
    });
});

// Existing ball update function
document.querySelector('.ball-button').addEventListener('click', function() {
    totalBalls += 1;
    currentBowler.ballsBowled += 1;

    // Update overs and balls count
    let oversCompleted = Math.floor(totalBalls / 6);
    let ballsInOver = totalBalls % 6;

    currentBowler.oversBowled = oversCompleted + ballsInOver / 10; // e.g. 4.3 overs 

    // Display updates
    displayScoreboard();

    // Check if an over is completed 
    if (totalBalls % 6 === 0) {
        changeBowler();
    }
});

// Existing wide update function
document.querySelector('.wide-button').addEventListener('click', function() {
    totalWides += 1;

    // Display updates
    document.getElementById('wide-count').innerText = `Wide: ${totalWides}`;
});

// Existing no-ball update function
document.querySelector('.no-ball-button').addEventListener('click', function() {
    totalNoBalls += 1;

    // Display updates
    document.getElementById('no-ball-count').innerText = `No Balls: ${totalNoBalls}`;
});

// Existing wicket update function
document.querySelector('.wicket-button').addEventListener('click', function() {
    if (totalWickets < currentBatsmen.length) {
        totalWickets += 1;
        alert(`Wicket! ${currentBatsmen[0].name} is out!`);

        // Remove the first batsman
        currentBatsmen.shift();

        // Display player list to select new batsman
        document.querySelector('.team-players').style.display = 'block';
    } else {
        alert("All wickets are down!");
    }

    // Display updates
    displayScoreboard();
    updateBatsmanInfo();
});

// Existing batsmen swap function
document.getElementById('swap-batsman').addEventListener('click', function() {
    [currentBatsmen[0], currentBatsmen[1]] = [currentBatsmen[1], currentBatsmen[0]];
    updateBatsmanInfo();
});

// Existing bowler change function
function changeBowler() {
    const newBowlerName = prompt("Enter the name of the new bowler:");

    if (newBowlerName && newBowlerName.trim() !== "") {
        const previousBowler = currentBowler.name;
        
        // Reset bowler statistics for the new bowler
        currentBowler = {
            name: newBowlerName,
            oversBowled: 0,
            runsGiven: 0,
            ballsBowled: 0
        };
        
        alert(`The new bowler is ${currentBowler.name}. Previous bowler was ${previousBowler}.`);
        displayBowlerInfo();
    }
}

// Existing scoreboard display function
function displayScoreboard() {
    document.getElementById('current-score').innerText = `Total Runs: ${currentScore}`;
    document.getElementById('wickets').innerText = `Wickets: ${totalWickets}`;
    document.getElementById('overs').innerText = `Overs: ${currentBowler.oversBowled.toFixed(1)}`; 
    document.getElementById('batsman1').innerText = `Batsman 1: ${currentBatsmen[0].name} - Runs: ${currentBatsmen[0].runs}`;
    document.getElementById('batsman2').innerText = `Batsman 2: ${currentBatsmen[1].name} - Runs: ${currentBatsmen[1].runs}`;
    displayBowlerInfo();
}

// Existing bowler info display function
function displayBowlerInfo() {
    document.getElementById('current-bowler').innerText = `Bowler: ${currentBowler.name}`;
    document.getElementById('bowler-stats').innerText = `Overs Bowled: ${currentBowler.oversBowled.toFixed(1)} | Runs Given: ${currentBowler.runsGiven} | Balls Bowled: ${currentBowler.ballsBowled}`;
}

// Existing batsman info update function
function updateBatsmanInfo() {
    document.getElementById('batsman1').innerText = `Batsman 1: ${currentBatsmen[0].name} - Runs: ${currentBatsmen[0].runs}`;
    document.getElementById('batsman2').innerText = `Batsman 2: ${currentBatsmen[1].name} - Runs: ${currentBatsmen[1].runs}`;
}

// Initial display
updateBatsmanInfo();
displayBowlerInfo();
