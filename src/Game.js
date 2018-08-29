var config = require("../config/config.js");
var BoardConsumer = require("./BoardConsumer.js");
var Cell = require("./core/Cell.js");
var commonEventNames = require("./core/commonEventNames.js");

class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
        this.group = null;
        this.groupChildren = null;
        this.boardConsumer = new BoardConsumer(config.width, config.height);

        this.boardConsumer.subscribe(commonEventNames.E_CELL_VALUE, this._updateFrameValue.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_SHIFT_CELL, this._shiftCells.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_FREE, this._cellToFree.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_FALL_CELL, this._fallCell.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BONUS, this._cellToBonus.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BAD, this._cellToBad.bind(this));
    }

    preload(){
        this.load.spritesheet("cat", "../assets/colors.png", {frameWidth: 60, frameHeight: 60, endFrame: 5});
    }

    create(){
        var self = this;

        this.generateDefaultBoard();
        this.boardConsumer.generate(2);

        // ---------------------- test

        console.log(this.groupChildren);
        this.input.on("pointerdown", function(event){
            var i, currentChild, childXStartPoint, childYStartPoint, childXEndPoint, childYEndPoint, countMatchChildren;
            var result = null;
            var halfXLength = config.sprite.xStep / 2;
            var halfYLength = config.sprite.yStep / 2;
            var count = this.groupChildren.length;
            for(i = 0; i < count; ++i){
                currentChild = this.groupChildren[i];
                childXStartPoint = currentChild.x - halfXLength;
                childYStartPoint = currentChild.y - halfYLength;
                childXEndPoint = currentChild.x + halfXLength;
                childYEndPoint = currentChild.y + halfYLength;
                if((childXStartPoint <= event.x && event.x <= childXEndPoint) &&
                   (childYStartPoint <= event.y && event.y <= childYEndPoint)){
                    result = this.boardConsumer.getMatchIndexes(i);
                    console.log(result);
                    countMatchChildren = result.length;
                    if(countMatchChildren >= config.BlockAmountToBonus){
                        //this.boardConsumer.destroyAtIndexes(result, true, Cell.PRICE_INCREASOR);
                    } else if(countMatchChildren >= config.minBlockAmount && countMatchChildren <= config.BlockAmountToBonus){
                        this.boardConsumer.destroyAtIndexes(result);
                    } else if(countMatchChildren > 0 && countMatchChildren < config.minBlockAmount){
                        //this.boardConsumer.destroyAtIndexes(result, false, Cell.PRICE_DECREASOR);
                    }
                    this.boardConsumer.fall();
                    setTimeout(function(){
                        self.boardConsumer.slide();
                    }, 1000);
                    break;
                }
            }
        }, this);
    }

    _updateFrameValue(eventName, cellData){
        var spriteToUpdate = this.groupChildren[cellData.index];
        spriteToUpdate.setFrame(cellData.value);
    }

    _shiftCells(eventName, data){
        this.swapHorizontally(data.toIndex, data.fromIndex);
    }

    _fallCell(eventName, data){
        var self;
        var toChild = this.groupChildren[data.toIndex];
        var fromChild = this.groupChildren[data.fromIndex];
        var yFrom = fromChild.y;
        if(toChild && fromChild !== null){
            self = this;
            this.tweens.add({
                targets: fromChild,
                y: toChild.y,
                duration: 500,
                ease: "Bounce",
                repeat: 0,
                onComplete: function(){
                    // delete tween from sprite
                    self.tweens.killTweensOf(fromChild);
                }
            }, this);
            this.swapVertically(data.toIndex, data.fromIndex, yFrom);
        }
    }

    _cellToFree(eventName, index){
        var spriteToFree = this.groupChildren[index];
        spriteToFree.setVisible(false);
    }

    _cellToBonus(eventName, index){
        this.__changeFrame(index, config.sprite.bonusIndex);
    }

    _cellToBad(eventName, index){
        this.__changeFrame(index, config.sprite.badIndex);
    }

    __changeFrame(index, frameNumber){
        var spriteToFree = this.groupChildren[index];
        spriteToFree.setFrame(frameNumber);
    }

    swapHorizontally(toIndex, fromIndex){
        var toChild = this.groupChildren[toIndex];
        var fromChild = this.groupChildren[fromIndex];
        var xTo = toChild.x;
        var xFrom = fromChild.x;
        this.groupChildren[toIndex] = fromChild;
        this.groupChildren[toIndex].x = xTo; // save previous child position
        this.groupChildren[fromIndex] = toChild;
        this.groupChildren[fromIndex].x = xFrom; // save previous child position
    }

    swapVertically(toIndex, fromIndex, yFrom){
        var toChild = this.groupChildren[toIndex];
        var fromChild = this.groupChildren[fromIndex];
        this.groupChildren[toIndex] = fromChild;
        // this.groupChildren[toIndex].y = toChild.y; // it happens in tween fall effect
        this.groupChildren[fromIndex] = toChild;
        this.groupChildren[fromIndex].y = yFrom; // save previous child position
        //to.cellIndex = fromIndex;
        //fromIndex.cellIndex = toIndex;
    }

    generateDefaultBoard(){
        var i, y, count;
        var frames = [];
        var repeatCount = config.width - 1;
        y = config.sprite.y;
        for(i = 0; i < config.height; ++i){
            frames.push({key: "cat", frame: 0, repeat: repeatCount,
                         setXY: {x: config.sprite.x, y: y, stepX: config.sprite.xStep}});
            y += config.sprite.yStep;
        }

        this.group = this.add.group(frames);
        this.groupChildren = this.group.getChildren().slice();

        count = this.groupChildren.length;
        for(i = 0; i < count; ++i){
            this.groupChildren[i].cellIndex = i;
        }
    }
}

module.exports = Game;
