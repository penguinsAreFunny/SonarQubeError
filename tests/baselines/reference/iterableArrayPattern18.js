//// [iterableArrayPattern18.ts]
function fun([a, b]: Bar[]) { }
fun(new FooIterator);
class Bar { x }
class Foo extends Bar { y }
class FooIterator {
    next() {
        return {
            value: new Foo,
            done: false
        };
    }

    [Symbol.iterator]() {
        return this;
    }
}

//// [iterableArrayPattern18.js]
function fun([a, b]) { }
fun(new FooIterator);
class Bar {
}
class Foo extends Bar {
}
class FooIterator {
    next() {
        return {
            value: new Foo,
            done: false
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
