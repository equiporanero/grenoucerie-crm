"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimeScalarType", {
    enumerable: true,
    get: function() {
        return TimeScalarType;
    }
});
const _graphql = require("graphql");
const _language = require("graphql/language");
const _graphqlerrorsutil = require("../../../../../core-modules/graphql/utils/graphql-errors.util");
const TimeScalarType = new _graphql.GraphQLScalarType({
    name: 'Time',
    description: 'Time custom scalar type',
    serialize (value) {
        return value.getTime();
    },
    parseValue (value) {
        return new Date(value);
    },
    parseLiteral (ast) {
        if (ast.kind === _language.Kind.INT) {
            const intAst = ast;
            if (typeof intAst.value === 'number') {
                return new Date(intAst.value);
            }
            throw new _graphqlerrorsutil.ValidationError(`Invalid timestamp value: ${ast.value}`);
        }
        throw new _graphqlerrorsutil.ValidationError(`Invalid AST kind: ${ast.kind}`);
    }
});

//# sourceMappingURL=time.scalar.js.map