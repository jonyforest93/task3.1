const victoryCondition = (params, playerTurn, computerTurn) => {
    const halfValue = (params.length - 1) / 2;

    if (playerTurn == computerTurn) {
        return 'draw';
    } else if ((playerTurn - computerTurn) < 0) {
        if (computerTurn - playerTurn <= halfValue) {
            return 'win';
        } else return 'lose';
    } else if (playerTurn - computerTurn <= halfValue) {
        return 'lose';
    } else return  'win';
}

module.exports = victoryCondition;

