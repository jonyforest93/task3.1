const victoryCondition = require('./victoryCondition');
class Help {
    constructor(params) {
        this.params = params;
        this.help = this.printTable();
    }

    getLongestParam(array) {
        this.params.unshift('vPC/User>');
        let longestString = "";
        for (let i = 0; i < this.params.length; i++) {
            if (typeof array[i] === "string" && array[i].length > longestString.length) {
                longestString = array[i];
            }
        }
        this.params.shift();
        return longestString.length;
    }

    calcRowLength() {
        const amountSymbol = 4;
        let rowLength;
        rowLength = parseInt(this.getLongestParam(this.params) + amountSymbol);
        return rowLength;
    }

    getTemplateRows(string) {
        const paramLength = string.length;
        let symbolCount = (this.calcRowLength() - paramLength - 2) / 2;
        let space = ' '.repeat(symbolCount);
        let template;
        template = '|' + space + string + space + '|';
        return template;
    }

    getAllStringLength(param) {
        let result = 0;
        param.forEach(el => {
            result += this.calcRowLength();
        })
        result += this.calcRowLength();
        return result;
    }

    printRow() {
        let row = '';
        this.params.unshift('vPC/User>');
        for (let i = 0; i < this.params.length; i++) {
            row += this.getTemplateRows(this.params[i]);
        }
        this.params.shift();
        return row;
    }

    printTable() {
        console.log('-'.repeat(this.getAllStringLength(this.params)));
        console.log(this.printRow());
        console.log('-'.repeat(this.getAllStringLength(this.params)));
        for (let i = 0; i < this.params.length; i++) {
            let result = this.getTemplateRows(this.params[i]);
            for (let j = 0; j < this.params.length; j++) {
                result += this.getTemplateRows(victoryCondition(this.params, i, j));
            }
            console.log(result);
            console.log('-'.repeat(this.getAllStringLength(this.params)));
        }
    }
}

module.exports = Help;
