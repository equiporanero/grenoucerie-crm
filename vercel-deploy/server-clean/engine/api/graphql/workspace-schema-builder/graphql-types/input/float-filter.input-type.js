"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FloatFilterType", {
    enumerable: true,
    get: function() {
        return FloatFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const FloatFilterType = new _graphql.GraphQLInputObjectType({
    name: 'FloatFilter',
    fields: {
        eq: {
            type: _graphql.GraphQLFloat
        },
        gt: {
            type: _graphql.GraphQLFloat
        },
        gte: {
            type: _graphql.GraphQLFloat
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLFloat))
        },
        lt: {
            type: _graphql.GraphQLFloat
        },
        lte: {
            type: _graphql.GraphQLFloat
        },
        neq: {
            type: _graphql.GraphQLFloat
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=float-filter.input-type.js.map