"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BigFloatScalarType", {
    enumerable: true,
    get: function() {
        return BigFloatScalarType;
    }
});
const _graphql = require("graphql");
const _language = require("graphql/language");
const BigFloatScalarType = new _graphql.GraphQLScalarType({
    name: 'BigFloat',
    description: 'A custom scalar type for representing big floating point numbers',
    serialize (value) {
        return parseFloat(value);
    },
    parseValue (value) {
        return String(value);
    },
    parseLiteral (ast) {
        if (ast.kind === _language.Kind.FLOAT || ast.kind === _language.Kind.INT) {
            return String(ast.value);
        }
        return null;
    }
});

//# sourceMappingURL=big-float.scalar.js.map