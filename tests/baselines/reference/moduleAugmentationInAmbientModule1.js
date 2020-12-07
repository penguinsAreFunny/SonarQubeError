//// [tests/cases/compiler/moduleAugmentationInAmbientModule1.ts] ////

//// [O.d.ts]


declare module "Observable" {
    class Observable {}
}

declare module "M" {
    class Cls { x: number }
}

declare module "Map" {
    import { Cls } from "M";
    module "Observable" {
        interface Observable {
            foo(): Cls;
        }
    }
}

//// [main.ts]
/// <reference path="O.d.ts" />

import {Observable} from "Observable";
let x: Observable;
x.foo().x;


//// [main.js]
/// <reference path="O.d.ts" />
"use strict";
var x;
x.foo().x;


//// [main.d.ts]
/// <reference path="O.d.ts" />
