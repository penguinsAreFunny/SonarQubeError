//// [generatorOverloads5.ts]
module M {
    function f(s: string): Iterable<any>;
    function f(s: number): Iterable<any>;
    function* f(s: any): Iterable<any> { }
}

//// [generatorOverloads5.js]
var M;
(function (M) {
    function* f(s) { }
})(M || (M = {}));
