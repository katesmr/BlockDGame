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
BoardConsumer.prototype.sendCellsValue = function(){
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
    this.sendCellsValue();
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
                                             {"toIndex": index, "fromIndex": falledIndex});
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
 * @param [bonusCondition] {Boolean} - true for bonus, false for bad
 * @param [priceIncreasor] {Number}
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
 * Begin swap columns from the bottom
 * @param indexFirstColumn
 * @param indexSecondColumn
 */
BoardConsumer.prototype.swapColumns = function(indexFirstColumn, indexSecondColumn){
    var fromIndex, toIndex;
    var x1 = this.__board.xAtIndex(indexFirstColumn);
    var x2 = this.__board.xAtIndex(indexSecondColumn);
    var y = this.__board.yAtIndex(indexFirstColumn);
    for(y; y >= 0; --y){
        // swap between columns
        toIndex = this.__board.indexAtPosition(x1, y);
        fromIndex = this.__board.indexAtPosition(x2, y);
        if(this.__board.at(toIndex).swap(this.__board.at(fromIndex)) === true){
            this._observer.notify(commonEventNames.E_SHIFT_CELL, {"fromIndex": fromIndex, "toIndex": toIndex});
        }
    }
};

/**
 * Get index of bottom cell and shift columns towards to center
 * Determine which side to do shift
 * @param toSlide {Number} - index of free cell
 */
BoardConsumer.prototype._shiftToCenter = function(toSlide){
    var index, count, xPosition;
    var halfWidth = Math.floor(this.__board.width / 2); // value of center x
    if(this.__board.width % 2 !== 0){
        if(toSlide === halfWidth + 1){
            // case when empty column in center board with odd width of board
        }
    }
    index = toSlide;
    xPosition = this.__board.xAtIndex(toSlide);
    if(xPosition >= 0 && xPosition < halfWidth){
        // shift to right side
        for(xPosition; xPosition > 0; --xPosition){
            --index;
            // swap with only no empty cells
            if(!this.__board.at(index).isFree()){
                this.swapColumns(toSlide, index);
            }
        }
    } else if(xPosition >= halfWidth && xPosition < this.__board.width){
        // shift to left side
        count = this.__board.width * this.__board.height - 1;
        for(index; index < count; ++index){
            // swap with only no empty cells
            if(!this.__board.at(index + 1).isFree()) {
                this.swapColumns(index, index + 1);
            }
        }
    }
};

/**
 * Search in bottom cells free cell and check its columns is free too
 */
BoardConsumer.prototype.slide = function(){
    var i, cell, index, x, y, topCell;
    var firstNoEmptyCellIndex = -1;
    index = (this.__board.width * this.__board.height) - 1;
    for(i = 0; i < this.__board.width; ++i){
        cell = this.__board.at(index);
        if(cell.isFree() && firstNoEmptyCellIndex !== -1){
            // case when founded free cell after no empty cell
            this._shiftToCenter(index);
        } else if(!cell.isFree() && firstNoEmptyCellIndex === -1){
            // case when founded fist no empty cell
            firstNoEmptyCellIndex = index;
        }
        --index;
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

BoardConsumer.prototype.showBoard = function(){
    var i, j, cell, cellView;
    var index = 0;
    var tmp;
    for(i = 0; i < this.__board.height; ++i){
        tmp = [];
        for(j = 0; j < this.__board.width; ++j){
            cell = this.at(index);
            if(cell.isFree()){
                cellView = " ";
            } else{
                cellView = "#";
            }
            tmp.push(cellView);
            ++index;
        }
        console.log(tmp);
    }
};
