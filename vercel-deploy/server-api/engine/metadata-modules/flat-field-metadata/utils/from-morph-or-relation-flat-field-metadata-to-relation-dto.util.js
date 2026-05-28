"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromMorphOrRelationFlatFieldMetadataToRelationDto", {
    enumerable: true,
    get: function() {
        return fromMorphOrRelationFlatFieldMetadataToRelationDto;
    }
});
const _fromflatfieldmetadatatofieldmetadatadtoutil = require("./from-flat-field-metadata-to-field-metadata-dto.util");
const _fromflatobjectmetadatatoobjectmetadatadtoutil = require("../../flat-object-metadata/utils/from-flat-object-metadata-to-object-metadata-dto.util");
const fromMorphOrRelationFlatFieldMetadataToRelationDto = ({ sourceFlatFieldMetadata, sourceFlatObjectMetadata, targetFlatFieldMetadata, targetFlatObjectMetadata })=>({
        type: sourceFlatFieldMetadata.settings.relationType,
        sourceObjectMetadata: (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(sourceFlatObjectMetadata),
        sourceFieldMetadata: (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(sourceFlatFieldMetadata),
        targetObjectMetadata: (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(targetFlatObjectMetadata),
        targetFieldMetadata: (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(targetFlatFieldMetadata)
    });

//# sourceMappingURL=from-morph-or-relation-flat-field-metadata-to-relation-dto.util.js.map