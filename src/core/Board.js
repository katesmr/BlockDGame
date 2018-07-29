var Cell = require("./Cell.js");

module.exports = Board;

/**
 * @param {Number} width
 * @param {Number} height
 */
function Board(width, height){
	/**
	 * @property _data
	 * @protected
	 * @default []
	 */
	this._data = [];

	/**
	 * @property width
	 * @type {Number}
	 */
	this.width = width;

	/**
	 * @property width
	 * @type {Number}
	 */
	this.height = height;

	this._createData();
}

/**
 * Full _data
 */
Board.prototype._createData = function(){
    var i, count;
    count = this.height * this.width;
    for(i = 0; i < count; ++i){
        this._data.push(new Cell());
    }
};

/**
 * @param {Number} index
 * @return {Cell|null}
 */
Board.prototype.at = function(index){
	var result = null;
	if(index >= 0 && index < this._data.length){
		result = this._data[index];
	}
	return result;
};

/**
 * @param {Number} x
 * @param {Number} y
 * @return {Number} computed index
 */
Board.prototype.indexAtPosition = function(x, y){
	return x + this.width * y;
};

/**
 * @param {Number} index
 * @return {Number} x-coord from the index
 */
Board.prototype.xAtIndex = function(index){
	return index % this.width;
};

/**
 * @param {Number} index
 * @return {Number} y-coord from the index
 */
Board.prototype.yAtIndex = function(index){
	return Math.floor(index / this.width);
};

/**
 * @param {Number} index - index of the initial cell to match with it's neighbours
 * @return {Array} - list of matched indexes
 */
Board.prototype.getMatchIndexes = function(index){
	var initialCell;
	var matchingIndexes = [];
	var visitedCellIndexes = {};
	initialCell = this.at(index);
	if(initialCell){
		this.__findEqualCells(index, initialCell.clone(), visitedCellIndexes, matchingIndexes);
	}
	return matchingIndexes;
};

/**
 *
 * @param index {Number}
 * @param initialCell {Cell}
 * @param visitedCellIndexes {Object} - object which store indexes for check them on visiting
 * @param matchingIndexes {Array} - result indexes list
 * @returns {*}
 * @private
 */
Board.prototype.__findEqualCells = function(index, initialCell, visitedCellIndexes, matchingIndexes){
	var x, y, nextIndex, nextCell;
	visitedCellIndexes[index] = null; // save index in object with no matter value
	matchingIndexes.push(index);
	x = this.xAtIndex(index);
	y = this.yAtIndex(index);
	if(y - 1 >= 0){
		// top
		nextIndex = this.indexAtPosition(x, y - 1);
		// get cell if it isn`t visited
		if(!(nextIndex in visitedCellIndexes)){
			nextCell = this.at(nextIndex);
			if(initialCell.equals(nextCell)){
				this.__findEqualCells(nextIndex, initialCell, visitedCellIndexes, matchingIndexes);
			}
		}
	}
	if(x + 1 < this.width){
		//right
		nextIndex = this.indexAtPosition(x + 1, y);
		// get cell if it isn`t visited
		if(!(nextIndex in visitedCellIndexes)){
			nextCell = this.at(nextIndex);
			if(initialCell.equals(nextCell)){
				this.__findEqualCells(nextIndex, initialCell, visitedCellIndexes, matchingIndexes);
			}
		}
	}
	if(y + 1 < this.height){
		// bottom
		nextIndex = this.indexAtPosition(x, y + 1);
		// get cell if it isn`t visited
		if(!(nextIndex in visitedCellIndexes)){
			nextCell = this.at(nextIndex);
			if(initialCell.equals(nextCell)){
				this.__findEqualCells(nextIndex, initialCell, visitedCellIndexes, matchingIndexes);
			}
		}
	}
	if(x - 1 >= 0){
		// left
		nextIndex = this.indexAtPosition(x - 1, y);
		// get cell if it isn`t visited
		if(!(nextIndex in visitedCellIndexes)){
			nextCell = this.at(nextIndex);
			if(initialCell.equals(nextCell)){
				this.__findEqualCells(nextIndex, initialCell, visitedCellIndexes, matchingIndexes);
			}
		}
	}
};

/**
 * Tells whether the board  has appropriate amount of nearly standing equal cells
 * @param {Number} minAmount - minium required amount of matched indexes
 * @return {Array} - list of matched indexes
 */
Board.prototype.findMatchIndexes = function(minAmount){
    var index, currentCell, matchingIndexes;
    var result = [];
    var noMatchingIndexes = {}; // save all free indexes or indexes groups less than minAmount
    for(index = 0; index < this._data.length; ++index){
        matchingIndexes = [];
        currentCell = this.at(index);
        if(!currentCell.isFree() && !(index in noMatchingIndexes)){
            this.__findEqualCells(index, currentCell.clone(), noMatchingIndexes, matchingIndexes);
            if(matchingIndexes.length >= minAmount){
                result = matchingIndexes;
                break;
            }
        }
    }
    return result;
};
