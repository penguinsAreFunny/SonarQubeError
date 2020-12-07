"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTester_1 = require("./support/RuleTester");
const rule = require("../rules/boolean-trivia");
const ruleTester = new RuleTester_1.RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});
ruleTester.run("boolean-trivia", rule, {
    valid: [
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* boolean prop */ true);
            `,
        },
        {
            code: `
const fn = (prop: null) => {};
fn(/* null prop */ null);
            `,
        },
        {
            code: `
const fn = (prop: undefined) => {};
fn(/* undefined prop */ undefined);
            `,
        },
        {
            code: `
const fn = (prop: null) => {};
fn(/*null prop*/ null);
            `,
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* comment */
    false
);
            `,
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn.apply(null, true);
        `,
        },
    ],
    invalid: [
        {
            code: `
const fn = (prop: null) => {};
fn(null);
            `,
            errors: [{ messageId: "booleanTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(false);
            `,
            errors: [{ messageId: "booleanTriviaArgumentError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* boolean arg */false);
            `,
            errors: [{ messageId: "booleanTriviaArgumentSpaceError" }],
        },
        {
            code: `
const fn = (prop: boolean) => {};
fn(/* first comment */ /* second comment */ false);
            `,
            errors: [{ messageId: "booleanTriviaArgumentError" }],
        },
    ],
});
