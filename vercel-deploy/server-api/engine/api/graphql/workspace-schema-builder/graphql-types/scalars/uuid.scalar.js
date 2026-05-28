"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UUIDScalarType", {
    enumerable: true,
    get: function() {
        return UUIDScalarType;
    }
});
const _graphql = require("graphql");
const _uuid = require("uuid");
const _graphqlerrorsutil = require("../../../../../core-modules/graphql/utils/graphql-errors.util");
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
const checkUUID = (value)=>{
    if (typeof value !== 'string') {
        throw new _graphqlerrorsutil.ValidationError('UUID must be a string');
    }
    if (!(0, _uuid.validate)(value)) {
        throw new _graphqlerrorsutil.ValidationError(`Invalid UUID: '${value}'`, {
            value
        });
    }
    return value;
};
const UUIDScalarType = new _graphql.GraphQLScalarType({
    name: 'UUID',
    description: 'A UUID scalar type',
    serialize: checkUUID,
    parseValue: checkUUID,
    parseLiteral (ast) {
        if (ast.kind !== _graphql.Kind.STRING) {
            throw new _graphqlerrorsutil.ValidationError('UUID must be a string');
        }
        return ast.value;
    }
});

//# sourceMappingURL=uuid.scalar.js.map