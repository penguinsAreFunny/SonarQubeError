//// [parserGenericsInTypeContexts1.ts]
class C extends A<T> implements B<T> {
}

var v1: C<T>;
var v2: D<T> = null;
var v3: E.F<T>;
var v3: G.H.I<T>;
var v6: K<T>[];


function f1(a: E<T>) {
}

function f2(): F<T> {
}



//// [parserGenericsInTypeContexts1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
}(A));
var v1;
var v2 = null;
var v3;
var v3;
var v6;
function f1(a) {
}
function f2() {
}
