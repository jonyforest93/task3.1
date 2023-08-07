const Game = require('./Game');

if (process.argv.length <= 3 || process.argv.length % 2 === 0) {
    console.log('Enter an odd number of parameters for the game.');
    console.log('Usage example: node index.js Rock Paper Scissors');
    process.exit(1);
}

const params = process.argv.slice(2);
const game = new Game(params);
game.play();