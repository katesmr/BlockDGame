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

	this._matchIndexes = [];
	this.isColumnMatch = true;

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
 * @param {Number} minAmount - minium required amount of matched indexes
 * @return {Array} - list of matched indexes
 */
Board.prototype.getMatchIndexes = function(index, minAmount){
	var x, y, nextCell, nextIndex;
	var currentCell = this.at(index);
	if(currentCell){
        this._matchIndexes.push(index); // save current match index
        if(this._matchIndexes.length === minAmount){
        	return this._matchIndexes; // exit when cont of matching indexes equal minAmount
		} else{
            x = this.xAtIndex(index);
            y = this.yAtIndex(index);
            if(this.isColumnMatch){
            	// search by column
                if(y - 1 >= 0){
                    // top
                    nextIndex = this.indexAtPosition(x, y - 1);
                    if(this._matchIndexes.indexOf(nextIndex) === -1){
                    	// get cell if _matchIndexes don`t have it
                        nextCell = this.at(nextIndex);
                        if(currentCell.equals(nextCell)){
                            this.getMatchIndexes(nextIndex, minAmount);
                        }
                    }
                }
                if(y + 1 < this.height){
                    // bottom
                    nextIndex = this.indexAtPosition(x, y + 1);
                    if(this._matchIndexes.indexOf(nextIndex) === -1){
                        // get cell if _matchIndexes don`t have it
                        nextCell = this.at(nextIndex);
                        if(currentCell.equals(nextCell)){
                            this.getMatchIndexes(nextIndex, minAmount);
                        }
                    }
                }
                // column has nothing matches
                this.isColumnMatch = false;
                this._matchIndexes.length = 0; // clear previous matching indexes
                this.getMatchIndexes(index, minAmount);
            } else{
            	// search by row
                if(x + 1 < this.width){
                    //right
                    nextIndex = this.indexAtPosition(x + 1, y);
                    if(this._matchIndexes.indexOf(nextIndex) === -1){
                        // get cell if _matchIndexes don`t have it
                        nextCell = this.at(nextIndex);
                        if(currentCell.equals(nextCell)){
                            this.getMatchIndexes(nextIndex, minAmount);
                        }
                    }
                } else if(x - 1 >= 0){
                    // left
                    nextIndex = this.indexAtPosition(x - 1, y);
                    if(this._matchIndexes.indexOf(nextIndex) === -1){
                        // get cell if _matchIndexes don`t have it
                        nextCell = this.at(nextIndex);
                        if(currentCell.equals(nextCell)){
                            this.getMatchIndexes(nextIndex, minAmount);
                        }
                    }
                }
                this.isColumnMatch = true;
                this._matchIndexes.length = 0; // clear previous matching indexes
                // nothing found
                return [];
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
	return [];
};
