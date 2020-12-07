﻿/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

declare namespace chai.assert {
    function deepEqual(actual: any, expected: any): void;
}

describe('PreProcessFile:', function () {
    function test(sourceText: string, readImportFile: boolean, detectJavaScriptImports: boolean, expectedPreProcess: ts.PreProcessedFileInfo): void {
        var resultPreProcess = ts.preProcessFile(sourceText, readImportFile, detectJavaScriptImports);

        var resultIsLibFile = resultPreProcess.isLibFile;
        var resultImportedFiles = resultPreProcess.importedFiles;
        var resultReferencedFiles = resultPreProcess.referencedFiles;

        var expectedIsLibFile = expectedPreProcess.isLibFile;
        var expectedImportedFiles = expectedPreProcess.importedFiles;
        var expectedReferencedFiles = expectedPreProcess.referencedFiles;

        assert.equal(resultIsLibFile, expectedIsLibFile, "Pre-processed file has different value for isLibFile. Expected: " + expectedPreProcess + ". Actual: " + resultIsLibFile);

        checkFileReferenceList("Imported files", expectedImportedFiles, resultImportedFiles);
        checkFileReferenceList("Referenced files", expectedReferencedFiles, resultReferencedFiles);

        assert.deepEqual(resultPreProcess.ambientExternalModules, expectedPreProcess.ambientExternalModules);
    }

    function checkFileReferenceList(kind: string, expected: ts.FileReference[], actual: ts.FileReference[]) {
        if (expected === actual) {
            return;
        }
        if (!expected) {
            assert.isTrue(false, `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
        assert.equal(actual.length, expected.length, `[${kind}] Actual array's length does not match expected length. Expected files: ${JSON.stringify(expected)}, actual files: ${JSON.stringify(actual)}`);

        for (var i = 0; i < expected.length; ++i) {
            var actualReference = actual[i];
            var expectedReference = expected[i];
            assert.equal(actualReference.fileName, expectedReference.fileName, `[${kind}] actual file path does not match expected. Expected: "${expectedReference.fileName}". Actual: "${actualReference.fileName}".`);
            assert.equal(actualReference.pos, expectedReference.pos, `[${kind}] actual file start position does not match expected. Expected: "${expectedReference.pos}". Actual: "${actualReference.pos}".`);
            assert.equal(actualReference.end, expectedReference.end, `[${kind}] actual file end pos does not match expected. Expected: "${expectedReference.end}". Actual: "${actualReference.end}".`);
        }
    }
    
    describe("Test preProcessFiles,", function () {
        it("Correctly return referenced files from triple slash", function () {
            test("///<reference path = \"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "///<reference path=\"refFile3.ts\" />" + "\n" + "///<reference path= \"..\\refFile4d.ts\" />", 
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 37 }, { fileName: "refFile2.ts", pos: 38, end: 73 },
                        { fileName: "refFile3.ts", pos: 74, end: 109 }, { fileName: "..\\refFile4d.ts", pos: 110, end: 150 }],
                    importedFiles: <ts.FileReference[]>[],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Do not return reference path because of invalid triple-slash syntax", function () {
            test("///<reference path\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\">" + "\n" + "///<referencepath=\"refFile3.ts\" />" + "\n" + "///<reference pat= \"refFile4d.ts\" />",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: <ts.FileReference[]>[],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Correctly return imported files", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: [{ fileName: "r1.ts", pos: 20, end: 25 }, { fileName: "r2.ts", pos: 49, end: 54 }, { fileName: "r3.ts", pos: 78, end: 83 },
                        { fileName: "r4.ts", pos: 106, end: 111 }, { fileName: "r5.ts", pos: 138, end: 143 }],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Do not return imported files if readImportFiles argument is false", function () {
            test("import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\"); import i3= require(\"r3.ts\"); import i4=require(\"r4.ts\"); import i5 = require  (\"r5.ts\");",
                /* readImports */ false,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: <ts.FileReference[]>[],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Do not return import path because of invalid import syntax", function () {
            test("import i1 require(\"r1.ts\"); import = require(\"r2.ts\") import i3= require(\"r3.ts\"); import i5",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: <ts.FileReference[]>[],
                    importedFiles: [{ fileName: "r3.ts", pos: 73, end: 78 }],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path =\"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import i2 =require(\"r2.ts\");",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 35 }, { fileName: "refFile2.ts", pos: 36, end: 71 }],
                    importedFiles: [{ fileName: "r1.ts", pos: 92, end: 97 }, { fileName: "r2.ts", pos: 121, end: 126 }],
                    ambientExternalModules: undefined,
                    isLibFile: false
                });
        }),

        it("Correctly return referenced files and import files even with some invalid syntax", function () {
            test("///<reference path=\"refFile1.ts\" />" + "\n" + "///<reference path \"refFile2.ts\"/>" + "\n" + "import i1 = require(\"r1.ts\"); import = require(\"r2.ts\"); import i2 = require(\"r3.ts\");",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [{ fileName: "refFile1.ts", pos: 0, end: 35 }],
                    importedFiles: [{ fileName: "r1.ts", pos: 91, end: 96 }, { fileName: "r3.ts", pos: 148, end: 153 }],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });

        it("Correctly return ES6 imports", function () {
            test("import * as ns from \"m1\";" + "\n" +
                "import def, * as ns from \"m2\";" + "\n" +
                "import def from \"m3\";" + "\n" +
                "import {a} from \"m4\";" + "\n" +
                "import {a as A} from \"m5\";" + "\n" +
                "import {a as A, b, c as C} from \"m6\";" + "\n" +
                "import def , {a, b, c as C} from \"m7\";" + "\n",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "m1", pos: 20, end: 22 },
                        { fileName: "m2", pos: 51, end: 53 },
                        { fileName: "m3", pos: 73, end: 75 },
                        { fileName: "m4", pos: 95, end: 97 },
                        { fileName: "m5", pos: 122, end: 124 },
                        { fileName: "m6", pos: 160, end: 162 },
                        { fileName: "m7", pos: 199, end: 201 }
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });

        it("Correctly return ES6 exports", function () {
            test("export * from \"m1\";" + "\n" +
                "export {a} from \"m2\";" + "\n" +
                "export {a as A} from \"m3\";" + "\n" +
                "export {a as A, b, c as C} from \"m4\";" + "\n",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "m1", pos: 14, end: 16 },
                        { fileName: "m2", pos: 36, end: 38 },
                        { fileName: "m3", pos: 63, end: 65 },
                        { fileName: "m4", pos: 101, end: 103 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });
        
        it("Correctly return ambient external modules", () => {
           test(`
               declare module A {}
               declare module "B" {}
               function foo() {
               }
               `, 
                /* readImports */ true,
                /* detectJavaScriptImports */ false,
 
               {
                   referencedFiles: [],
                   importedFiles: [],
                   ambientExternalModules: ["B"],
                   isLibFile: false
               })  
        });

        it("Correctly handles export import declarations", function () {
            test("export import a = require(\"m1\");",
                /* readImports */true,
                /* detectJavaScriptImports */ false,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "m1", pos: 26, end: 28 }
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });
        it("Correctly handles export require calls in JavaScript files", function () {
            test(`
            export import a = require("m1");
            var x = require('m2');
            foo(require('m3'));
            var z = { f: require('m4') }
            `,
                /* readImports */true,
                /* detectJavaScriptImports */ true,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "m1", pos: 39, end: 41 },
                        { fileName: "m2", pos: 74, end: 76 },
                        { fileName: "m3", pos: 105, end: 107 },
                        { fileName: "m4", pos: 146, end: 148 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });
        it("Correctly handles dependency lists in define([deplist]) calls in JavaScript files", function () {
            test(`
            define(["mod1", "mod2"], (m1, m2) => {
            });
            `,
                /* readImports */true,
                /* detectJavaScriptImports */ true,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 21, end: 25 },
                        { fileName: "mod2", pos: 29, end: 33 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });
        it("Correctly handles dependency lists in define(modName, [deplist]) calls in JavaScript files", function () {
            test(`
            define("mod", ["mod1", "mod2"], (m1, m2) => {
            });
            `,
                /* readImports */true,
                /* detectJavaScriptImports */ true,
                {
                    referencedFiles: [],
                    importedFiles: [
                        { fileName: "mod1", pos: 28, end: 32 },
                        { fileName: "mod2", pos: 36, end: 40 },
                    ],
                    ambientExternalModules: undefined,
                    isLibFile: false
                })
        });
        it("correctly handles augmentations in external modules - 1", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            
            export {}
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it("correctly handles augmentations in external modules - 2", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            
            import * as x from "m";
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "m", "pos": 135, "end": 136 },
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it("correctly handles augmentations in external modules - 3", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            
            import m = require("m");
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "m", "pos": 135, "end": 136 },
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it("correctly handles augmentations in external modules - 4", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            namespace N {}
            export = N;
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it("correctly handles augmentations in external modules - 5", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            namespace N {}
            export import IN = N;
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it("correctly handles augmentations in external modules - 6", () => {
            test(`
            declare module "../Observable" {
                interface I {}
            }
            export let x = 1;
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "../Observable", "pos": 28, "end": 41 }
                ],
                ambientExternalModules: undefined,
                isLibFile: false
            })
        });
        it ("correctly handles augmentations in ambient external modules - 1", () => {
            test(`
            declare module "m1" {
                export * from "m2";
                declare module "augmentation" {
                    interface I {}
                }
            }
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "m2", "pos": 65, "end": 67 },
                    { "fileName": "augmentation", "pos": 102, "end": 114 }
                ],
                ambientExternalModules: ["m1"],
                isLibFile: false
            });
        });
        it ("correctly handles augmentations in ambient external modules - 2", () => {
            test(`
            namespace M { var x; }
            import IM = M;
            declare module "m1" {
                export * from "m2";
                declare module "augmentation" {
                    interface I {}
                }
            }
            `, 
            /*readImportFile*/ true,
            /*detectJavaScriptImports*/ false,
            {
                referencedFiles: [],
                importedFiles: [
                    { "fileName": "m2", "pos": 127, "end": 129 },
                    { "fileName": "augmentation", "pos": 164, "end": 176 }
                ],
                ambientExternalModules: ["m1"],
                isLibFile: false
            });
        });        
    });
});
