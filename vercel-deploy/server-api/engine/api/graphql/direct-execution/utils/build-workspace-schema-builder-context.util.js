"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkspaceSchemaBuilderContext", {
    enumerable: true,
    get: function() {
        return buildWorkspaceSchemaBuilderContext;
    }
});
const buildWorkspaceSchemaBuilderContext = (entry, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular)=>{
    const flatObjectMetadata = flatObjectMetadataMaps.byUniversalIdentifier[entry.objectMetadataUniversalIdentifier];
    if (!flatObjectMetadata) {
        throw new Error(`Object metadata not found for universal identifier: ${entry.objectMetadataUniversalIdentifier}`);
    }
    return {
        flatObjectMetadata,
        flatObjectMetadataMaps,
        flatFieldMetadataMaps,
        objectIdByNameSingular
    };
};

//# sourceMappingURL=build-workspace-schema-builder-context.util.js.map