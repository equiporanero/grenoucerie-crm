"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildFieldMapsFromFlatObjectMetadata", {
    enumerable: true,
    get: function() {
        return buildFieldMapsFromFlatObjectMetadata;
    }
});
const _types = require("twenty-shared/types");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _getflatfieldsforflatobjectmetadatautil = require("../../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const buildFieldMapsFromFlatObjectMetadata = (flatFieldMetadataMaps, flatObjectMetadata)=>{
    const fieldIdByName = {};
    const fieldIdByJoinColumnName = {};
    const objectFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
    for (const field of objectFields){
        fieldIdByName[field.name] = field.id;
        if (((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.RELATION) || (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.MORPH_RELATION)) && field.settings.relationType === _types.RelationType.MANY_TO_ONE) {
            const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: field.name
            });
            fieldIdByJoinColumnName[joinColumnName] = field.id;
        }
    }
    return {
        fieldIdByName,
        fieldIdByJoinColumnName
    };
};

//# sourceMappingURL=build-field-maps-from-flat-object-metadata.util.js.map