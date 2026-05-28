"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilterIs", {
    enumerable: true,
    get: function() {
        return FilterIs;
    }
});
const _graphql = require("graphql");
const FilterIs = new _graphql.GraphQLEnumType({
    name: 'FilterIs',
    description: 'This enum to filter by nullability',
    values: {
        NULL: {
            value: 'NULL',
            description: 'Nulish values'
        },
        NOT_NULL: {
            value: 'NOT_NULL',
            description: 'Non-nulish values'
        }
    }
});

//# sourceMappingURL=filter-is.input-type.js.map