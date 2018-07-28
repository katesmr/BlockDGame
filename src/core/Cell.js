module.exports = Cell;

/**
 * 
 */
function Cell(){
	/**
	 * Its value.
	 *
	 * @protected
	 * @property _value
	 * @type {Number}
	 */
	this._value = Cell.FREE_CELL_VALUE;

	/**
	 * @protected
	 * @property _price
	 * @type {Number}
	 */
	this._price = Cell.PRICE_X1;

	/**
	 * @protected
	 * @property _type
 	 * @type {Number}
	 */
	this._type = Cell.TYPE_NORMAL;
}

/**
 * FREE_CELL_VALUE
 * @static
 * @type {Number}
 */
Cell.FREE_CELL_VALUE = -1;

/**
 * PRICE_INCREASOR
 * @type {number}
 */
Cell.PRICE_INCREASOR = 1;

/**
 * PRICE_DECREASOR
 * @type {number}
 */
Cell.PRICE_DECREASOR = 1;

/**
 * @property PRICE_X1
 * @static
 * @type {Number}
 */
Cell.PRICE_X1 = 1;

/**
 * @property PRICE_X2
 * @static
 * @type {Number}
 */
Cell.PRICE_X2 = 2;

/**
 * @property PRICE_X3
 * @static
 * @type {Number}
 */
Cell.PRICE_X3 = 3;

/**
 * @property PRICE_X4
 * @static
 * @type {Number}
 */
Cell.PRICE_X4 = 4;

/**
 * @property PRICE_X5
 * @static
 * @type {Number}
 */
Cell.PRICE_X5 = 5;

/**
 * @property TYPE_NORMAL
 * @static
 * @type {Number}
 */
Cell.TYPE_NORMAL = 1;

/**
 * @property TYPE_EXTRA_BONUS
 * @static
 * @type {Number}
 */
Cell.TYPE_EXTRA_BONUS = 2;

/**
 * @property TYPE_EXTRA_BAD
 * @static
 * @type {Number}
 */
Cell.TYPE_EXTRA_BAD = 3;

/**
 * Compute total price of all cells by formula normalPrice * bonusPrice / badPrice
 * @param cellList {Array} Cell list
 * @returns {Number}
 */
Cell.computeScore = function(cellList){
	var i, cell, result;
	var normalCellPrice = 0;
    var bonusCellPrice = 0;
    var badCellPrice = 0;
    var count = cellList.length;
    for(i = 0; i < count; ++i){
		cell = cellList[i];
		if(cell.isType(Cell.TYPE_NORMAL) === true){
			normalCellPrice += cell.getPrice();
		} else if(cell.isType(Cell.TYPE_EXTRA_BONUS) === true){
			bonusCellPrice += cell.getPrice();
		} else if(cell.isType(Cell.TYPE_EXTRA_BAD) === true){
            badCellPrice += cell.getPrice();
        }
	}
	if(bonusCellPrice === 0){
		bonusCellPrice = 1;
	}
	if(badCellPrice === 0){
		badCellPrice = 1;
	}
	result = normalCellPrice * bonusCellPrice / badCellPrice;
	return Math.floor(result);
};

/**
 * @returns {Number}
 */
Cell.prototype.getValue = function(){
	return this._value;
};

/**
 * @returns {Number}
 */
Cell.prototype.getPrice = function(){
	return this._price;
};

/**
 * @param value {Number}
 */
Cell.prototype.setValue = function(value){
	this._value = value;
};

/**
 * Increase price value
 */
Cell.prototype.increasePrice = function(){
	if(this._price < Cell.PRICE_X5){
		this._price += Cell.PRICE_INCREASOR;
	}
};

/**
 * Transforms the type to the new one.
 * @param {Number} typeEnum
 */
Cell.prototype.transform = function(typeEnum){
	switch(typeEnum){
		case Cell.TYPE_NORMAL:
			this._type = Cell.TYPE_NORMAL;
			this._price = Cell.PRICE_X1;
			break;
		case Cell.TYPE_EXTRA_BONUS:
			this._type = Cell.TYPE_EXTRA_BONUS;
			this.increasePrice();
			break;
		case Cell.TYPE_EXTRA_BAD:
			this._type = Cell.TYPE_EXTRA_BAD;
			this.increasePrice();
			break;
		default:
			break;
	}
};

/**
 * Checks type with given value.
 * @param {Number} typeEnum
 * @return {Boolean}
 */
Cell.prototype.isType = function(typeEnum){
	return this._type === typeEnum;
};

/**
 * Checks whether the current value is default (e.g. empty)
 * @return {Boolean}
 */
Cell.prototype.isFree = function(){
	return this._value === Cell.FREE_CELL_VALUE;
};

/**
 * Resets all internal state/conditions/values to default
 */
Cell.prototype.reset = function(){
	this.setValue(Cell.FREE_CELL_VALUE);
    this._price = Cell.PRICE_X1;
    this._type = Cell.TYPE_NORMAL;
};

/**
 * Tells whether the given cell is matched an equals to this one.
 * @param {Cell} cell
 * @return {Boolean}
 */
Cell.prototype.equals = function(cell){
	if(this.isType(Cell.TYPE_NORMAL) && cell.isType(Cell.TYPE_NORMAL)){
		return this.getValue() === cell.getValue();
	}
	return true;
};

/**
 * Swaps its internal values with given cell
 * @param {Cell} cell
 * @return {Boolean}
 */
Cell.prototype.swap = function(cell){
	if(this !== cell){
        var tmpCell = Object.assign(new Cell(), cell);
        cell.setValue(this.getValue());
        cell._price = this._price;
        cell._type = this._type;
        this.setValue(tmpCell.getValue());
        this._price = tmpCell._price;
        this._type = tmpCell._type;
    }
	return true;
};

Cell.prototype.clone = function(){
	var result = new Cell();
	result.setValue(this.getValue());
	result._type = this._type;
	result._price = this.getPrice();
	return result;
};
