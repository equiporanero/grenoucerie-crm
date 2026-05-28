"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNumberScalarType", {
    enumerable: true,
    get: function() {
        return getNumberScalarType;
    }
});
const _graphql = require("graphql");
const _graphqlscalars = require("graphql-scalars");
const _types = require("twenty-shared/types");
const getNumberScalarType = (dataType)=>{
    switch(dataType){
        case _types.NumberDataType.FLOAT:
            return _graphql.GraphQLFloat;
        case _types.NumberDataType.BIGINT:
            return _graphqlscalars.GraphQLBigInt;
        case _types.NumberDataType.INT:
            return _graphql.GraphQLInt;
        default:
            return _graphql.GraphQLFloat;
    }
};

//# sourceMappingURL=get-number-scalar-type.util.js.map