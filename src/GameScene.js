var config = require("../config/config.js");
var BoardConsumer = require("./BoardConsumer.js");
var commonEventNames = require("./core/commonEventNames.js");

var GameScene = new Phaser.Scene("GameScene");

/**
 * Save max score value
 * @type {number}
 */
GameScene.maxScore = 0;

/**
 * Preload sprites
 */
GameScene.preload = function(){
    this.load.spritesheet("cat", "./assets/colors.png", {frameWidth: 64, frameHeight: 64, endFrame: 3});

    this.timerDuration = config.gameTime;
    console.log(this.timerDuration);
    this.boardConsumer = new BoardConsumer(config.width, config.height);

    this.boardConsumer.subscribe(commonEventNames.E_CELL_VALUE, this._updateFrameValue.bind(this));
    this.boardConsumer.subscribe(commonEventNames.E_SHIFT_CELL, this._slideCells.bind(this));
    this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_FREE, this._cellToFree.bind(this));
    this.boardConsumer.subscribe(commonEventNames.E_FALL_CELL, this._fallCell.bind(this));
    this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BONUS, this._cellToBonus.bind(this));
    this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BAD, this._cellToBad.bind(this));
};

/**
 * Init scene function.
 * It call everytime when switch between scenes
 */
GameScene.create = function(){
    this.score = 0;
    this.menu = null;
    this.scoreText = null;
    this.spriteGroup = null;
    this.groupChildren = null;

    this.isRest = true;

    this.generateDefaultBoard();
    this.boardConsumer.generate(2);

    this.menu = this.add.text(0, 0, "menu", {font: "30px Impact"});
    this.menu.setInteractive();
    this.menu.setBackgroundColor(config.buttonColor);
    this.menu.setPadding(8);

    this.scoreText = this.add.text(150, 10, "score: ", {font: "30px Impact"});
    this.timerText = this.add.text(350, 10, "timer: ", {font: "30px Impact"});
    this.timeText = this.add.text(450, 10, "", {font: "30px Impact"});

    this.timeInterval = this.time.addEvent({delay: 1000, callback: function() {
            this.gameTimer(this.timerDuration);
        }, callbackScope: this, loop: true});

    this.menu.on("pointerdown", function(){
        this.scene.start("MenuScene");
        this._clearSceneComponents();
    }, this);

    this.input.on("pointerdown", function(pointer, gameObject){
        var sprite = gameObject[0];
        if(this.isRest === true && sprite){
            this._pointDown(sprite);
        }
    }, this);
};

/**
 * @param duration {Number} - timer value in seconds
 */
GameScene.gameTimer = function(duration){
    var self = this;
    var timer = duration, minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    self.timeText.setText(minutes + ":" + seconds);
    // save current time
    // and use it when board will update
    self.timerDuration = --duration;

    if (self.timerDuration === 0) {
        console.log("exit");
        self._clearSceneComponents();
        self.scene.start("GameOverScene");
    }
};

/**
 * Handle user click event on sprite
 * @param sprite {object}
 * @private
 */
GameScene._pointDown = function(sprite){
    var result = this.boardConsumer.getMatchIndexes(sprite.cellIndex);
    var countMatchChildren = result.length;
    if(countMatchChildren >= config.minBlockAmount && countMatchChildren <= config.BlockAmountToBonus){
        this.score += this.boardConsumer.scoreByValue(result);
        this.scoreText.setText("score: " + this.score);
        this.boardConsumer.destroyAtIndexes(result);
        this.isRest = false;
        this._fall();
    }
};

/**
 * Handle fall event
 * Wait fall time and switch to slide
 * @private
 */
GameScene._fall = function(){
    this.boardConsumer.fall();
    this.time.delayedCall(config.slideTime + config.fallTime, function(){
        this._slide();
    }, [], this);
};

/**
 * Handle slide event
 * Wait slide time (if slide was called) and switch flag to rest
 * @private
 */
GameScene._slide = function(){
    if(this.boardConsumer.slide()){
        this.time.delayedCall(config.slideTime, function(){
            this.isRest = true;
            this._goToGameOverScene();
        }, [], this);
    } else{
        this.isRest = true;
        this._goToGameOverScene();
    }
};

/**
 * Check availability of possible set of equal cells
 * And call GameOverScene if not
 * @private
 */
GameScene._goToGameOverScene = function(){
    var possibleMatchCells = this.boardConsumer.findMatchIndexes(config.minBlockAmount);
    if(possibleMatchCells.length === 0){
        localStorage.setItem("score", this.score);
        if(GameScene.maxScore < this.score){
            GameScene.maxScore = this.score;
        }
        localStorage.setItem("max score", GameScene.maxScore);
        this._clearSceneComponents();
        this.create()
    }
};

/**
 * Clear previous data from scene components
 * @private
 */
