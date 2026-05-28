"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StringFilterType", {
    enumerable: true,
    get: function() {
        return StringFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const StringFilterType = new _graphql.GraphQLInputObjectType({
    name: 'StringFilter',
    fields: {
        eq: {
            type: _graphql.GraphQLString
        },
        gt: {
            type: _graphql.GraphQLString
        },
        gte: {
            type: _graphql.GraphQLString
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphql.GraphQLString))
        },
        lt: {
            type: _graphql.GraphQLString
        },
        lte: {
            type: _graphql.GraphQLString
        },
        neq: {
            type: _graphql.GraphQLString
        },
        startsWith: {
            type: _graphql.GraphQLString
        },
        endsWith: {
            type: _graphql.GraphQLString
        },
        like: {
            type: _graphql.GraphQLString,
            description: 'Pattern match with % wildcard (e.g. %value%)'
        },
        ilike: {
            type: _graphql.GraphQLString,
            description: 'Case-insensitive match with % wildcard (e.g. %value%)'
        },
        regex: {
            type: _graphql.GraphQLString
        },
        iregex: {
            type: _graphql.GraphQLString
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=string-filter.input-type.js.map