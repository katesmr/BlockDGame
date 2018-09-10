var Game = require("./Game.js");
var params = require("../config/config.js");

var config = {
    type: Phaser.AUTO,
    width: 100 * params.width,
    height: 100 * params.height,
    scene: [Game]
};

module.exports = new Phaser.Game(config);
