"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BigFloatFilterType", {
    enumerable: true,
    get: function() {
        return BigFloatFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("./filter-is.input-type");
const _scalars = require("../scalars");
const BigFloatFilterType = new _graphql.GraphQLInputObjectType({
    name: 'BigFloatFilter',
    fields: {
        eq: {
            type: _scalars.BigFloatScalarType
        },
        gt: {
            type: _scalars.BigFloatScalarType
        },
        gte: {
            type: _scalars.BigFloatScalarType
        },
        in: {
            type: new _graphql.GraphQLList(new _graphql.GraphQLNonNull(_scalars.BigFloatScalarType))
        },
        lt: {
            type: _scalars.BigFloatScalarType
        },
        lte: {
            type: _scalars.BigFloatScalarType
        },
        neq: {
            type: _scalars.BigFloatScalarType
        },
        is: {
            type: _filterisinputtype.FilterIs
        }
    }
});

//# sourceMappingURL=big-float-filter.input-type.js.map