"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BooleanFilterType", {
    enumerable: true,
    get: function() {
        return BooleanFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const BooleanFilterType = new _graphql.GraphQLInputObjectType({
    name: 'BooleanFilter',
    fields: {
        eq: {
            type: _graphql.GraphQLBoolean
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=boolean-filter.input-type.js.map