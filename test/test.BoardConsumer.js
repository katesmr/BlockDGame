var BoardConsumer = require("../src/BoardConsumer.js");
var Cell = require("../src/core/Cell.js");
var expect = require("chai").expect;

describe("BoardConsumer", function(){
    describe("new BoardConsumer", function(){
        it("creates Board object", function(){
            var board = new BoardConsumer(1, 1, 1);

            expect(board.constructor).to.equal(BoardConsumer);
        });
    });

    describe("_generate()", function(){
        it("check BoardConsumer generate for board values", function(){

        });
    });

    describe("fallCell()", function(){
        it("check indexes of free cell after fall in one row board", function(){
            var boardConsumer = new BoardConsumer(2, 1, 2);
            boardConsumer.at(0).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fallCell();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
        });
    });

    describe("fallCell()", function(){
        it("check indexes of free cell after fall over one cell", function(){
            var boardConsumer = new BoardConsumer(1, 3, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fallCell();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
        });
    });

    describe("fallCell()", function(){
        it("check indexes of free cell after fall over two cells", function(){
            var boardConsumer = new BoardConsumer(2, 4, 2);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(5).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fallCell();
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
        });
    });

    describe("fallCell()", function(){
        it("check indexes of free cell after fall over three cells", function(){
            var boardConsumer = new BoardConsumer(1, 4, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fallCell();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
        });
    });

    describe("fallCell()", function(){
        it("check indexes of free cells after fall", function(){
            var boardConsumer = new BoardConsumer(3, 4, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(7).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(11).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fallCell();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(true);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction", function(){
            var boardConsumer = new BoardConsumer(3, 4, 2);
            boardConsumer.at(1).setValue(1);
            boardConsumer.at(4).setValue(1);
            boardConsumer.at(6).setValue(1);
            boardConsumer.at(7).setValue(1);

            boardConsumer.destroyAtIndexes([1, 4, 6, 7]);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(true);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction in one row board", function(){
            var boardConsumer = new BoardConsumer(3, 1, 2);
            boardConsumer.at(1).setValue(1);
            boardConsumer.at(2).setValue(1);

            boardConsumer.destroyAtIndexes([1, 2]);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction all board", function(){
            var boardConsumer = new BoardConsumer(2, 2, 2);
            boardConsumer.at(0).setValue(1);
            boardConsumer.at(1).setValue(1);
            boardConsumer.at(2).setValue(1);
            boardConsumer.at(3).setValue(1);

            boardConsumer.destroyAtIndexes([0, 1, 2, 3]);
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
        });
    });
});

