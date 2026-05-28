"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ArrayFilterType", {
    enumerable: true,
    get: function() {
        return ArrayFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const ArrayFilterType = new _graphql.GraphQLInputObjectType({
    name: 'ArrayFilter',
    fields: {
        containsIlike: {
            type: _graphql.GraphQLString,
            description: 'Case-insensitive match with % wildcard (e.g. %value%)'
        },
        is: {
            type: _filterisinputtype.FilterIs
        },
        isEmptyArray: {
            type: _graphql.GraphQLBoolean
        }
    }
});

//# sourceMappingURL=array-filter.input-type.js.map