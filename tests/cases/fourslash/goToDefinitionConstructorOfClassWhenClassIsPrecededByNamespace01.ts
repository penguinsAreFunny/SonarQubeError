/// <reference path='fourslash.ts' />

////namespace Foo {
////    export var x;
////}
////
////class Foo {
////    /*definition*/constructor() {
////    }
////}
////
////var x = new /*usage*/Foo();

goTo.marker("usage");
goTo.definition();
verify.caretAtMarker("definition");