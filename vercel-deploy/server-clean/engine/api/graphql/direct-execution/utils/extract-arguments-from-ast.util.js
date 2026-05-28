"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractArgumentsFromAst", {
    enumerable: true,
    get: function() {
        return extractArgumentsFromAst;
    }
});
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const extractArgumentsFromAst = (argumentNodes, variables)=>{
    if (!argumentNodes || argumentNodes.length === 0) {
        return {};
    }
    const result = {};
    for (const arg of argumentNodes){
        const value = (0, _graphql.valueFromASTUntyped)(arg.value, variables);
        if (!(0, _utils.isDefined)(value)) continue;
        result[arg.name.value] = value;
    }
    return result;
};

//# sourceMappingURL=extract-arguments-from-ast.util.js.map