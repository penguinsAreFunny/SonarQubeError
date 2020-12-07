//// [emitSuperCallBeforeEmitPropertyDeclaration1.ts]
class A {
    blub = 6;
}


class B extends A {

    blub = 12;

    constructor() {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}

//// [emitSuperCallBeforeEmitPropertyDeclaration1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
        this.blub = 6;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        "use strict";
        'someStringForEgngInject';
        _super.call(this);
        this.blub = 12;
    }
    return B;
}(A));
