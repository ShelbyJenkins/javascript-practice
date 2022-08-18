score = [];

// deploy buttons for main view
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
    // updates post round screen
    updateImage(player, computer, winner);
    if (winner == 'Player') {
        document.getElementById('topText').textContent = 'You';
        document.getElementById('bottomText').textContent = 'Win!';
        document.getElementById('post').style.borderColor = '#3266CC';
    } else {
        document.getElementById('topText').textContent = 'Computer';
        document.getElementById('bottomText').textContent = 'Wins!';
        document.getElementById('post').style.borderColor = '#DE251E';
    }
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
    // adds transition effect between main screen and post round screen
    document.body.classList.add('blackout');
    setTimeout( function() {
        document.body.classList.remove('blackout');
        document.getElementById('main').style.display = 'none';
        document.getElementById('post').style.display = 'flex';
        // game logic. end game on winner or continue
        if (score.filter(x => x == 0).length == 3) {
            setTimeout(() => { endGame('You') }, 2500);
        } else if (score.filter(x => x == 1).length == 3) {
            setTimeout(() => { endGame('Computer') }, 2500);
        } else {
            setTimeout( function() {
                document.getElementById('main').style.display = 'flex';
                document.getElementById('post').style.display = 'none';
            }, 2500);
        }
    }, 2500);
}

// dynamically inserts round hands into post round screen
function updateImage(player, computer, winner) {
    // create function to reduce repitition
    const postImages = document.createElement('div');
    postImages.setAttribute('id', 'postImages');
    function addImage(p) {
        var image = document.createElement("img");
        image.src = 'images/' + p + '.png';
        postImages.append(image);
    }
    if (winner == 'Player') {
        addImage(player);
        // have to append P tag to center with flexbox
        // rather than just appending text!
        let p = document.createElement("p")
        p.append('>')
        postImages.append(p);
        addImage(computer);
    } else {
        addImage(computer);
        let p = document.createElement("p")
        p.append('>')
        postImages.append(p);
        addImage(player);
    }
    document.getElementById('topText').insertAdjacentElement('afterend', postImages);
    setTimeout( function() { 
        document.getElementById('postImages').remove();
        postImages.remove();
    }, 5000);
}

// sets up end game screen
function endGame(winner) {
    document.getElementById('post').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('end').style.display = 'flex';
    if (winner == 'You') {
        document.getElementById('winnerMessage').style.background = '#DE251E';
        document.getElementById('winnerMessage').style.border = '2vh solid #ffffff';
        document.getElementById('winnerMessage').textContent = 'You win!';
    } else {
        document.getElementById('winnerMessage').style.background = '#3266CC';
        document.getElementById('winnerMessage').style.border = '2vh solid #DE251E';
        document.getElementById('winnerMessage').style.color = '#ffffff';
        document.getElementById('winnerMessage').textContent = 'Computer wins!';
    }
    // wait for click to restart
    document.body.addEventListener('click', startGame);
}