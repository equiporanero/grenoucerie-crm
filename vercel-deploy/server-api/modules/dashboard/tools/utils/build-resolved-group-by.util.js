"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildResolvedGroupBy", {
    enumerable: true,
    get: function() {
        return buildResolvedGroupBy;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../../../engine/metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _findactiveflatfieldmetadatabyidutil = require("../../../../engine/metadata-modules/page-layout-widget/utils/find-active-flat-field-metadata-by-id.util");
const _resolvemorphtargetobjectidutil = require("../../../../engine/metadata-modules/page-layout-widget/utils/resolve-morph-target-object-id.util");
const _humanizesubfieldlabelutil = require("./humanize-sub-field-label.util");
const buildResolvedGroupBy = ({ fieldId, subFieldName, flatFieldMetadataMaps, fieldsByObjectId, allFields })=>{
    const field = (0, _findactiveflatfieldmetadatabyidutil.findActiveFlatFieldMetadataById)(fieldId, flatFieldMetadataMaps);
    if (!(0, _utils.isDefined)(field)) return null;
    const resolved = {
        fieldName: field.name,
        fieldLabel: field.label ?? field.name,
        fullPath: field.name
    };
    if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(field)) {
        if ((0, _utils.isDefined)(subFieldName)) {
            resolved.subFieldName = subFieldName;
            resolved.fullPath = `${field.name}.${subFieldName}`;
            const dotIndex = subFieldName.indexOf('.');
            const nestedFieldName = dotIndex === -1 ? subFieldName : subFieldName.slice(0, dotIndex);
            const nestedSubFieldName = dotIndex === -1 ? undefined : subFieldName.slice(dotIndex + 1);
            const targetObjectId = field.type === _types.FieldMetadataType.MORPH_RELATION ? (0, _resolvemorphtargetobjectidutil.resolveMorphTargetObjectId)({
                field,
                allFields
            }) : field.relationTargetObjectMetadataId;
            const targetFields = (0, _utils.isDefined)(targetObjectId) ? fieldsByObjectId.get(targetObjectId) ?? [] : [];
            const nestedField = targetFields.find((targetField)=>targetField.name === nestedFieldName);
            if ((0, _utils.isDefined)(nestedField)) {
                if (!(0, _utils.isDefined)(nestedSubFieldName)) {
                    resolved.subFieldLabel = nestedField.label ?? nestedField.name;
                } else if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedField.type)) {
                    resolved.subFieldLabel = (0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)(nestedSubFieldName);
                }
            }
        } else {
            resolved.fullPath = `${field.name}Id`;
        }
        return resolved;
    }
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)) {
        if ((0, _utils.isDefined)(subFieldName)) {
            resolved.subFieldName = subFieldName;
            resolved.subFieldLabel = (0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)(subFieldName);
            resolved.fullPath = `${field.name}.${subFieldName}`;
        }
        return resolved;
    }
    return resolved;
};

//# sourceMappingURL=build-resolved-group-by.util.js.map