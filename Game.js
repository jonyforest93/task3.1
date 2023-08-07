const readline = require('readline-sync');
const lodash = require('lodash');

const KeyGenerator = require('./KeyGenerator');
const HMACGenerator = require('./HMACGenerator');
const RulesTable = require('./RulesTable');
const Help = require('./HelpGenerator');

class Game {
    constructor(params) {
        if (params.length % 2 === 0) {
            throw new Error('Число параметров должно быть нечетным!');
        }
        this.params = params;
        this.key = KeyGenerator.generateKey();
        this.hmacGenerator = new HMACGenerator(this.key);
    }
    play () {
        let computerMove = this.getComputerTurn();
        console.log('HMAC:', this.hmacGenerator.generateHMAC(this.key, computerMove));
        console.log('Choose your move:');
        this.showMenu();
        let playerMove = this.getValidInput();

        if (playerMove === -1) {
            return
        } else if (playerMove === 'help') {
            this.showHelp();
            playerMove = this.getValidInput();
        }
        while (playerMove === 'error') {
            this.showMenu();
            playerMove = this.getValidInput();
        }
            let winner = new RulesTable(this.params, playerMove, computerMove);
            console.log(winner.winner);
            console.log('Computer move: ', this.params[computerMove]);
            console.log('Secret key:', this.key);
    };
    getComputerTurn () {
        const array = this.params;
        const randomElement = lodash.sample(array);
        return array.indexOf(randomElement);
    }

    showHelp() {
        console.log('this table shows the options for the user to win against the computer');
        const help = new Help(this.params);
        help.help();
    }

    showMenu() {
        console.log('Menu:');
        this.params.forEach((param, index) => {
            console.log(`${index + 1} - ${param}`);
        });
        console.log('help - Help');
        console.log('0 - Exit');
    }
    getValidInput() {
        const input = readline.question('Your choice: ');
        if (!isNaN(input) && input >= 0 && input <= this.params.length) {
            return parseInt(input) - 1;
        } else if (input === 'help') {
            return 'help';
        } else return 'error'
    }
}

module.exports = Game;