//// [tests/cases/compiler/importDeclarationUsedAsTypeQuery.ts] ////

//// [importDeclarationUsedAsTypeQuery_require.ts]
export class B {
    id: number;
}

//// [importDeclarationUsedAsTypeQuery_1.ts]
///<reference path='importDeclarationUsedAsTypeQuery_require.ts'/>
import a = require('./importDeclarationUsedAsTypeQuery_require');
export var x: typeof a;


//// [importDeclarationUsedAsTypeQuery_require.js]
"use strict";
var B = (function () {
    function B() {
    }
    return B;
}());
exports.B = B;
//// [importDeclarationUsedAsTypeQuery_1.js]
"use strict";


//// [importDeclarationUsedAsTypeQuery_require.d.ts]
export declare class B {
    id: number;
}
//// [importDeclarationUsedAsTypeQuery_1.d.ts]
/// <reference path="importDeclarationUsedAsTypeQuery_require.d.ts" />
import a = require('./importDeclarationUsedAsTypeQuery_require');
export declare var x: typeof a;
