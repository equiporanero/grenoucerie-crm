"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MultiSelectFilterType", {
    enumerable: true,
    get: function() {
        return MultiSelectFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const MultiSelectFilterType = new _graphql.GraphQLInputObjectType({
    name: 'MultiSelectFilter',
    fields: {
        containsAny: {
            type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        is: {
            type: _filterisinputtype.FilterIs
        },
        isEmptyArray: {
            type: _graphql.GraphQLBoolean
        }
    }
});

//# sourceMappingURL=multi-select-filter.input-type.js.map