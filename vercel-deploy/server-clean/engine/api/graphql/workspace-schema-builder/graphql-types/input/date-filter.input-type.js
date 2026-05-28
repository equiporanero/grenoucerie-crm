"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DateFilterType", {
    enumerable: true,
    get: function() {
        return DateFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const _scalars = require("../scalars");
const DateFilterType = new _graphql.GraphQLInputObjectType({
    name: 'DateFilter',
    fields: {
        eq: {
            type: _scalars.DateScalarType
        },
        gt: {
            type: _scalars.DateScalarType
        },
        gte: {
            type: _scalars.DateScalarType
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_scalars.DateScalarType))
        },
        lt: {
            type: _scalars.DateScalarType
        },
        lte: {
            type: _scalars.DateScalarType
        },
        neq: {
            type: _scalars.DateScalarType
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=date-filter.input-type.js.map