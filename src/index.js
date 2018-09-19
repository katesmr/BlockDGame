var Game = require("./GameScene.js");
var GameOverScene = require("./GameOverScene.js");
var MenuScene = require("./MenuScene.js");
var PhaserGame = require("./PhaserGame.js");
var Cell = require("./core/Cell.js");
var Board = require("./core/Board.js");
var BoardConsumer = require("./BoardConsumer.js");

module.exports = {
    "Cell": Cell,
    "Board": Board,
    "BoardConsumer": BoardConsumer,
    "Game": Game,
    "GameOverScene": GameOverScene,
    "MenuScene": MenuScene,
    "PhaserGame": PhaserGame
};
