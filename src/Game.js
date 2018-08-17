var config = require("../config/config.js");
var BoardConsumer = require("./BoardConsumer.js");

class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
        this.group = null;
        this.groupChildren = null;
        this.boardConsumer = new BoardConsumer(config.width, config.height);

        this.boardConsumer.subscribe("E_CELL_VALUE", this._updateFrameValue.bind(this));
    }

    preload(){
        this.load.spritesheet("cat", "../assets/cat.png", {frameWidth: 97, frameHeight: 59, endFrame: 5});
    }

    create(){
        this.generateDefaultBoard();

        this.boardConsumer.generate(5);

        Phaser.Actions.IncX(this.groupChildren, 100);
    }

    _updateFrameValue(eventName, cellData){
        var frame = this.findChildByIndex(cellData.index);
        frame.setFrame(cellData.value);
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
            this.groupChildren[i].initIndex = i;
        }
    }

    findChildByIndex(index){
        var i, currentChild;
        var result = null;
        var count = this.groupChildren.length;
        for(i = 0; i < count; ++i){
            currentChild = this.groupChildren[i];
            if(currentChild.hasOwnProperty("initIndex")){
                if(currentChild.initIndex === index){
                    result = currentChild;
                    break;
                }
            }
        }
        return result;
    }
}

module.exports = Game;
