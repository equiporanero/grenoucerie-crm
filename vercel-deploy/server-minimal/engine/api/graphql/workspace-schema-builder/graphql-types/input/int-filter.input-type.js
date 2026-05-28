"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IntFilterType", {
    enumerable: true,
    get: function() {
        return IntFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const IntFilterType = new _graphql.GraphQLInputObjectType({
    name: 'IntFilter',
    fields: {
        eq: {
            type: _graphql.GraphQLInt
        },
        gt: {
            type: _graphql.GraphQLInt
        },
        gte: {
            type: _graphql.GraphQLInt
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLInt))
        },
        lt: {
            type: _graphql.GraphQLInt
        },
        lte: {
            type: _graphql.GraphQLInt
        },
        neq: {
            type: _graphql.GraphQLInt
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=int-filter.input-type.js.map