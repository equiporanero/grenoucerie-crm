"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRelationNestedFieldDateKind", {
    enumerable: true,
    get: function() {
        return isRelationNestedFieldDateKind;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const isRelationNestedFieldDateKind = ({ relationFieldMetadata, relationNestedFieldName, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    if (!(0, _utils.isDefined)(relationNestedFieldName)) {
        return false;
    }
    if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(relationFieldMetadata)) {
        return false;
    }
    const targetObjectId = relationFieldMetadata.relationTargetObjectMetadataId;
    if (!(0, _utils.isDefined)(targetObjectId)) {
        return false;
    }
    const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: targetObjectId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetObjectMetadata)) {
        return false;
    }
    const nestedFieldName = relationNestedFieldName.split('.')[0];
    const targetFieldIds = targetObjectMetadata.fieldIds;
    const nestedFieldMetadata = targetFieldIds.map((fieldId)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldId,
            flatEntityMaps: flatFieldMetadataMaps
        })).find((fieldMetadata)=>(0, _utils.isDefined)(fieldMetadata) && fieldMetadata.name === nestedFieldName);
    if (!(0, _utils.isDefined)(nestedFieldMetadata)) {
        return false;
    }
    return (0, _utils.isFieldMetadataDateKind)(nestedFieldMetadata.type);
};

//# sourceMappingURL=is-relation-nested-field-date-kind.util.js.map