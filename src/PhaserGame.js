var GameScene = require("./GameScene.js");
var GameOverScene = require("./GameOverScene.js");
var MenuScene = require("./MenuScene.js");
var params = require("../config/config.js");

var config = {
    type: Phaser.AUTO,
    width: params.sizeCoefficient * params.width,
    height: params.sizeCoefficient * params.height,
    scene: [MenuScene, GameScene, GameOverScene]
};

module.exports = new Phaser.Game(config);
