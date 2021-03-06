//// [iteratorSpreadInCall10.ts]
foo(...new SymbolIterator);

function foo<T>(s: T[]) { return s[0] }

class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

//// [iteratorSpreadInCall10.js]
foo(...new SymbolIterator);
function foo(s) { return s[0]; }
class SymbolIterator {
    next() {
        return {
            value: Symbol(),
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
