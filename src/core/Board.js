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
}

/**
 * @param {Number} index
 * @return {Cell|null}
 */
Board.prototype.at = function(index){
	return null;
}

/**
 * @param {Number} x
 * @param {Number} y
 * @return {Number} computed index
 */
Board.prototype.indexAtPosition = function(x, y){
	// Tip: look for the formula how to get index at 2D space from x:y
	return -1;
}

/**
 * @param {Number} index
 * @return {Number} x-coord from the index
 */
Board.prototype.xAtIndex = function(index){
	return 0;
}

/**
 * @param {Number} index
 * @return {Number} y-coord from the index
 */
Board.prototype.yAtIndex = function(index){
	return 0;
}

/**
 * @param {Number} index - index of the initial cell to match with it's neighbours
 * @param {Number} minAmount - minium required amount of matched indexes
 * @return {Array} - list of matched indexes
 */
Board.prototype.getMatchIndexes = function(index, minAmount){
	return [];
}

/**
 * Tells whether the board  has appropriate amount of nearly standing equal cells
 * @param {Number} minAmount - minium required amount of matched indexes
 * @return {Array} - list of matched indexes
 */
Board.prototype.findMatchIndexes = function(minAmount){
	return [];
}

/**
 * Computes a reward of the cells under given indexes
 * @param {Array} indexes - list of matched indexes
 * @return {Number}
 */
Board.prototype.getReward = function(indexes){
	return 1;
}

