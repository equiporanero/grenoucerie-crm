"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BigIntScalarType", {
    enumerable: true,
    get: function() {
        return BigIntScalarType;
    }
});
const _graphql = require("graphql");
const BigIntScalarType = new _graphql.GraphQLScalarType({
    name: 'BigInt',
    description: 'The `BigInt` scalar type represents non-fractional signed whole numeric values.',
    serialize (value) {
        return value.toString();
    },
    parseValue (value) {
        return BigInt(value);
    },
    parseLiteral (ast) {
        if (ast.kind === 'IntValue') {
            return BigInt(ast.value);
        }
        return null;
    }
});

//# sourceMappingURL=big-int.scalar.js.map