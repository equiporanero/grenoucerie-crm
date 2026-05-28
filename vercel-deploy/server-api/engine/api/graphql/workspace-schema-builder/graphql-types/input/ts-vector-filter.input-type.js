"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TSVectorFilterType", {
    enumerable: true,
    get: function() {
        return TSVectorFilterType;
    }
});
const _graphql = require("graphql");
const TSVectorFilterType = new _graphql.GraphQLInputObjectType({
    name: 'TSVectorFilter',
    fields: {
        search: {
            type: _graphql.GraphQLString
        }
    }
});

//# sourceMappingURL=ts-vector-filter.input-type.js.map