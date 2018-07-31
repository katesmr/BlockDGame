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

    describe("fall()", function(){
        it("check indexes of free cell after fall in one row board", function(){
            var boardConsumer = new BoardConsumer(2, 1, 2);
            boardConsumer.at(0).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall over one cell", function(){
            var boardConsumer = new BoardConsumer(1, 3, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall over two cells", function(){
            var boardConsumer = new BoardConsumer(2, 4, 2);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(5).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(false);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall over three cells", function(){
            var boardConsumer = new BoardConsumer(1, 4, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cells beside of each other after fall", function(){
            var boardConsumer = new BoardConsumer(3, 4, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(7).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(11).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(false);
            expect(boardConsumer.at(4).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            expect(boardConsumer.at(9).isFree()).to.eql(false);
            expect(boardConsumer.at(10).isFree()).to.eql(false);
            expect(boardConsumer.at(11).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cells with different places after fall", function(){
            var boardConsumer = new BoardConsumer(2, 5, 2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(7).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(false);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            expect(boardConsumer.at(9).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cells after fall with bonus cell", function(){
            var boardConsumer = new BoardConsumer(2, 5, 2);
            boardConsumer.at(2).transform(Cell.TYPE_EXTRA_BONUS);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(5).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(7).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(true);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(false);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            expect(boardConsumer.at(9).isFree()).to.eql(false);
            // check bonus cell after falling, it must be have a new index (bellow bonus cell)
            expect(boardConsumer.at(6).isType(Cell.TYPE_EXTRA_BONUS)).to.eql(true);
            expect(boardConsumer.at(6).getPrice()).to.eql(Cell.PRICE_X2);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cells after fall with bad cell", function(){
            var boardConsumer = new BoardConsumer(3, 3, 2);
            boardConsumer.at(1).transform(Cell.TYPE_EXTRA_BAD);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(false);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            // check bad cell after falling, it must be have a new index (bellow bad cell)
            expect(boardConsumer.at(4).isType(Cell.TYPE_EXTRA_BAD)).to.eql(true);
            expect(boardConsumer.at(4).getPrice()).to.eql(Cell.PRICE_X2);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction without bonus/bad type", function(){
            var boardConsumer = new BoardConsumer(3, 4, 2);
            boardConsumer.at(1).setValue(1);
            boardConsumer.at(4).setValue(1);
            boardConsumer.at(6).setValue(1);
            boardConsumer.at(7).setValue(1);

            boardConsumer.destroyAtIndexes([4, 1, 7, 6]);
            expect(boardConsumer.at(0).isFree()).to.eql(false);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
            expect(boardConsumer.at(3).isFree()).to.eql(false);
            expect(boardConsumer.at(4).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            expect(boardConsumer.at(9).isFree()).to.eql(false);
            expect(boardConsumer.at(10).isFree()).to.eql(false);
            expect(boardConsumer.at(11).isFree()).to.eql(false);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction with bonus type", function(){
            var boardConsumer = new BoardConsumer(3, 4, 6);
            boardConsumer.at(0).setValue(1);
            boardConsumer.at(3).setValue(1);
            boardConsumer.at(4).setValue(1);
            boardConsumer.at(6).setValue(1);
            boardConsumer.at(7).setValue(1);
            boardConsumer.at(10).setValue(1);

            boardConsumer.destroyAtIndexes([4, 7, 10, 6, 3, 0], true, 3);
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            expect(boardConsumer.at(9).isFree()).to.eql(false);
            expect(boardConsumer.at(10).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(false);
            // check transformed cell selected by user (first index of it cell in first parameter of function)
            expect(boardConsumer.at(4).isType(Cell.TYPE_EXTRA_BONUS)).to.eql(true);
            expect(boardConsumer.at(4).getPrice()).to.eql(Cell.PRICE_X5);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction with bad type", function(){
            var boardConsumer = new BoardConsumer(3, 3, 6);
            boardConsumer.at(4).setValue(1);
            boardConsumer.at(5).setValue(1);

            boardConsumer.destroyAtIndexes([5, 4], false, 2);
            expect(boardConsumer.at(0).isFree()).to.eql(false);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
            expect(boardConsumer.at(3).isFree()).to.eql(false);
            expect(boardConsumer.at(4).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
            expect(boardConsumer.at(6).isFree()).to.eql(false);
            expect(boardConsumer.at(7).isFree()).to.eql(false);
            expect(boardConsumer.at(8).isFree()).to.eql(false);
            // check transformed cell selected by user (first index of it cell in first parameter of function)
            expect(boardConsumer.at(5).isType(Cell.TYPE_EXTRA_BAD)).to.eql(true);
            expect(boardConsumer.at(5).getPrice()).to.eql(Cell.PRICE_X4);

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
