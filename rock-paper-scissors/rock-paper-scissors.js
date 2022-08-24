startGame();

// Some fun tricks to make a single page app fit nicely on a mobile device.
// Safari hides portions of the page underneath the navigation bars otherwise.
document.querySelector('meta[name="viewport"]').setAttribute('height',  window.innerHeight + 'px');
;

// Creates buttons and disables after click to prevent multiple entries.
const buttons = document.querySelectorAll('button');
buttons.forEach((b) => {
    b.addEventListener('click', function(){ 
        startRound(this.id);
        buttons.forEach((b) => {
            b.disabled = true;
            setTimeout( function() {
                b.disabled = false;
            }, 4000);
        });
    });
});

// Sets up for a new game.
function startGame() {
    // Removes EL as a debounce.
    document.body.removeEventListener('click', startGame);
    // Removes old winners screen.
    var rE = document.getElementById('endImage');
    if (rE != null) {
        rE.remove();
    }
    // Set round tracker to base settings.
    score = [];
    // Resets score board.
    for (var n = 5; n > 0; n--) {
        const update = document.getElementById('score' + n);
        update.textContent = n;
        update.style.color = 'white';
        update.style.backgroundColor = '#3266CC'
    };
    // Fades in main page from end screen or fresh load.
    document.body.classList.add('blackoutReverse');
    setTimeout( function() {
        document.body.classList.remove('blackoutReverse');
    }, 500);
    document.getElementById('main').style.display = 'flex';
    document.getElementById('end').style.display = 'none';
}

// Calls functions, prints throws, and performs game logic. 
function startRound(playerSelection) {
    // Get computer hand.
    computerSelection = getcomputerSelection();
    // Reroll computer hand on tie.
    while (computerSelection == playerSelection) {
        computerSelection = getcomputerSelection();
    }
    // Switch statements do not require default due to santizied inputs.
    switch (computerSelection) {
        case 'rock':
            switch (playerSelection) {
                case 'paper':
                    soundSelector(playerSelection, computerSelection, 'player');
                    postRound(playerSelection, computerSelection, 'player', 'computer', 'paper');
                    score.push('0');
                    return;
                case 'scissors':
                    soundSelector(playerSelection, computerSelection, 'computer');
                    postRound(playerSelection, computerSelection, 'computer', 'player', 'rock');
                    score.push('1');
                    return;
            };
            return;
        case 'paper':
            switch (playerSelection) {
                case 'rock':
                    soundSelector(playerSelection, computerSelection, 'computer');
                    postRound(playerSelection, computerSelection, 'computer', 'paper');
                    score.push('1');
                    return;
                case 'scissors':
                    soundSelector(playerSelection, computerSelection, 'player');
                    postRound(playerSelection, computerSelection, 'player', 'scissors');
                    score.push('0');
                    return;
            };
            return;
        case 'scissors':
            switch (playerSelection) {
                case 'rock':
                    soundSelector(playerSelection, computerSelection, 'player');
                    postRound(playerSelection, computerSelection, 'player', 'rock');
                    score.push('0');
                    return;
                case 'paper':
                    soundSelector(playerSelection, computerSelection, 'computer');
                    postRound(playerSelection, computerSelection, 'computer', 'scissors');
                    score.push('1');
                    return;
            };
            return;
        };
}
// Generates random number between 0-2 and converts it to a string.
function getcomputerSelection() {
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

// Determines what sounds to play and when.
function soundSelector(playerHand, computerHand, winner) {
    playSound(playerHand, '0');
    playSound(computerHand, '500');
    if (winner == 'player') {
        playSound(playerHand + '-beats-' + computerHand, '2200');
    } else {
        playSound(computerHand + '-beats-' + playerHand, '2200');
    }
}

// Because we love sound.
function playSound(roundSound, time) {
    var sound = new Audio('sounds/' + roundSound + '.mp3');
    setTimeout( function() {
        sound.play(sound);
        setTimeout( function() {
            sound.pause();
        }, 2500);
    }, time);
}

// Sets post round screen and navigates to next round or end game.
function postRound(player, computer, winner, winningHand)
{
    // Updates post round screen.
    updateImage(player, computer, winner);
    if (winner == 'player') {
        document.getElementById('topText').textContent = 'You';
        document.getElementById('bottomText').textContent = 'Win!';
        document.getElementById('post').style.borderColor = '#3266CC';
    } else {
        document.getElementById('topText').textContent = 'computer';
        document.getElementById('bottomText').textContent = 'Wins!';
        document.getElementById('post').style.borderColor = '#DE251E';
    }
    // Updates scoreboard.
    setTimeout(() => { 
        const update = document.querySelectorAll('#score' + score.length);
        update.forEach((n) => {
            n.textContent = winningHand;
            if (winner == 'player') { 
                n.style.backgroundColor = 'white';
                n.style.color = 'black';
            } else {
                n.style.color = 'white';
                n.style.backgroundColor = '#DE251E';
            }   
        })
    }, 2000);
    // Transition effect between main screen and post round screen.
    document.body.classList.add('blackout');
    setTimeout( function() {
        document.body.classList.remove('blackout');
        document.getElementById('main').style.display = 'none';
        document.getElementById('post').style.display = 'flex';
        // Checks if game is over and calls endGame function if true.
        if (score.filter(x => x == 0).length == 3) {
            setTimeout(() => { endGame('you') }, 2500);
        } else if (score.filter(x => x == 1).length == 3) {
            setTimeout(() => { endGame('computer') }, 2500);
        } else {
            setTimeout( function() {
                document.getElementById('main').style.display = 'flex';
                document.getElementById('post').style.display = 'none';
                        }, 2500);
        }
    }, 2500);
}

// Dynamically inserts round hands into post round screen.
function updateImage(player, computer, winner) {
    const postImages = document.createElement('div');
    postImages.setAttribute('id', 'postImages');
    // Creates nested function to reduce repitition.
    function addImage(p) {
        var image = document.createElement('img');
        image.src = 'images/' + p + '.png';
        postImages.append(image);
    }
    if (winner == 'player') {
        addImage(player);
        // Have to append P tag to center with flexbox.
        // rather than just appending text!
        let p = document.createElement('p')
        p.append('>')
        postImages.append(p);
        addImage(computer);
    } else {
        addImage(computer);
        let p = document.createElement('p')
        p.append('>')
        postImages.append(p);
        addImage(player);
    }
    // After images and '>' are laid out this attaches it below topText div.
    document.getElementById('topText').insertAdjacentElement('afterend', postImages);
    setTimeout( function() { 
        document.getElementById('postImages').remove();
        postImages.remove();
    }, 5000);
}

// Sets end game screen and primes for next game.
function endGame(winner) {
    document.getElementById('post').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('end').style.display = 'flex';
    document.getElementById('end').style.background = '#3266CC';
    document.getElementById('winnerMessage').style.color = '#ffffff';
    if (winner == 'you') {
        document.getElementById('end').style.border = '2vh solid #ffffff';
        document.getElementById('winnerMessage').textContent = 'You win!';
        var image = document.createElement('img');
        image.src = 'images/' + 'youwin' + '.png';
    } else {
        document.getElementById('end').style.border = '2vh solid #DE251E';
        document.getElementById('winnerMessage').textContent = 'computer wins!';
        var image = document.createElement('img');
        image.src = 'images/' + 'youlose' + '.png';
    }
    image.setAttribute('id','endImage');
    document.getElementById('end').insertAdjacentElement('afterbegin', image);
    // Wait for click to restart.
    document.body.addEventListener('click', startGame);
}

