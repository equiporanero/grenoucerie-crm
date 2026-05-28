"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphQLExtractTopLevelFields", {
    enumerable: true,
    get: function() {
        return graphQLExtractTopLevelFields;
    }
});
const _graphql = require("graphql");
const _findoperationdefinitionutil = require("./find-operation-definition.util");
const _graphqlbuildfragmentmaputil = require("./graphql-build-fragment-map.util");
const graphQLExtractTopLevelFields = (document, operationName)=>{
    const operationDefinition = (0, _findoperationdefinitionutil.findOperationDefinition)(document, operationName);
    if (!operationDefinition) {
        return [];
    }
    const fragmentMap = (0, _graphqlbuildfragmentmaputil.graphQLBuildFragmentMap)(document);
    const fields = [];
    for (const selection of operationDefinition.selectionSet.selections){
        if (selection.kind === _graphql.Kind.FIELD) {
            fields.push(selection);
        } else if (selection.kind === _graphql.Kind.FRAGMENT_SPREAD) {
            const fragment = fragmentMap.get(selection.name.value);
            if (fragment) {
                for (const fragmentSelection of fragment.selectionSet.selections){
                    if (fragmentSelection.kind === _graphql.Kind.FIELD) {
                        fields.push(fragmentSelection);
                    }
                }
            }
        } else if (selection.kind === _graphql.Kind.INLINE_FRAGMENT) {
            for (const inlineSelection of selection.selectionSet.selections){
                if (inlineSelection.kind === _graphql.Kind.FIELD) {
                    fields.push(inlineSelection);
                }
            }
        }
    }
    return fields;
};

//# sourceMappingURL=graphql-extract-top-level-fields.util.js.map