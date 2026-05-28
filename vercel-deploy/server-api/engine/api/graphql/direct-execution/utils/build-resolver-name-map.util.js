"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildResolverNameMap", {
    enumerable: true,
    get: function() {
        return buildResolverNameMap;
    }
});
const _utils = require("twenty-shared/utils");
const _factories = require("../../workspace-resolver-builder/factories/factories");
const _getresolvernameutil = require("../../../../utils/get-resolver-name.util");
const buildResolverNameMap = (flatObjectMetadataMaps)=>{
    const map = {};
    const allMethods = [
        ..._factories.workspaceResolverBuilderMethodNames.queries.map((method)=>({
                method,
                operationType: 'query'
            })),
        ..._factories.workspaceResolverBuilderMethodNames.mutations.map((method)=>({
                method,
                operationType: 'mutation'
            }))
    ];
    for (const flatObjectMetadata of Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined)){
        for (const { method, operationType } of allMethods){
            const resolverName = (0, _getresolvernameutil.getResolverName)(flatObjectMetadata, method);
            map[resolverName] = {
                objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
                method,
                operationType
            };
        }
    }
    return map;
};

//# sourceMappingURL=build-resolver-name-map.util.js.map