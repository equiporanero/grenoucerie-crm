"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectFilterType", {
    enumerable: true,
    get: function() {
        return SelectFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const SelectFilterType = new _graphql.GraphQLInputObjectType({
    name: 'SelectFilter',
    fields: {
        in: {
            type: new _graphql.GraphQLList(_graphql.GraphQLString)
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=select-filter.input-type.js.map