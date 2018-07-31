var Cell = require("./core/Cell.js");
var Board = require("./core/Board.js");
var Observer = require("observer");
var commonEventNames = require("./core/commonEventNames.js");

module.exports = BoardConsumer;

function BoardConsumer(width, height, maxValue){
    this.__board = new Board(width, height);
    this._observer = new Observer();
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

BoardConsumer.prototype.at = function(index){
    return this.__board.at(index);
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
BoardConsumer.prototype.fall = function(){
    var index, x, y, cell, topCell, falledIndex;
    index = (this.__board.height * this.__board.width) - 1;
    for(index; index >= 0; --index){
        cell = this.__board.at(index);
        if(cell.isFree()){
            y = this.__board.yAtIndex(index); // y coord of current FREE cell
            x = this.__board.xAtIndex(index); // x coord of current cell column
            for(y - 1; y >= 0; --y){
                // search first top no empty cell
                falledIndex = this.__board.indexAtPosition(x, y);
                topCell = this.__board.at(falledIndex); // get next top cell above current
                if(!topCell.isFree()){
                    // swap current cell with top cell
                    if(cell.swap(topCell) === true){
                        this._observer.notify(commonEventNames.E_FALL_CELL,
                                             {"currentIndex": index, "falledIndex": falledIndex});
                    }
                    break;
                }
            }
        }
    }
};

/**
 * Set free value to even cell from indexList
 * @param indexList {Array}
 * @param bonusCondition {Boolean} - true for bonus, false for bad
 * @param priceIncreasor {Number}
 */
BoardConsumer.prototype.destroyAtIndexes = function(indexList, bonusCondition, priceIncreasor){
    var i, count, cell, index;
    count = indexList.length;
    for(i = 0; i < count; ++i){
        index = indexList[i];
        cell = this.__board.at(index);
        // first index in indexList is index of selected cell by user
        if(i === 0 && bonusCondition === true){
            cell.transform(Cell.TYPE_EXTRA_BONUS); // convert selected cell to bonus type
            cell.increasePrice(priceIncreasor);
            this._observer.notify(commonEventNames.E_CELL_TO_BONUS, index);
        } else if(i === 0 && bonusCondition === false){
            cell.transform(Cell.TYPE_EXTRA_BAD); // convert selected cell to bad type
            cell.increasePrice(priceIncreasor);
            this._observer.notify(commonEventNames.E_CELL_TO_BAD, index);
        } else {
            cell.setValue(Cell.FREE_CELL_VALUE);
            this._observer.notify(commonEventNames.E_CELL_TO_FREE, index);
        }
    }
};

BoardConsumer.prototype.getReward = function(){

};
