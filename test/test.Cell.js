var Cell = require("../src/core/Cell.js");
var expect = require("chai").expect;

describe("Cell", function(){
    describe("new Cell", function(){
        it("creates Cell object", function(){
            var cell = new Cell();

            expect(cell.constructor).to.equal(Cell);
        });
    });

    describe("isType()", function(){
        it("checks default type", function(){
            var cell = new Cell();
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks normal type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_NORMAL);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks bad type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BAD);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });

    describe("isType()", function(){
        it("checks bonus type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(true);
        });
    });

    describe("isType()", function(){
        it("checks double change type", function(){
            var cell = new Cell();
            cell.transform(Cell.TYPE_EXTRA_BONUS);
            cell.transform(Cell.TYPE_NORMAL); // set back
            expect(cell.isType(Cell.TYPE_NORMAL)).to.equal(true);
            expect(cell.isType(Cell.TYPE_EXTRA_BAD)).to.equal(false);
            expect(cell.isType(Cell.TYPE_EXTRA_BONUS)).to.equal(false);
        });
    });
});

