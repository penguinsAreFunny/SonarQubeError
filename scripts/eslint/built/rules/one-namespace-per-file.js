"use strict";
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const utils_1 = require("./utils");
module.exports = utils_1.createRule({
    name: "one-namespace-per-file",
    meta: {
        docs: {
            description: `Limits each file to having at most one top-level namespace declaration`,
            category: "Possible Errors",
            recommended: "error",
        },
        messages: {
            excessNamespaceError: `All but one of these namespaces should be moved into separate files.`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],
    create(context) {
        const isNamespaceDeclaration = (node) => node.type === experimental_utils_1.AST_NODE_TYPES.TSModuleDeclaration;
        const checkSourceFile = (node) => {
            if (context.getFilename().endsWith(".d.ts")) {
                return;
            }
            const members = node.body;
            const namespaces = members.filter(isNamespaceDeclaration);
            if (namespaces.length <= 1) {
                return;
            }
            namespaces.forEach(n => {
                context.report({
                    messageId: "excessNamespaceError", node: n
                });
            });
        };
        return {
            Program: checkSourceFile,
        };
    },
});
