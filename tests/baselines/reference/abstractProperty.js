//// [abstractProperty.ts]
interface A {
    prop: string;
    raw: string;
    m(): void;
}
abstract class B implements A {
    abstract prop: string;
    abstract raw: string;
    abstract readonly ro: string;
    abstract get readonlyProp(): string;
    abstract set readonlyProp(val: string);
    abstract m(): void;
}
class C extends B {
    get prop() { return "foo"; }
    set prop(v) { }
    raw = "edge";
    readonly ro = "readonly please";
    readonlyProp: string; // don't have to give a value, in fact
    m() { }
}

//// [abstractProperty.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "readonlyProp", {
        get: function () { },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    return B;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
        this.raw = "edge";
        this.ro = "readonly please";
    }
    Object.defineProperty(C.prototype, "prop", {
        get: function () { return "foo"; },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    C.prototype.m = function () { };
    return C;
}(B));
