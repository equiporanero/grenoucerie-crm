"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DateTimeFilterType", {
    enumerable: true,
    get: function() {
        return DateTimeFilterType;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphql1 = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const DateTimeFilterType = new _graphql1.GraphQLInputObjectType({
    name: 'DateTimeFilter',
    fields: {
        eq: {
            type: _graphql.GraphQLISODateTime
        },
        gt: {
            type: _graphql.GraphQLISODateTime
        },
        gte: {
            type: _graphql.GraphQLISODateTime
        },
        in: {
            type: new _graphql1.GraphQLList(new _graphql1.GraphQLNonNull(_graphql.GraphQLISODateTime))
        },
        lt: {
            type: _graphql.GraphQLISODateTime
        },
        lte: {
            type: _graphql.GraphQLISODateTime
        },
        neq: {
            type: _graphql.GraphQLISODateTime
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=date-time-filter.input-type.js.map