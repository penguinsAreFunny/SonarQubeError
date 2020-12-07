//// [noImplicitAnyDestructuringVarDeclaration.ts]
var [a], {b}, c, d; // error

var [a1 = undefined], {b1 = null}, c1 = undefined, d1 = null; // error

var [a2]: [any], {b2}: { b2: any }, c2: any, d2: any;

var {b3}: { b3 }, c3: { b3 }; // error in type instead

var [a1] = [undefined], {b1} = { b1: null }, c1 = undefined, d1 = null; // error

//// [noImplicitAnyDestructuringVarDeclaration.js]
var a = (void 0)[0], b = (void 0).b, c, d; // error
var _a = (void 0)[0], a1 = _a === void 0 ? undefined : _a, _b = (void 0).b1, b1 = _b === void 0 ? null : _b, c1 = undefined, d1 = null; // error
var a2 = (void 0)[0], b2 = (void 0).b2, c2, d2;
var b3 = (void 0).b3, c3; // error in type instead
var a1 = [undefined][0], b1 = { b1: null }.b1, c1 = undefined, d1 = null; // error
