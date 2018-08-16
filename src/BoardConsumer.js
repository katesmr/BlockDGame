var Cell = require("./core/Cell.js");
var Board = require("./core/Board.js");
var Observer = require("./core/Observer.js");
var commonEventNames = require("./core/commonEventNames.js");

module.exports = BoardConsumer;

function BoardConsumer(width, height){
    this.__board = new Board(width, height);
    this._observer = new Observer();
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

BoardConsumer.prototype.subscribe = function(eventName, handler){
    this._observer.subscribe(eventName, handler);
};

BoardConsumer.prototype.unsubscribe = function(eventName, handler){
    this._observer.unsubscribe(eventName, handler);
};

BoardConsumer.prototype.at = function(index){
    return this.__board.at(index);
};

BoardConsumer.prototype.xAtIndex = function(index){
    return this.__board.xAtIndex(index);
};

BoardConsumer.prototype.yAtIndex = function(index){
    return this.__board.yAtIndex(index);
};

/**
 * Send notify message with cell index and value
 * @param index
 */
BoardConsumer.prototype.sendCellValue = function(index){
    var cell = this.at(index);
    if(cell){
        this._observer.notify(commonEventNames.E_CELL_VALUE, {"index": index, "value": cell.getValue()});
    }
};

/**
 * Send notify message with all cell index and value
 */
BoardConsumer.prototype.getCellsValue = function(){
    var i, count;
    count = this.__board.width * this.__board.height;
    for(i = 0; i < count; ++i){
        this.sendCellValue(i);
    }
};

/**
 * Generate board and send notify with cell data
 * @param maxValue {Number} - maximum value for cell
 */
BoardConsumer.prototype.generate = function(maxValue){
    this._generate(maxValue);
    this.getCellsValue();
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

/**
 * Compute total scope for cells by indexes in list
 * @param indexList {Array}
 * @returns {Number}
 */
BoardConsumer.prototype.getReward = function(indexList){
    var i, cellList, count, result;
    cellList = [];
    count = indexList.length;
    for(i = 0; i < count; ++i){
        cellList.push(this.at(indexList[i]));
    }
    result = Cell.computeScore(cellList);
    return result;
};