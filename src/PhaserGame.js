var Game = require("./Game.js");

var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 500,
    scene: [Game]
};

module.exports = new Phaser.Game(config);
