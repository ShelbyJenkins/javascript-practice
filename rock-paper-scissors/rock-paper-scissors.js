score = [];
const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', (b) => {
    startRound(b.target.id);
    });
});
startGame();

// sets up for a new game
function startGame() {
    document.body.removeEventListener('click', startGame);
    // set round tracker to base settings
    score = [];
    for (var n = 5; n > 0; n--) {
        const update = document.getElementById('score' + n);
        update.textContent = n;
        update.style.color = 'white';
        update.style.backgroundColor = '#3266CC'
    };
    document.body.classList.add('blackoutReverse');
    setTimeout( function() {
        document.body.classList.remove('blackoutReverse');
    }, 500);
    document.getElementById('main').style.display = 'flex';
    document.getElementById('end').style.display = 'none';
}

// Calls functions, prints throws, and performs game logic. 
function startRound(playerSelection) {
    computerSelection = getComputerSelection();
    // reroll computer hand on tie
    while (computerSelection == playerSelection) {
        computerSelection = getComputerSelection();
    }
    // Switch statements do not require default due to santizied inputs.
    switch (computerSelection) {
        case 'rock':
            playSound('rock', '500');
            switch (playerSelection) {
                case 'paper':
                    playSound('paper', '0');
                    playSound('paper-beats-rock', '2200');
                    postRound(playerSelection, computerSelection, 'Player', 'Computer', 'paper');
                    score.push('0');
                    return;
                case 'scissors':
                    playSound('scissors', '0');
                    playSound('rock-beats-scissors', '2200');
                    postRound(playerSelection, computerSelection, 'Computer', 'Player', 'rock');
                    score.push('1');
                    return;
            };
            return;
        case 'paper':
            playSound('paper', '500');
            switch (playerSelection) {
                case 'rock':
                    playSound('rock', '0');
                    playSound('paper-beats-rock', '2200');
                    postRound(playerSelection, computerSelection, 'Computer', 'Player', 'paper');
                    score.push('1');
                    return;
                case 'scissors':
                    playSound('scissors', '0');
                    playSound('scissors-beats-paper', '1500');
                    postRound(playerSelection, computerSelection, 'Player', 'Computer', 'scissors');
                    score.push('0');
                    return;
            };
            return;
        case 'scissors':
            playSound('scissors', '500');
            switch (playerSelection) {
                case 'rock':
                    playSound('rock', '0');
                    playSound('rock-beats-scissors', '2200');
                    postRound(playerSelection, computerSelection, 'Player', 'Computer', 'rock');
                    score.push('0');
                    return;
                case 'paper':
                    playSound('paper', '0');
                    playSound('scissors-beats-paper', '1500');
                    postRound(playerSelection, computerSelection, 'Computer', 'Player', 'scissors');
                    score.push('1');
                    return;
            };
            return;
        };
}
// Generates random number between 0-2 and converts it to a string.
function getComputerSelection() {
    computerSelection = Math.floor(Math.random() * 3);
    switch (computerSelection) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}
// Because sound
function playSound(roundSound, time) {
    var sound = new Audio('sounds/' + roundSound + '.mp3');
    setTimeout( function() {
        sound.play();
        setTimeout( function() {
            sound.pause();
        }, 2500);
    }, time);
}

// Sets post round screen and navigates to next round or end game
function postRound(player, computer, winner, loser, winningHand)
{
    updateImage(player, computer);
    document.getElementById('status' + winner).textContent = 'Wins';
    document.getElementById('post' + winner).style.borderColor = '#3266CC';
    document.getElementById('post' + loser).style.borderColor = '#DE251E';
    document.getElementById('status' + loser).textContent = 'Loses';
    setTimeout(() => { 
        const update = document.querySelectorAll('#score' + score.length);
        update.forEach((n) => {
            n.textContent = winningHand;
            if (winner == 'Player') { 
                n.style.backgroundColor = 'white';
                n.style.color = 'black';
            } else {
                n.style.color = 'white';
                n.style.backgroundColor = '#DE251E';
            }   
        })
    }, 2000);
    document.body.classList.add('blackout');
    setTimeout( function() {
        document.body.classList.remove('blackout');
        document.getElementById('main').style.display = 'none';
        document.getElementById('post').style.display = 'flex'
        // end game on winner or continue
        if (score.filter(x => x == 0).length == 3) {
            endGame('You');
        } else if (score.filter(x => x == 1).length == 3) {
            endGame('Computer');
        } else {
            setTimeout( function() {
                document.getElementById('main').style.display = 'flex';
                document.getElementById('post').style.display = 'none'
            }, 2500);
        }
    }, 2500);
    console.log(score.length);
}

function updateImage(player, computer) {
    var playerImage = document.createElement("img");
    playerImage.src = 'images/' + player + '.png';
    document.getElementById('player').appendChild(playerImage);
    var computerImage = document.createElement("img");
    computerImage.src = 'images/' + computer + '.png';
    document.getElementById('computer').appendChild(computerImage);
    setTimeout(() => { document.getElementById('computer').removeChild(computerImage) }, 6000);
    setTimeout(() => { document.getElementById('player').removeChild(playerImage) }, 6000);
}


function endGame(winner) {
    document.getElementById('post').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('end').style.display = 'flex';
    if (winner == 'You') {
        document.getElementById('winnerMessage').style.background = '#ffffff';
        document.getElementById('winnerMessage').style.border = '2vh solid #DE251E';
        document.getElementById('winnerMessage').textContent = 'You win!';
    } else {
        document.getElementById('winnerMessage').style.background = '#DE251E';
        document.getElementById('winnerMessage').style.border = '2vh solid #ffffff';
        document.getElementById('winnerMessage').textContent = 'Computer wins!';
    }
    // wait for click to restart
    document.body.addEventListener('click', startGame);
}