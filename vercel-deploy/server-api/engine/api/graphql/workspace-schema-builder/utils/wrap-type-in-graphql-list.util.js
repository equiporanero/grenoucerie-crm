"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapTypeInGraphQLList", {
    enumerable: true,
    get: function() {
        return wrapTypeInGraphQLList;
    }
});
const _graphql = require("graphql");
const wrapTypeInGraphQLList = (targetType, depth, nullable)=>{
    const targetTypeNonNull = nullable ? targetType : new _graphql.GraphQLNonNull(targetType);
    if (depth === 0) {
        return targetType;
    }
    return wrapTypeInGraphQLList(new _graphql.GraphQLList(targetTypeNonNull), depth - 1, nullable);
};

//# sourceMappingURL=wrap-type-in-graphql-list.util.js.map