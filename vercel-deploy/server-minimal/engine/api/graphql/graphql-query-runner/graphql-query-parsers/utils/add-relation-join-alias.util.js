"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addRelationJoinAliasToQueryBuilder", {
    enumerable: true,
    get: function() {
        return addRelationJoinAliasToQueryBuilder;
    }
});
const addRelationJoinAliasToQueryBuilder = ({ queryBuilder, parentAlias, relationName })=>{
    const alreadyJoined = queryBuilder.expressionMap.joinAttributes.some((joinAttribute)=>joinAttribute.alias.name === relationName);
    if (alreadyJoined) {
        return;
    }
    queryBuilder.leftJoin(`${parentAlias}.${relationName}`, relationName);
};

//# sourceMappingURL=add-relation-join-alias.util.js.map