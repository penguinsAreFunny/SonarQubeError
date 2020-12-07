"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTester_1 = require("./support/RuleTester");
const rule = require("../rules/no-in-operator");
const ruleTester = new RuleTester_1.RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});
ruleTester.run("no-in-operator", rule, {
    valid: [
        {
            code: `
const prop = {};
prop.hasProperty('a');
        `,
        },
    ],
    invalid: [
        {
            code: `
const prop = {};
prop in 'a';
            `,
            errors: [{ messageId: "noInOperatorError" }],
        },
    ],
});
