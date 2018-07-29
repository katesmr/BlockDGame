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
        it("check Board cells type", function(){
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

    describe("at()", function(){
        it("get Board cells", function(){
            var board = new Board(2, 3);

            expect(board.at(0).getValue()).to.equal(Cell.FREE_CELL_VALUE);
            expect(board.at(0).isFree()).to.equal(true);
            expect(board.at(0).getPrice()).to.equal(Cell.PRICE_X1);
            expect(board.at(0).isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(board.at(0).equals(board.at(0))).to.equal(true);

            board.at(1).setValue(1);
            expect(board.at(1).getValue()).to.equal(1);
            expect(board.at(1).isFree()).to.equal(false);
            expect(board.at(1).getPrice()).to.equal(Cell.PRICE_X1);
            expect(board.at(1).isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(board.at(1).equals(board.at(0))).to.equal(false);
            expect(board.at(1).equals(board.at(1))).to.equal(true);

            board.at(2).transform(Cell.TYPE_EXTRA_BAD);
            expect(board.at(2).getValue()).to.equal(Cell.FREE_CELL_VALUE);
            expect(board.at(2).isFree()).to.equal(true);
            expect(board.at(2).getPrice()).to.equal(Cell.PRICE_X2);
            expect(board.at(2).isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(board.at(2).equals(board.at(0))).to.equal(true);
            expect(board.at(2).equals(board.at(1))).to.equal(true);
            expect(board.at(2).equals(board.at(2))).to.equal(true);

            board.at(3).setValue(3);
            expect(board.at(3).getValue()).to.equal(3);
            expect(board.at(3).isFree()).to.equal(false);
            expect(board.at(3).getPrice()).to.equal(Cell.PRICE_X1);
            expect(board.at(3).isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(board.at(3).equals(board.at(0))).to.equal(false);
            expect(board.at(3).equals(board.at(1))).to.equal(false);
            expect(board.at(3).equals(board.at(2))).to.equal(true);
            expect(board.at(3).equals(board.at(3))).to.equal(true);

            board.at(4).transform(Cell.TYPE_EXTRA_BONUS);
            expect(board.at(4).getValue()).to.equal(Cell.FREE_CELL_VALUE);
            expect(board.at(4).isFree()).to.equal(true);
            expect(board.at(4).getPrice()).to.equal(Cell.PRICE_X2);
            expect(board.at(4).isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
            expect(board.at(4).equals(board.at(0))).to.equal(true);
            expect(board.at(4).equals(board.at(1))).to.equal(true);
            expect(board.at(4).equals(board.at(2))).to.equal(true);
            expect(board.at(4).equals(board.at(3))).to.equal(true);
            expect(board.at(4).equals(board.at(4))).to.equal(true);

            board.at(5).setValue(5);
            board.at(5).transform(Cell.TYPE_EXTRA_BONUS);
            board.at(5).increasePrice();
            expect(board.at(5).getValue()).to.equal(5);
            expect(board.at(5).isFree()).to.equal(false);
            expect(board.at(5).getPrice()).to.equal(Cell.PRICE_X3);
            expect(board.at(5).isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
            expect(board.at(5).equals(board.at(0))).to.equal(true);
            expect(board.at(5).equals(board.at(1))).to.equal(true);
            expect(board.at(5).equals(board.at(2))).to.equal(true);
            expect(board.at(5).equals(board.at(3))).to.equal(true);
            expect(board.at(5).equals(board.at(4))).to.equal(true);
            expect(board.at(5).equals(board.at(5))).to.equal(true);
        });
    });

    describe("at()", function(){
        it("get Board cells by invalid index", function(){
            var board = new Board(2, 3);
            expect(board.at(-1)).to.equal(null);
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

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(5, 3);
            board.at(2).setValue(1);
            board.at(3).setValue(1);
            board.at(4).setValue(1);
            board.at(6).setValue(1);
            board.at(7).setValue(1);
            board.at(8).setValue(1);
            board.at(9).setValue(1);
            board.at(12).setValue(1);

            indexes = board.getMatchIndexes(8);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([2, 3, 4, 6, 7, 8, 9, 12]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(4, 3);
            board.at(1).setValue(1);
            board.at(2).setValue(1);
            board.at(3).setValue(1);
            board.at(7).setValue(1);
            board.at(11).setValue(1);

            indexes = board.getMatchIndexes(3);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([1, 2, 3, 7, 11]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(5, 3);
            board.at(2).setValue(1);
            board.at(5).setValue(1);
            board.at(6).setValue(1);
            board.at(7).setValue(1);
            board.at(8).setValue(1);
            board.at(12).setValue(1);

            indexes = board.getMatchIndexes(6);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([2, 5, 6, 7, 8, 12]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 5);
            board.at(1).setValue(1);
            board.at(2).setValue(1);
            board.at(4).setValue(1);
            board.at(5).setValue(1);
            board.at(6).setValue(1);
            board.at(9).setValue(1);
            board.at(11).setValue(1);
            board.at(12).setValue(1);
            board.at(13).setValue(1);
            board.at(14).setValue(1);

            indexes = board.getMatchIndexes(6);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([6, 9, 11, 12, 13, 14]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 5);
            board.at(0).setValue(1);
            board.at(3).setValue(1);
            board.at(4).setValue(1);
            board.at(6).setValue(1);
            board.at(8).setValue(1);
            board.at(10).setValue(1);
            board.at(11).setValue(1);
            board.at(13).setValue(1);
            board.at(14).setValue(1);

            indexes = board.getMatchIndexes(7);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([7]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 5);
            board.at(0).setValue(1);
            board.at(3).setValue(1);
            board.at(6).setValue(1);
            board.at(8).setValue(1);
            board.at(10).setValue(1);
            board.at(13).setValue(1);
            board.at(14).setValue(1);

            indexes = board.getMatchIndexes(7);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([1, 2, 4, 5, 7]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 2);
            board.at(2).setValue(1);
            board.at(3).setValue(1);
            board.at(4).setValue(1);

            indexes = board.getMatchIndexes(2);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([2]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 2);
            board.at(1).setValue(1);

            indexes = board.getMatchIndexes(1);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([1]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 3);

            indexes = board.getMatchIndexes(4);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });

    describe("getMatchIndexes()", function(){
        it("find indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 3);

            indexes = board.getMatchIndexes(9);
            expect(indexes).to.eql([]);
        });
    });

    describe("findMatchIndexes()", function(){
        it("find first match indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 4);
            board.at(2).setValue(1);
            board.at(5).setValue(1);
            board.at(8).setValue(1);
            board.at(10).setValue(1);
            board.at(1).setValue(2);
            board.at(4).setValue(2);
            board.at(11).setValue(2);

            indexes = board.findMatchIndexes(3);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([2, 5, 8]);
        });
    });

    describe("findMatchIndexes()", function(){
        it("find first match indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 4);
            board.at(0).setValue(0);
            board.at(3).setValue(0);
            board.at(6).setValue(0);
            board.at(7).setValue(0);
            board.at(2).setValue(1);
            board.at(5).setValue(1);
            board.at(8).setValue(1);
            board.at(10).setValue(1);
            board.at(1).setValue(2);
            board.at(4).setValue(2);
            board.at(11).setValue(2);

            indexes = board.findMatchIndexes(3);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([0, 3, 6, 7]);
        });
    });

    describe("findMatchIndexes()", function(){
        it("find first match indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 4);
            board.at(5).setValue(1);
            board.at(8).setValue(1);
            board.at(10).setValue(1);
            board.at(1).setValue(2);
            board.at(4).setValue(2);
            board.at(11).setValue(2);

            indexes = board.findMatchIndexes(3);
            indexes.sort(function(a, b){
                return a - b;
            });
            expect(indexes).to.eql([]);
        });
    });

    describe("findMatchIndexes()", function(){
        it("find first match indexes of equal cells", function(){
            var indexes;
            var board = new Board(3, 4);

            indexes = board.findMatchIndexes(3);
            expect(indexes).to.eql([]);
        });
    });
});

