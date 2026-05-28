"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PositionScalarType", {
    enumerable: true,
    get: function() {
        return PositionScalarType;
    }
});
const _graphql = require("graphql");
const _graphqlerrorsutil = require("../../../../../core-modules/graphql/utils/graphql-errors.util");
const isValidStringPosition = (value)=>typeof value === 'string' && (value === 'first' || value === 'last');
const isValidNumberPosition = (value)=>typeof value === 'number';
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
const checkPosition = (value)=>{
    if (isValidNumberPosition(value) || isValidStringPosition(value)) {
        return value;
    }
    throw new _graphqlerrorsutil.ValidationError(`Invalid position value: '${value}'. Position must be 'first', 'last', or a number`);
};
const PositionScalarType = new _graphql.GraphQLScalarType({
    name: 'Position',
    description: 'A custom scalar type for representing record position in a list',
    serialize: checkPosition,
    parseValue: checkPosition,
    parseLiteral (ast) {
        if (ast.kind == _graphql.Kind.STRING && (ast.value === 'first' || ast.value === 'last')) {
            return ast.value;
        }
        if (ast.kind == _graphql.Kind.INT || ast.kind == _graphql.Kind.FLOAT) {
            return parseFloat(ast.value);
        }
        throw new _graphqlerrorsutil.ValidationError('Invalid position value');
    }
});

//# sourceMappingURL=position.scalar.js.map