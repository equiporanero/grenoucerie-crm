"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UUIDFilterType", {
    enumerable: true,
    get: function() {
        return UUIDFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const _scalars = require("../scalars");
const UUIDFilterType = new _graphql.GraphQLInputObjectType({
    name: 'UUIDFilter',
    fields: {
        eq: {
            type: _scalars.UUIDScalarType
        },
        gt: {
            type: _scalars.UUIDScalarType
        },
        gte: {
            type: _scalars.UUIDScalarType
        },
        in: {
            type: new _graphql.GraphQLList(_scalars.UUIDScalarType)
        },
        lt: {
            type: _scalars.UUIDScalarType
        },
        lte: {
            type: _scalars.UUIDScalarType
        },
        neq: {
            type: _scalars.UUIDScalarType
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=uuid-filter.input-type.js.map