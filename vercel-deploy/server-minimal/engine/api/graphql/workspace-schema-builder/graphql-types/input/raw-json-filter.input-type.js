"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RawJsonFilterType", {
    enumerable: true,
    get: function() {
        return RawJsonFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const RawJsonFilterType = new _graphql.GraphQLInputObjectType({
    name: 'RawJsonFilter',
    fields: {
        is: {
            type: _filterisinputtype.FilterIs
        },
        like: {
            type: _graphql.GraphQLString,
            description: 'Pattern match with % wildcard (e.g. %value%)'
        }
    }
});

//# sourceMappingURL=raw-json-filter.input-type.js.map