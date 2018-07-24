var Board = require("../src/core/Board.js");
var Cell = require("../src/core/Cell.js");
var expect = require("chai").expect;

describe("Board", function(){
    describe("new Board", function(){
        it("creates Board object", function(){
            var board = new Board(2, 3);

            expect(board.constructor).to.equal(Board);
        });
    });

    describe("at()", function(){
        it("get Board cells", function(){
            var board = new Board(2, 3);
            expect(board.at(-1)).to.equal(null);
            expect(board.at(0)).to.be.an.instanceof(Cell);
            expect(board.at(1)).to.be.an.instanceof(Cell);
            expect(board.at(2)).to.be.an.instanceof(Cell);
            expect(board.at(3)).to.be.an.instanceof(Cell);
            expect(board.at(4)).to.be.an.instanceof(Cell);
            expect(board.at(5)).to.be.an.instanceof(Cell);
            expect(board.at(board.width * board.height)).to.equal(null);
        });
    });

    describe("indexAtPosition()", function(){
        it("get index of cell by x, y", function(){
            var board = new Board(3, 2);
            expect(board.indexAtPosition(0, 0)).to.equal(0);
            expect(board.indexAtPosition(1, 0)).to.equal(1);
            expect(board.indexAtPosition(2, 0)).to.equal(2);
            expect(board.indexAtPosition(0, 1)).to.equal(3);
            expect(board.indexAtPosition(1, 1)).to.equal(4);
            expect(board.indexAtPosition(2, 1)).to.equal(5);
        });
    });

    describe("xAtIndex()", function(){
        it("get x coord of cell by index", function(){
            var board = new Board(3, 2);
            expect(board.xAtIndex(0)).to.equal(0);
            expect(board.xAtIndex(1)).to.equal(1);
            expect(board.xAtIndex(2)).to.equal(2);
            expect(board.xAtIndex(3)).to.equal(0);
            expect(board.xAtIndex(4)).to.equal(1);
            expect(board.xAtIndex(5)).to.equal(2);
        });
    });

    describe("yAtIndex()", function(){
        it("get y coord of cell by index", function(){
            var board = new Board(3, 2);
            expect(board.yAtIndex(0)).to.equal(0);
            expect(board.yAtIndex(1)).to.equal(0);
            expect(board.yAtIndex(2)).to.equal(0);
            expect(board.yAtIndex(3)).to.equal(1);
            expect(board.yAtIndex(4)).to.equal(1);
            expect(board.yAtIndex(5)).to.equal(1);
        });
    });
});

