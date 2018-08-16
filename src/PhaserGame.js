var Game = require("./Game.js");

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game]
};

module.exports = new Phaser.Game(config);
