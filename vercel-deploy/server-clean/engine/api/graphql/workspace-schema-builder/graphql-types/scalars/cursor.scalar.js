"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CursorScalarType", {
    enumerable: true,
    get: function() {
        return CursorScalarType;
    }
});
const _graphql = require("graphql");
const _graphqlerrorsutil = require("../../../../../core-modules/graphql/utils/graphql-errors.util");
const CursorScalarType = new _graphql.GraphQLScalarType({
    name: 'Cursor',
    description: 'A custom scalar that represents a cursor for pagination',
    serialize (value) {
        if (typeof value !== 'string') {
            throw new _graphqlerrorsutil.ValidationError('Cursor must be a string');
        }
        return value;
    },
    parseValue (value) {
        if (typeof value !== 'string') {
            throw new _graphqlerrorsutil.ValidationError('Cursor must be a string');
        }
        return value;
    },
    parseLiteral (ast) {
        if (ast.kind !== _graphql.Kind.STRING) {
            throw new _graphqlerrorsutil.ValidationError('Cursor must be a string');
        }
        return ast.value;
    }
});

//# sourceMappingURL=cursor.scalar.js.map