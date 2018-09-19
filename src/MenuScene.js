var config = require("../config/config.js");

var MenuScene = new Phaser.Scene("MenuScene");

MenuScene.create = function() {
    var self = this;

    this.button = this.add.text((config.width * config.sizeCoefficient) - 50, 0, "x", {font: "40px Impact"});
    this.button.setInteractive();
    this.button.setBackgroundColor("red");
    this.button.setPadding(8, 0);
    this.button.on("pointerdown", function(){
        self.scene.start("GameScene");
    });

    var i, xPosition, yPosition, yStep;
    yStep = 30;
    xPosition = 10;
    yPosition = (config.sizeCoefficient * config.height) - 110;
    for (i = 0; i < config.aboutText.length; ++i) {
        this.add.text(xPosition, yPosition, config.aboutText[i], {font: "25px Impact"});
        yPosition += yStep;
    }

    xPosition = 50;
    yPosition = 100;
    yStep = 50;
    for (i = 0; i < config.rules.length; ++i) {
        this.add.text(xPosition, yPosition, config.rules[i], {font: "40px Impact"});
        yPosition += yStep;
    }
};

module.exports = MenuScene;
