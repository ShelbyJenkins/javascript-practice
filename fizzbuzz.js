// Prompt-sync allows this to run from bash terminal in vscode.
const prompt = require("prompt-sync")({ sigint: true });

n = prompt('Pick a number between 0 and ∞: ');

// error checking is fun
if (Number.isFinite(n) == false) {
    throw new Error('Error: number too big or not a number!');
}

for(let i = 0; i < n; i++) {
    if ((i % 3 == 0) && (i % 5 == 0)) {
        console.log('fizzbuzz');
    } else if (i % 3 == 0) {
        console.log('fizz');
    } else if (i % 5 == 0) {
        console.log('buzz');
    } else {
        console.log(i);
    }
}