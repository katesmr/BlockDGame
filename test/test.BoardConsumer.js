var expect = require("chai").expect;
var BoardConsumer = require("../src/BoardConsumer.js");
var Cell = require("../src/core/Cell.js");
var commonEventNames = require("../src/core/commonEventNames.js");

describe("BoardConsumer", function(){
    describe("new BoardConsumer", function(){
        it("creates Board object", function(){
            var boardConsumer = new BoardConsumer(1, 1);
            boardConsumer.generate(1);

            expect(boardConsumer.constructor).to.equal(BoardConsumer);
        });
    });

    describe("sendCellsValue()", function(){
        it("check notify count", function(){
            var counter = 0;
            var width = 2;
            var height = 3;
            var boardConsumer = new BoardConsumer(width, height);
            boardConsumer.generate(1);

            boardConsumer.subscribe(commonEventNames.E_CELL_VALUE, function(eventName, data){
                ++counter;
                if(data.index === (width * height - 1)){
                    // when get all cell, counter must be equal total cells count
                    expect(counter).to.equal(width * height);
                }
            });
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall in one row board", function(){
            var boardConsumer = new BoardConsumer(2, 1);
            boardConsumer.generate(2);
            boardConsumer.at(0).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall over one cell", function(){
            var boardConsumer = new BoardConsumer(1, 3);
            boardConsumer.generate(2);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);

            boardConsumer.fall();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
        });
    });

    describe("fall()", function(){
        it("check indexes of free cell after fall over two cells", function(){
            var boardConsumer = new BoardConsumer(2, 4);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(1, 4);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(3, 4);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(2, 5);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(2, 5);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(3, 3);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(3, 4);
            boardConsumer.generate(2);
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
            var boardConsumer = new BoardConsumer(3, 4);
            boardConsumer.generate(6);
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
            var boardConsumer = new BoardConsumer(3, 3);
            boardConsumer.generate(6);
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
            var boardConsumer = new BoardConsumer(3, 1);
            boardConsumer.generate(2);
            boardConsumer.at(1).setValue(1);
            boardConsumer.at(2).setValue(1);

            boardConsumer.destroyAtIndexes([1, 2]);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
        });
    });

    describe("destroyAtIndexes()", function(){
        it("check indexes of free cells after destruction all board", function(){
            var boardConsumer = new BoardConsumer(2, 2);
            boardConsumer.generate(2);
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

    describe("swapColumns()", function(){
        it("check cells value after swap columns", function(){
            var boardConsumer = new BoardConsumer(2, 3);
            boardConsumer.generate(2);
            boardConsumer.at(0).setValue(1);
            boardConsumer.at(1).setValue(2);
            boardConsumer.at(2).setValue(1);
            boardConsumer.at(3).setValue(2);
            boardConsumer.at(4).setValue(1);
            boardConsumer.at(5).setValue(2);

            boardConsumer.swapColumns(4, 5);
            expect(boardConsumer.at(0).getValue()).to.equal(2);
            expect(boardConsumer.at(1).getValue()).to.equal(1);
            expect(boardConsumer.at(2).getValue()).to.equal(2);
            expect(boardConsumer.at(3).getValue()).to.equal(1);
            expect(boardConsumer.at(4).getValue()).to.equal(2);
            expect(boardConsumer.at(5).getValue()).to.equal(1);
        });
    });

    describe("swapColumns()", function(){
        it("check count notifications after swap columns", function(){
            var counter = 0;
            var boardConsumer = new BoardConsumer(3, 3);
            boardConsumer.generate(2);

            boardConsumer.subscribe(commonEventNames.E_SHIFT_CELL, function(eventName, data){
                ++counter;
                if(data.index === 0){
                    // when get all cell, counter must be equal total cells count
                    expect(counter).to.equal(6);
                }
            });

            boardConsumer.swapColumns(6, 8);
        });
    });

    describe("slide()", function(){
        it("check column indexes after try to shift no free cells", function(){
            var boardConsumer = new BoardConsumer(3, 2);
            boardConsumer.generate(3);
            // after trying slide no empty columns, nothing should be change
            boardConsumer.slide();
            expect(boardConsumer.at(0).isFree()).to.eql(false);
            expect(boardConsumer.at(1).isFree()).to.eql(false);
            expect(boardConsumer.at(2).isFree()).to.eql(false);
            expect(boardConsumer.at(3).isFree()).to.eql(false);
            expect(boardConsumer.at(4).isFree()).to.eql(false);
            expect(boardConsumer.at(5).isFree()).to.eql(false);
        });
    });

    describe("slide()", function(){
        it("check column indexes after shift", function(){
            var boardConsumer = new BoardConsumer(6, 2);
            boardConsumer.generate(3);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(8).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(10).setValue(Cell.FREE_CELL_VALUE);
            // slide across single free columns
            boardConsumer.slide();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(true);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(true);
        });
    });

    describe("slide()", function(){
        it("check column indexes after shift", function(){
            var boardConsumer = new BoardConsumer(6, 2);
            boardConsumer.generate(3);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(8).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(9).setValue(Cell.FREE_CELL_VALUE);
            // slide across single free columns
            boardConsumer.slide();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(true);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(true);
        });
    });

    describe("slide()", function(){
        it("check column indexes after shift", function(){
            var boardConsumer = new BoardConsumer(6, 2);
            boardConsumer.generate(3);
            boardConsumer.at(0).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(9).setValue(Cell.FREE_CELL_VALUE);
            // slide across single free columns
            boardConsumer.slide();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(5).isFree()).to.eql(true);
            expect(boardConsumer.at(6).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(true);
        });
    });

    describe("slide()", function(){
        it("check column indexes after shift", function(){
            var boardConsumer = new BoardConsumer(10, 2);
            boardConsumer.generate(3);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(4).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(5).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(7).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(8).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(12).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(14).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(15).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(17).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(18).setValue(Cell.FREE_CELL_VALUE);
            // slide across a few count of free columns
            boardConsumer.slide();
            expect(boardConsumer.at(10).isFree()).to.eql(true);
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(17).isFree()).to.eql(true);
            expect(boardConsumer.at(7).isFree()).to.eql(true);
            expect(boardConsumer.at(18).isFree()).to.eql(true);
            expect(boardConsumer.at(8).isFree()).to.eql(true);
            expect(boardConsumer.at(19).isFree()).to.eql(true);
            expect(boardConsumer.at(9).isFree()).to.eql(true);
        });
    });

    describe("slide()", function(){
        it("check column indexes after shift", function(){
            var boardConsumer = new BoardConsumer(12, 2);
            boardConsumer.generate(3);
            boardConsumer.at(1).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(2).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(3).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(5).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(6).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(8).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(9).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(13).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(14).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(15).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(17).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(18).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(20).setValue(Cell.FREE_CELL_VALUE);
            boardConsumer.at(21).setValue(Cell.FREE_CELL_VALUE);
            // slide across a few count of free columns
            boardConsumer.slide();
            expect(boardConsumer.at(0).isFree()).to.eql(true);
            expect(boardConsumer.at(1).isFree()).to.eql(true);
            expect(boardConsumer.at(2).isFree()).to.eql(true);
            expect(boardConsumer.at(3).isFree()).to.eql(true);
            expect(boardConsumer.at(9).isFree()).to.eql(true);
            expect(boardConsumer.at(10).isFree()).to.eql(true);
            expect(boardConsumer.at(11).isFree()).to.eql(true);
            expect(boardConsumer.at(12).isFree()).to.eql(true);
            expect(boardConsumer.at(13).isFree()).to.eql(true);
            expect(boardConsumer.at(14).isFree()).to.eql(true);
            expect(boardConsumer.at(15).isFree()).to.eql(true);
            expect(boardConsumer.at(21).isFree()).to.eql(true);
            expect(boardConsumer.at(22).isFree()).to.eql(true);
            expect(boardConsumer.at(23).isFree()).to.eql(true);
        });
    });
});
