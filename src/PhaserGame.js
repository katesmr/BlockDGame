var GameScene = require("./GameScene.js");
var GameOverScene = require("./GameOverScene.js");
var MenuScene = require("./MenuScene.js");
var config = require("../config/config.js");

module.exports = new Phaser.Game({
    type: Phaser.AUTO,
    width: config.sizeCoefficient * config.width,
    height: config.sizeCoefficient * config.height,
    scene: [MenuScene, GameScene, GameOverScene]
});
