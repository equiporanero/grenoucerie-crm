"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFieldMetadataFromGraphQLField", {
    enumerable: true,
    get: function() {
        return getFieldMetadataFromGraphQLField;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _gettargetobjectmetadatautil = require("./get-target-object-metadata.util");
const _getflatfieldsforflatobjectmetadatautil = require("../../workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
function getFieldMetadataFromGraphQLField({ flatObjectMetadata, graphQLField, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
    const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    const sourceFieldMetadataId = fieldIdByName[graphQLField];
    let sourceFieldMetadata = sourceFieldMetadataId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: sourceFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    }) : undefined;
    // If empty, it could be a morph relation
    if (!(0, _utils.isDefined)(sourceFieldMetadata)) {
        const morphRelationsWithTargetObjectMetadata = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((fieldMetadata)=>fieldMetadata.type === _types.FieldMetadataType.MORPH_RELATION).map((fieldMetadata)=>{
            const targetObjectMetadata = (0, _gettargetobjectmetadatautil.getTargetObjectMetadataOrThrow)(fieldMetadata, flatObjectMetadataMaps);
            return {
                fieldMetadata,
                targetObjectMetadata
            };
        });
        const possibleGraphQLFieldNames = [];
        morphRelationsWithTargetObjectMetadata.map((morphRelation)=>{
            if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(morphRelation.fieldMetadata, _types.FieldMetadataType.MORPH_RELATION) || !morphRelation.fieldMetadata.settings?.relationType) {
                return;
            }
            possibleGraphQLFieldNames.push({
                graphQLField: morphRelation.fieldMetadata.name,
                fieldMetadata: morphRelation.fieldMetadata,
                targetObjectMetadata: morphRelation.targetObjectMetadata
            });
        });
        const fieldMetdata = possibleGraphQLFieldNames.find((possibleGraphQLFieldName)=>possibleGraphQLFieldName.graphQLField === graphQLField)?.fieldMetadata;
        if (fieldMetdata) {
            sourceFieldMetadata = fieldMetdata;
        }
    }
    return sourceFieldMetadata;
}

//# sourceMappingURL=get-field-metadata-from-graphql-field.util.js.map