"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "classifyTopLevelFields", {
    enumerable: true,
    get: function() {
        return classifyTopLevelFields;
    }
});
const _graphqlextracttoplevelfieldsutil = require("./graphql-extract-top-level-fields.util");
const INTROSPECTION_FIELD_NAMES = new Set([
    '__schema',
    '__type'
]);
const classifyTopLevelFields = (document, operationName, workspaceResolverNames)=>{
    const topLevelFields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)(document, operationName);
    let hasIntrospectionFields = false;
    let hasWorkspaceFields = false;
    let hasCoreFields = false;
    for (const field of topLevelFields){
        if (INTROSPECTION_FIELD_NAMES.has(field.name.value)) {
            hasIntrospectionFields = true;
        } else if (workspaceResolverNames.has(field.name.value)) {
            hasWorkspaceFields = true;
        } else {
            hasCoreFields = true;
        }
    }
    return {
        hasIntrospectionFields,
        hasWorkspaceFields,
        hasCoreFields
    };
};

//# sourceMappingURL=classify-top-level-fields.util.js.map