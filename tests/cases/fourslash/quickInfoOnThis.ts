/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function wrapper(wrapped: { (): void; }) { }
////class Foo {
////    n: number;
////    public explicitThis(this: this) {
////        wrapper(
////            function explicitVoid(this: void) {
////                console.log(th/*1*/is);
////            }
////        )
////        console.log(th/*2*/is);
////    }
////    public explicitInterface(th/*3*/is: Restricted) {
////        console.log(th/*4*/is);
////    }
////    public explicitClass(th/*5*/is: Foo) {
////        console.log(th/*6*/is);
////    }
////}
////class Bar<T> {
////    public explicitThis(this: this) {
////        console.log(th/*7*/is);
////    }
////    public explicitClass(this: Bar<T>) {
////        console.log(thi/*8*/s);
////    }
////}
////
////function implicitAny(x: number): void {
////    return th/*9*/is;
////}
////function explicitVoid(th/*10*/is: void, x: number): void {
////    return th/*11*/is;
////}
////function explicitInterface(th/*12*/is: Restricted): void {
////    console.log(thi/*13*/s);
////}
////function explicitLiteral(th/*14*/is: { n: number }): void {
////    console.log(th/*15*/is);
////}
////
////interface ContextualInterface {
////    m: number;
////    method(this: this, n: number);
////}
////let o: ContextualInterface = {
////    m: 12,
////    method(n) {
////        let x = this/*16*/.m;
////    }
////}
////interface ContextualInterface2 {
////    (this: void, n: number): void;
////}
////let contextualInterface2: ContextualInterface2 = function (th/*17*/is, n) { }

goTo.marker('1');
verify.quickInfoIs('void');
goTo.marker('2');
verify.quickInfoIs('this: this');
goTo.marker('3');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('4');
verify.quickInfoIs('this: Restricted');
goTo.marker('5');
verify.quickInfoIs('(parameter) this: Foo');
goTo.marker('6');
verify.quickInfoIs('this: Foo');
goTo.marker('7');
verify.quickInfoIs('this: this');
goTo.marker('8');
verify.quickInfoIs('this: Bar<T>');
goTo.marker('9');
verify.quickInfoIs('any');
goTo.marker('10');
verify.quickInfoIs('(parameter) this: void');
goTo.marker('11');
verify.quickInfoIs('void');
goTo.marker('12');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('13');
verify.quickInfoIs('this: Restricted');
goTo.marker('14');

verify.quickInfoIs('(parameter) this: {\n    n: number;\n}');
goTo.marker('15');
verify.quickInfoIs('this: {\n    n: number;\n}');

goTo.marker('16');
verify.quickInfoIs('this: ContextualInterface');
goTo.marker('17');
verify.quickInfoIs('(parameter) this: void');
