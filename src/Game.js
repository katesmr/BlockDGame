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
        this.boardConsumer.subscribe(commonEventNames.E_CELL_TO_FREE, this._freeCell.bind(this));
        this.boardConsumer.subscribe(commonEventNames.E_FALL_CELL, this._fallCell.bind(this));
    }

    preload(){
        this.load.spritesheet("cat", "../assets/cat.png", {frameWidth: 97, frameHeight: 59, endFrame: 5});
    }

    create(){
        this.generateDefaultBoard();

        this.boardConsumer.generate(5);


        // ---------------------- test

        this.boardConsumer.destroyAtIndexes([5, 6, 7, 8]);

        this.boardConsumer.fall();

        var self = this;
        setTimeout(function(){
            self.boardConsumer.destroyAtIndexes([6]);
            self.boardConsumer.fall();
            self.boardConsumer.showBoard();
        }, 1000);

        console.log(this.groupChildren);
    }

    _updateFrameValue(eventName, cellData){
        var spriteToUpdate = this.findChildByCellIndex(cellData.index);
        if(spriteToUpdate !== null){
            spriteToUpdate.setFrame(cellData.value);
        }
    }

    _freeCell(eventName, index){
        var spriteToFree = this.findChildByCellIndex(index);
        if(spriteToFree !== null){
            spriteToFree.setVisible(false);
        }
    }

    _fallCell(eventName, data){
        var tween, tmp, self;
        // get sprite by board position by init ordering
        var toIndex = this.groupChildren[data.toIndex];
        var fromIndexOnView = this.groupChildren[data.fromIndex];
        var fromIndex = this.findChildByCellIndex(data.fromIndex); // get visible sprite which was replaced
        if(toIndex && fromIndex !== null){
            self = this;
            tween = this.tweens.add({
                targets: fromIndex,
                y: toIndex.y,
                duration: 500,
                ease: "Bounce",
                repeat: 0,
                yoyo: false,
                onComplete: function(){

                }
            }, this);
            tmp = fromIndexOnView.cellIndex;
            fromIndexOnView.cellIndex = toIndex.cellIndex;
            toIndex.cellIndex = tmp;
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
     * Return sprite of group of corresponded cellIndex which contain in sprite by childIndex
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

    findChildByIndex(index){
        var i, currentChild;
        var result = null;
        var count = this.groupChildren.length;
        for(i = 0; i < count; ++i){
            currentChild = this.groupChildren[i];
            if(currentChild.cellIndex === index) {
                result = currentChild;
                break;
            }
        }
        return result;
    }
}

module.exports = Game;
