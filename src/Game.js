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
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_FREE, this._cellToFree.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_FALL_CELL, this._fallCell.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BONUS, this._cellToBonus.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_BAD, this._cellToBad.bind(this));
    }

    preload(){
        this.load.spritesheet("cat", "../assets/colors.png", {frameWidth: 60, frameHeight: 60, endFrame: 5});
    }

    create(){
        this.generateDefaultBoard();
        this.boardConsumer.generate(3);

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
                    countMatchChildren = result.length;
                    if(countMatchChildren >= config.BlockAmountToBonus){
                        //this.boardConsumer.destroyAtIndexes(result, true, Cell.PRICE_INCREASOR);
                    } else if(countMatchChildren >= config.minBlockAmount && countMatchChildren <= config.BlockAmountToBonus){
                        //this.boardConsumer.destroyAtIndexes(result);
                    } else if(countMatchChildren > 0 && countMatchChildren < config.minBlockAmount){
                        //this.boardConsumer.destroyAtIndexes(result, false, Cell.PRICE_DECREASOR);
                    }
                    this.boardConsumer.fall();
                    break;
                }
            }
        }, this);

        //this.boardConsumer.destroyAtIndexes([5, 6, 7, 8]);

        //this.boardConsumer.fall();

        /*var self = this;
        setTimeout(function(){
            self.boardConsumer.destroyAtIndexes([6]);
            self.boardConsumer.fall();
            self.boardConsumer.showBoard();
        }, 1000);*/

    }

    static _swapSpriteCellIndex(sprite1, sprite2){
        var tmp = sprite1.cellIndex;
        sprite1.cellIndex = sprite2.cellIndex;
        sprite2.cellIndex = tmp;
    }

    _updateFrameValue(eventName, cellData){
        var spriteToUpdate = this.findChildByCellIndex(cellData.index);
        if(spriteToUpdate !== null){
            spriteToUpdate.setFrame(cellData.value);
        }
    }

    _fallCell(eventName, data){
        var self;
        // get sprite from group by index
        var toIndex = this.groupChildren[data.toIndex];
        var fromIndexOnView = this.groupChildren[data.fromIndex];
        var fromIndex = this.findChildByCellIndex(data.fromIndex); // get visible sprite which was replaced
        if(toIndex && fromIndex !== null){
            self = this;
            this.tweens.add({
                targets: fromIndex,
                y: toIndex.y,
                duration: 500,
                ease: "Bounce",
                repeat: 0,
                onComplete: function(){
                    // delete tween from sprite
                    self.tweens.killTweensOf(fromIndex);
                }
            }, this);
            Game._swapSpriteCellIndex(fromIndexOnView, toIndex);
        }
    }

    _cellToFree(eventName, index){
        var spriteToFree = this.findChildByCellIndex(index);
        if(spriteToFree !== null){
            spriteToFree.setVisible(false);
        }
    }

    _cellToBonus(eventName, index){
        this.__changeFrame(index, config.sprite.bonusIndex);
    }

    _cellToBad(eventName, index){
        this.__changeFrame(index, config.sprite.badIndex);
    }

    __changeFrame(index, frameNumber){
        var spriteToFree = this.findChildByCellIndex(index);
        if(spriteToFree !== null){
            spriteToFree.setFrame(frameNumber);
        }
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
        this.groupChildren = this.group.getChildren();

        count = this.groupChildren.length;
        for(i = 0; i < count; ++i){
            this.groupChildren[i].cellIndex = i;
        }
    }

    /**
     * Return sprite which index in group equal to cellIndex of sprite which index expect method
     * @param childIndex {Number}
     */
    findChildByCellIndex(childIndex){
        var result = null;
        var child = this.groupChildren[childIndex];
        if(child){
            result = this.groupChildren[child.cellIndex];
        }
        return result;
    }
}

module.exports = Game;
