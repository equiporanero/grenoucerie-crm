"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findOperationDefinition", {
    enumerable: true,
    get: function() {
        return findOperationDefinition;
    }
});
const _graphql = require("graphql");
const findOperationDefinition = (document, operationName)=>{
    const operations = document.definitions.filter((definition)=>definition.kind === _graphql.Kind.OPERATION_DEFINITION);
    if (operationName) {
        return operations.find((operation)=>operation.name?.value === operationName);
    }
    if (operations.length > 1) {
        throw new _graphql.GraphQLError('Must provide operation name when document contains multiple operations.');
    }
    return operations[0];
};

//# sourceMappingURL=find-operation-definition.util.js.map