var Board = require("../src/core/Board.js");
var expect = require("chai").expect;

describe("Board", function(){
    describe("new Board", function(){
        it("creates Board object", function(){
            var board = new Board();

            expect(board.constructor).to.equal(Board);
        });
    });

    describe("indexAtPosition()", function(){
        it("checks index position", function(){
            var board = new Board();
            expect(board.indexAtPosition(0, 0)).to.equal(0);
        });
    });

});

