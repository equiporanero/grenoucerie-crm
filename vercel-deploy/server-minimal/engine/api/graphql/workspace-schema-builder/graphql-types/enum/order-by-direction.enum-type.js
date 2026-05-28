"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrderByDirectionType", {
    enumerable: true,
    get: function() {
        return OrderByDirectionType;
    }
});
const _graphql = require("graphql");
const OrderByDirectionType = new _graphql.GraphQLEnumType({
    name: 'OrderByDirection',
    description: 'This enum is used to specify the order of results',
    values: {
        AscNullsFirst: {
            value: 'AscNullsFirst',
            description: 'Ascending order, nulls first'
        },
        AscNullsLast: {
            value: 'AscNullsLast',
            description: 'Ascending order, nulls last'
        },
        DescNullsFirst: {
            value: 'DescNullsFirst',
            description: 'Descending order, nulls first'
        },
        DescNullsLast: {
            value: 'DescNullsLast',
            description: 'Descending order, nulls last'
        }
    }
});

//# sourceMappingURL=order-by-direction.enum-type.js.map