GameScene._clearSceneComponents = function(){
    this.spriteGroup.clear(true);
    this.scoreText.destroy();
    this.timerText.destroy();
    this.timeText.destroy();
    this.timeInterval.destroy();
};

/**
 * Set to sprite new frame value
 * @param eventName {String} - name of observer event
 * @param cellData {Object}
 * @private
 */
GameScene._updateFrameValue = function(eventName, cellData){
    var spriteToUpdate = this.groupChildren[cellData.index];
    spriteToUpdate.setFrame(cellData.value);
};

/**
 * Execute slide effect
 * @param eventName {String} - name of observer event
 * @param data {Object}
 * @private
 */
GameScene._slideCells = function(eventName, data){
    var self;
    var toChild = this.groupChildren[data.toIndex];
    var fromChild = this.groupChildren[data.fromIndex];
    var xFrom = fromChild.x;
    if(toChild && fromChild !== null){
        self = this;
        this.tweens.add({
            targets: fromChild,
            x: toChild.x,
            duration: config.slideTime,
            ease: "Back",
            onComplete: function(){
                // delete tween from sprite
                self.tweens.killTweensOf(fromChild);
            }
        }, this);
        this.swapHorizontally(data.toIndex, data.fromIndex, xFrom);
    }
};

/**
 * Execute fall effect
 * @param eventName {String} - name of observer event
 * @param data {Object}
 * @private
 */
GameScene._fallCell = function(eventName, data){
    var self;
    var toChild = this.groupChildren[data.toIndex];
    var fromChild = this.groupChildren[data.fromIndex];
    var yFrom = fromChild.y;
    if(toChild && fromChild !== null){
        self = this;
        this.tweens.add({
            targets: fromChild,
            y: toChild.y,
            duration: config.fallTime,
            ease: "Bounce",
            onComplete: function(){
                // delete tween from sprite
                self.tweens.killTweensOf(fromChild);
            }
        }, this);
        this.swapVertically(data.toIndex, data.fromIndex, yFrom);
    }
};

/**
 * Handle disable event and set cell to unvisible
 * @param eventName {String} - name of observer event
 * @param index {Number}
 * @private
 */
GameScene._cellToFree = function(eventName, index){
    var spriteToFree = this.groupChildren[index];
    spriteToFree.setVisible(false);
};

GameScene._cellToBonus = function(eventName, index){
    this.__changeFrame(index, config.sprite.bonusIndex);
};

GameScene._cellToBad = function(eventName, index){
    this.__changeFrame(index, config.sprite.badIndex);
};

GameScene.__changeFrame = function(index, frameNumber){
    var spriteToFree = this.groupChildren[index];
    spriteToFree.setFrame(frameNumber);
};

/**
 * Swap two cells columns by X
 * @param toIndex {Number}
 * @param fromIndex {Number}
 * @param xFrom {Number}
 */
GameScene.swapHorizontally = function(toIndex, fromIndex, xFrom){
    var toChild = this.groupChildren[toIndex];
    var fromChild = this.groupChildren[fromIndex];
    this.groupChildren[toIndex] = fromChild;
    //this.groupChildren[toIndex].x = xTo; // it happens in tween slide effect
    this.groupChildren[fromIndex] = toChild;
    this.groupChildren[fromIndex].x = xFrom; // save previous child position
    toChild.cellIndex = fromIndex;
    fromChild.cellIndex = toIndex;
};

/**
 * Swap two cells columns by Y
 * @param toIndex {Number}
 * @param fromIndex {Number}
 * @param yFrom {Number}
 */
GameScene.swapVertically = function(toIndex, fromIndex, yFrom){
    var toChild = this.groupChildren[toIndex];
    var fromChild = this.groupChildren[fromIndex];
    this.groupChildren[toIndex] = fromChild;
    // this.groupChildren[toIndex].y = toChild.y; // it happens in tween fall effect
    this.groupChildren[fromIndex] = toChild;
    this.groupChildren[fromIndex].y = yFrom; // save previous child position
    toChild.cellIndex = fromIndex;
    fromChild.cellIndex = toIndex;
};

/**
 * Init board sprites with default value
 * Pack them to group
 * And available sprites click event
 */
GameScene.generateDefaultBoard = function(){
    var i, y, count;
    var frames = [];
    var repeatCount = config.width - 1;
    y = config.sprite.y;
    for(i = 0; i < config.height; ++i){
        frames.push({key: "cat", frame: 0, repeat: repeatCount,
            setXY: {x: config.sprite.x, y: y, stepX: config.sprite.xStep}});
        y += config.sprite.yStep;
    }

    this.spriteGroup = this.add.group(frames);
    this.groupChildren = this.spriteGroup.getChildren().slice();

    count = this.groupChildren.length;
    for(i = 0; i < count; ++i){
        this.groupChildren[i].cellIndex = i;
        this.groupChildren[i].setInteractive();
    }
};

module.exports = GameScene;
