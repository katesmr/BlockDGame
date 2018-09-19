var GameScene = require("./GameScene.js");
var params = require("../config/config.js");

var config = {
    type: Phaser.AUTO,
    width: params.sizeCoefficient * params.width,
    height: params.sizeCoefficient * params.height,
    scene: [GameScene]
};

module.exports = new Phaser.Game(config);
