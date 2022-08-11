// Prompt-sync allows this to run from bash terminal in vscode.
const prompt = require('prompt-sync')();

// Generates random number between 0-2 and converts it to a string.
function getComputerChoice() {
    computerchoice = Math.floor(Math.random() * 3);
    switch (computerchoice) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }

}
// Takes input, converts it to lowercase, and checks for correctness.
function getUserChoice() {
    userchoice = prompt('Throw your hand: ').toLowerCase();
    if (userchoice != 'rock' && userchoice != 'paper' && userchoice != 'scissors') {
        throw new Error('You must pick rock, paper, or scissors');
    }
    return userchoice;

}
// Calls functions, prints throws, and performs game logic. Does not require default due to santizied inputs.
function playRound(playerSelection, computerSelection) {
    computerchoice = getComputerChoice();
    userchoice = getUserChoice();
    console.log('The computer picked:', computerchoice);
    console.log('The human picked:', userchoice);
    switch (computerchoice) {
        case 'rock':
            switch (userchoice) {
                case 'rock':
                    return "Tie Game.";
                case "paper": 
                    return "User Wins.";
                case "scissors": 
                    return "Computer Wins." ;
            };
        case 'paper':
            switch (userchoice) {
                case "rock":
                    return "Computer Wins.";
                case "paper": 
                    return "Tie Game.";
                case "scissors": 
                    return "User Wins.";  
            };
            case 'scissors':
                switch (userchoice) {
                    case 'rock':
                        return 'User wins.';
                    case 'paper': 
                        return 'Computer wins';
                    case 'scissors': 
                        return 'Tie Game.';  
                };
        };


}
console.log(playRound());


