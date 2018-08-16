var Game = require("./Game.js");
var PhaserGame = require("./PhaserGame.js");
var Cell = require("./core/Cell.js");
var Board = require("./core/Board.js");
var BoardConsumer = require("./BoardConsumer.js");

module.exports = {
    "Cell": Cell,
    "Board": Board,
    "BoardConsumer": BoardConsumer,
    "Game": Game,
    "PhaserGame": PhaserGame
};
