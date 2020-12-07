"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleTester_1 = require("./support/RuleTester");
const rule = require("../rules/no-type-assertion-whitespace");
const ruleTester = new RuleTester_1.RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});
ruleTester.run("no-type-assertion-whitespace", rule, {
    valid: [
        {
            code: `const a = <number>1`,
        },
        {
            code: `const s = <Type>(new Symbol(1, 'name'));`,
        },
    ],
    invalid: [
        {
            code: `const a = <number> 1`,
            errors: [{ messageId: "noTypeAssertionWhitespace", column: 19, line: 1 }],
        },
        {
            code: `const a = <number>  1`,
            errors: [{ messageId: "noTypeAssertionWhitespace", column: 19, line: 1 }],
        },
        {
            code: `const a = <number>                1`,
            errors: [{ messageId: "noTypeAssertionWhitespace", column: 19, line: 1 }],
        },
        {
            code: `const s = <Type>  (new Symbol(1, 'name'));`,
            errors: [{ messageId: "noTypeAssertionWhitespace", column: 17, line: 1 }],
        },
    ],
});
