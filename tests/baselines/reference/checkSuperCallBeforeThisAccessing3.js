//// [checkSuperCallBeforeThisAccessing3.ts]
class Based { }
class Derived extends Based {
    public x: number;
    constructor() {
        class innver {
            public y: boolean;
            constructor() {
                this.y = true;
            }
        }
        super();
        this.x = 10;
        var that = this;
    }
}

//// [checkSuperCallBeforeThisAccessing3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Based = (function () {
    function Based() {
    }
    return Based;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var innver = (function () {
            function innver() {
                this.y = true;
            }
            return innver;
        }());
        _super.call(this);
        this.x = 10;
        var that = this;
    }
    return Derived;
}(Based));
