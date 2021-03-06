import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";


export class Rule extends Lint.Rules.AbstractRule {
    public static POSTFIX_FAILURE_STRING = "Don't use '++' or '--' postfix operators outside statements or for loops.";
    public static PREFIX_FAILURE_STRING = "Don't use '++' or '--' prefix operators.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new IncrementDecrementWalker(sourceFile, this.getOptions()));
    }
}

class IncrementDecrementWalker extends Lint.RuleWalker {

    visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
        super.visitPostfixUnaryExpression(node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.visitIncrementDecrement(node);
        }
    }

    visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
        super.visitPrefixUnaryExpression(node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.PREFIX_FAILURE_STRING));
        }
    }

    visitIncrementDecrement(node: ts.UnaryExpression) {
        if (node.parent && (node.parent.kind === ts.SyntaxKind.ExpressionStatement ||
                            node.parent.kind === ts.SyntaxKind.ForStatement)) {
            return;
        }
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.POSTFIX_FAILURE_STRING));
    }
}
