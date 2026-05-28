"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useValidateGraphqlQueryComplexity", {
    enumerable: true,
    get: function() {
        return useValidateGraphqlQueryComplexity;
    }
});
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../utils/graphql-errors.util");
const useValidateGraphqlQueryComplexity = ({ maximumAllowedFields, maximumAllowedRootResolvers, maximumAllowedNestedFields, checkDuplicateRootResolvers = false })=>({
        onParse: ()=>{
            return ({ result })=>{
                if (!result || !('kind' in result) || result.kind !== _graphql.Kind.DOCUMENT) {
                    return;
                }
                const document = result;
                const fragmentMap = buildFragmentMap(document);
                const analysis = analyzeDocument(document, fragmentMap, checkDuplicateRootResolvers);
                if ((0, _utils.isDefined)(maximumAllowedNestedFields) && analysis.maxNestedDepth > maximumAllowedNestedFields) {
                    throw new _graphqlerrorsutil.UserInputError(`Query too complex - Too many nested fields requested: ${analysis.maxNestedDepth} - Maximum allowed nested fields: ${maximumAllowedNestedFields}`);
                }
                if ((0, _utils.isDefined)(maximumAllowedFields) && analysis.requestedFieldsCount > maximumAllowedFields) {
                    throw new _graphqlerrorsutil.UserInputError(`Query too complex - Too many fields requested: ${analysis.requestedFieldsCount} - Maximum allowed fields: ${maximumAllowedFields}`, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "pv+BoZ",
                            message: "The request is too complex to process. Please try reducing the amount of requested fields."
                        }
                    });
                }
                if ((0, _utils.isDefined)(maximumAllowedRootResolvers) && analysis.requestedRootResolversCount > maximumAllowedRootResolvers) {
                    throw new _graphqlerrorsutil.UserInputError(`Query too complex - Too many root resolvers requested: ${analysis.requestedRootResolversCount} - Maximum allowed root resolvers: ${maximumAllowedRootResolvers}`, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "4LVaa7",
                            message: "The request is too complex to process. Please try reducing the amount of requested root resolvers."
                        }
                    });
                }
            };
        }
    });
const buildFragmentMap = (document)=>{
    const fragmentMap = new Map();
    for (const definition of document.definitions){
        if (definition.kind === _graphql.Kind.FRAGMENT_DEFINITION) {
            fragmentMap.set(definition.name.value, definition);
        }
    }
    return fragmentMap;
};
const resolveFragmentMetadata = (fragmentName, fragmentMap)=>{
    const fragment = fragmentMap.get(fragmentName);
    if (!(0, _utils.isDefined)(fragment)) {
        return undefined;
    }
    const metadata = analyzeSelectionSet(fragment.selectionSet.selections, fragmentMap, 0);
    const result = {
        fieldsCount: metadata.fieldsCount,
        depth: metadata.maxDepth,
        rootFieldNames: new Set(metadata.rootFieldNames)
    };
    return result;
};
const analyzeSelectionSet = (selections, fragmentMap, currentDepth)=>{
    let fieldsCount = 0;
    let maxDepth = currentDepth;
    const rootFieldNames = [];
    for (const selection of selections){
        switch(selection.kind){
            case _graphql.Kind.FIELD:
                {
                    const fieldNode = selection;
                    // Skip introspection fields
                    if (fieldNode.name.value.startsWith('__')) {
                        continue;
                    }
                    fieldsCount++;
                    const fieldDepth = currentDepth + 1;
                    maxDepth = Math.max(maxDepth, fieldDepth);
                    if (currentDepth === 0) {
                        rootFieldNames.push(fieldNode.name.value);
                    }
                    if (fieldNode.selectionSet) {
                        const nestedResult = analyzeSelectionSet(fieldNode.selectionSet.selections, fragmentMap, fieldDepth);
                        fieldsCount += nestedResult.fieldsCount;
                        maxDepth = Math.max(maxDepth, nestedResult.maxDepth);
                    }
                    break;
                }
            case _graphql.Kind.INLINE_FRAGMENT:
                {
                    if (selection.selectionSet) {
                        const nestedResult = analyzeSelectionSet(selection.selectionSet.selections, fragmentMap, currentDepth);
                        fieldsCount += nestedResult.fieldsCount;
                        maxDepth = Math.max(maxDepth, nestedResult.maxDepth);
                        for (const name of nestedResult.rootFieldNames){
                            rootFieldNames.push(name);
                        }
                    }
                    break;
                }
            case _graphql.Kind.FRAGMENT_SPREAD:
                {
                    const fragmentName = selection.name.value;
                    const metadata = resolveFragmentMetadata(fragmentName, fragmentMap);
                    if ((0, _utils.isDefined)(metadata)) {
                        fieldsCount += metadata.fieldsCount;
                        maxDepth = Math.max(maxDepth, currentDepth + metadata.depth);
                        if (currentDepth === 0) {
                            for (const name of metadata.rootFieldNames){
                                rootFieldNames.push(name);
                            }
                        }
                    }
                    break;
                }
        }
    }
    return {
        fieldsCount,
        maxDepth,
        rootFieldNames
    };
};
const analyzeDocument = (document, fragmentMap, checkDuplicateRootResolvers)=>{
    let requestedFieldsCount = 0;
    let requestedRootResolversCount = 0;
    let maxNestedDepth = 0;
    const rootResolverNames = [];
    for (const definition of document.definitions){
        if (definition.kind === _graphql.Kind.OPERATION_DEFINITION && definition.selectionSet) {
            const result = analyzeSelectionSet(definition.selectionSet.selections, fragmentMap, 0);
            requestedFieldsCount += result.fieldsCount;
            maxNestedDepth = Math.max(maxNestedDepth, result.maxDepth);
            for (const name of result.rootFieldNames){
                requestedRootResolversCount++;
                if (checkDuplicateRootResolvers && rootResolverNames.includes(name)) {
                    throw new _graphqlerrorsutil.UserInputError(`Duplicate root resolver: "${name}"`, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "UrzTjS",
                            message: "Duplicate root resolver found. Each root resolver can only be called once per document."
                        }
                    });
                }
                rootResolverNames.push(name);
            }
        }
    }
    return {
        requestedFieldsCount,
        requestedRootResolversCount,
        maxNestedDepth,
        rootResolverNames
    };
};

//# sourceMappingURL=use-validate-graphql-query-complexity.hook.js.map