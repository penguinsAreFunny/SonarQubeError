"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTester_1 = require("./support/RuleTester");
const rule = require("../rules/debug-assert");
const ruleTester = new RuleTester_1.RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});
ruleTester.run("debug-assert", rule, {
    valid: [
        {
            code: `Debug.assert(true)`,
        },
        {
            code: `Debug.assert(true, 'error message')`,
        },
        {
            code: `Debug.assert(true, 'error message 1', 'error message 2')`,
        },
        {
            code: `Debug.assert(true, 'error message 1', () => {})`,
        },
        {
            code: "Debug.assert(true, `error message 1`, () => {})",
        },
        {
            code: `Debug.assert(true, "error message 1", () => {})`,
        },
    ],
    invalid: [
        {
            code: `Debug.assert(true, 1)`,
            errors: [{ messageId: "secondArgumentDebugAssertError" }],
        },
        {
            code: `Debug.assert(true, 'error message', 1)`,
            errors: [{ messageId: "thirdArgumentDebugAssertError" }],
        },
        {
            code: `Debug.assert(true, null, 1)`,
            errors: [
                { messageId: "secondArgumentDebugAssertError" },
                { messageId: "thirdArgumentDebugAssertError" },
            ],
        }
    ],
});
