var Cell = require("./core/Cell.js");
var Board = require("./core/Board.js");

module.exports = BoardConsumer;

function BoardConsumer(width, height, maxValue, bonusCondition){
    this.__board = new Board(width, height);
    this.bonusCondition = bonusCondition;
    this._generate(maxValue);
}

/**
 * Set value to even cell in board
 * @param maxValue {Number}
 * @private
 */
BoardConsumer.prototype._generate = function(maxValue){
    var i, count, cell;
    count = this.__board.width * this.__board.height;
    for(i = 0; i < count; ++i){
        cell = this.__board.at(i);
        cell.setValue(Math.floor(Math.random() * (maxValue + 1)));
    }
};

/**
 *
 * @param index {Number}
 * @returns {Array}
 */
BoardConsumer.prototype.getMatchIndexes = function(index){
    return this.__board.getMatchIndexes(index);
};

/**
 * Shift no empty cells to free cell
 */
BoardConsumer.prototype.fallCell = function(){
    var i, y, cell;
    i = this.__board.height - 1;
    for(i; i >= 0; --i){
        cell = this.__board.at(i);
        if(cell.getValue() === Cell.FREE_CELL_VALUE){
            y = this.__board.yAtIndex(i);
            if(y - 1 >= 0){
                // swap current cell with top cell
                cell.swap(this.__board.at(y - 1));
            }
        }
    }
};

/**
 * Set free value to even cell from indexList
 * @param indexList
 */
BoardConsumer.prototype.destroyAtIndexes = function(indexList){
    var i, count, cell, index;
    count = indexList.length;
    for(i = 0; i < count; ++i){
        index = indexList[i];
        cell = this.__board.at(index);
        if(i === 0 && count >= this.bonusCondition){
            // first index in indexList is index of selected cell by user
            cell.transform(Cell.TYPE_EXTRA_BONUS); // convert selected cell to bonus type
        } else {
            cell.setValue(Cell.FREE_CELL_VALUE);
        }
    }
};

BoardConsumer.prototype.getReward = function(){

};
