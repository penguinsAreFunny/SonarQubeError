/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { property1: /**/ } = foo;

goTo.marker();
verify.completionListAllowsNewIdentifier();
verify.completionListIsEmpty();