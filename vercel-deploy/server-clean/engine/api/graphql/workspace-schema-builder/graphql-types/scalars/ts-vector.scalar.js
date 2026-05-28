"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TSVectorScalarType", {
    enumerable: true,
    get: function() {
        return TSVectorScalarType;
    }
});
const _graphql = require("graphql");
const TSVectorScalarType = new _graphql.GraphQLScalarType({
    name: 'TSVector',
    description: 'A custom scalar type for PostgreSQL tsvector fields',
    serialize (value) {
        return value;
    },
    parseValue (value) {
        return value;
    },
    parseLiteral (ast) {
        if (ast.kind === 'StringValue') {
            return ast.value;
        }
        return null;
    }
});

//# sourceMappingURL=ts-vector.scalar.js.map