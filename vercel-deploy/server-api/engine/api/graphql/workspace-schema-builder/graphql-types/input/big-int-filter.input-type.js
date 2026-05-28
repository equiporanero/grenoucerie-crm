"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BigIntFilterType", {
    enumerable: true,
    get: function() {
        return BigIntFilterType;
    }
});
const _graphql = require("graphql");
const _graphqlscalars = require("graphql-scalars");
const _filterisinputtype = require("./filter-is.input-type");
const BigIntFilterType = new _graphql.GraphQLInputObjectType({
    name: 'BigIntFilter',
    fields: {
        eq: {
            type: _graphqlscalars.GraphQLBigInt
        },
        gt: {
            type: _graphqlscalars.GraphQLBigInt
        },
        gte: {
            type: _graphqlscalars.GraphQLBigInt
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_graphqlscalars.GraphQLBigInt))
        },
        lt: {
            type: _graphqlscalars.GraphQLBigInt
        },
        lte: {
            type: _graphqlscalars.GraphQLBigInt
        },
        neq: {
            type: _graphqlscalars.GraphQLBigInt
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=big-int-filter.input-type.js.map