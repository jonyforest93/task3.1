const victoryCondition = require('./victoryCondition');

class Rules {
    constructor(params, playerTurn, computerTurn) {
        this.params = params;
        this.playerTurn = playerTurn;
        this.computerTurn = computerTurn;
        this.winner = this.showWinner();
    }
    showWinner() {
        const result = victoryCondition(this.params, this.playerTurn, this.computerTurn);
        if (result === 'lose') {
            return 'you lose';
        } else if (result === 'win') {
            return 'you win'
        } return 'it\'s draw'
    }
}

module.exports = Rules;

