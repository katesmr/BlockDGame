var config = require("../config/config.js");

class Game extends Phaser.Scene {
    constructor(){
        super({key: "GameOver"});
        this.score = null;
        this.maxScore = null;
        this.button = null;
    }

    preload(){
    }

    create(){
        var self = this;
        var xPosition = Math.floor((config.sizeCoefficient * config.width) / 3);
        var yPosition = Math.floor((config.sizeCoefficient * config.height) / 4);
        var yStep = 50;
        this.score = this.add.text(xPosition, yPosition, "score: " + localStorage.getItem("score"),
                                  {font: "40px Impact"});
        yPosition += yStep;
        this.maxScore = this.add.text(xPosition, yPosition, "max score: " + localStorage.getItem("max score"),
                                     {font: "40px Impact"});
        yPosition += yStep;
        this.button = this.add.text(xPosition, yPosition, "restart", {font: "40px Impact"});
        this.button.setInteractive();
        this.button.setBackgroundColor("#373636");
        this.button.setPadding(32, 8);
        this.button.on("pointerdown", function(){
            self.scene.start("Game");
        });
    }
}

module.exports = Game;
