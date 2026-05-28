"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DateScalarType", {
    enumerable: true,
    get: function() {
        return DateScalarType;
    }
});
const _graphql = require("graphql");
const _language = require("graphql/language");
const DateScalarType = new _graphql.GraphQLScalarType({
    name: 'Date',
    description: "Date custom scalar type, as a string in format yyyy-MM-dd (ex: 2025-12-31), we don't signify time nor timezone for DATE.",
    serialize (value) {
        return value;
    },
    parseValue (value) {
        return value;
    },
    parseLiteral (ast) {
        if (ast.kind === _language.Kind.STRING) {
            return ast.value;
        }
        return null;
    }
});

//# sourceMappingURL=date.scalar.js.map