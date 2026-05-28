"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageInfoType", {
    enumerable: true,
    get: function() {
        return PageInfoType;
    }
});
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _graphql = require("graphql");
const PageInfoType = new _graphql.GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        startCursor: {
            type: _nestjsquerygraphql.ConnectionCursorScalar
        },
        endCursor: {
            type: _nestjsquerygraphql.ConnectionCursorScalar
        },
        hasNextPage: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
        },
        hasPreviousPage: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean)
        }
    }
});

//# sourceMappingURL=page-into.object-type.js.map