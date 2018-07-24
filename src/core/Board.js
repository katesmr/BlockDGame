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
	// Tip: look for the formula how to get index at 2D space from x:y
	return x + width * y;
};

/**
 * @param {Number} index
 * @return {Number} x-coord from the index
 */
Board.prototype.xAtIndex = function(index){
	return index % width;
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
	return [];
};

/**
 * Tells whether the board  has appropriate amount of nearly standing equal cells
 * @param {Number} minAmount - minium required amount of matched indexes
 * @return {Array} - list of matched indexes
 */
Board.prototype.findMatchIndexes = function(minAmount){
	return [];
};

/**
 * Computes a reward of the cells under given indexes
 * @param {Array} indexes - list of matched indexes
 * @return {Number}
 */
Board.prototype.getReward = function(indexes){
	return 1;
};
