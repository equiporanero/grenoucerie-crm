"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRelationSubfield", {
    enumerable: true,
    get: function() {
        return validateRelationSubfield;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _getcompositesubfieldnamesutil = require("./get-composite-subfield-names.util");
const _resolvemorphtargetobjectidutil = require("./resolve-morph-target-object-id.util");
const _validatecompositesubfieldutil = require("./validate-composite-subfield.util");
const validateRelationSubfield = ({ field, subFieldName, paramName, allFields, fieldsByObjectId })=>{
    if (!(0, _utils.isDefined)(subFieldName)) {
        return;
    }
    const dotIndex = subFieldName.indexOf('.');
    const nestedFieldName = dotIndex === -1 ? subFieldName : subFieldName.slice(0, dotIndex);
    const nestedSubFieldName = dotIndex === -1 ? undefined : subFieldName.slice(dotIndex + 1);
    if (!nestedFieldName) {
        throw new Error(`Relation subfield "${subFieldName}" is invalid.`);
    }
    if ((0, _utils.isDefined)(nestedSubFieldName) && nestedSubFieldName.includes('.')) {
        throw new Error(`Relation subfield "${subFieldName}" is invalid.`);
    }
    let targetObjectId = field.relationTargetObjectMetadataId ?? null;
    if (field.type === _types.FieldMetadataType.MORPH_RELATION) {
        targetObjectId = (0, _resolvemorphtargetobjectidutil.resolveMorphTargetObjectId)({
            field,
            allFields
        });
    }
    if (!(0, _utils.isDefined)(targetObjectId)) {
        throw new Error(`Relation field "${paramName}" does not have a resolvable target object.`);
    }
    const targetFields = fieldsByObjectId.get(targetObjectId) ?? [];
    const nestedField = targetFields.find((targetField)=>targetField.name === nestedFieldName);
    if (!(0, _utils.isDefined)(nestedField)) {
        throw new Error(`Relation subfield "${nestedFieldName}" not found for "${paramName}".`);
    }
    if (!(0, _utils.isDefined)(nestedSubFieldName)) {
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedField.type)) {
            const allowed = (0, _getcompositesubfieldnamesutil.getCompositeSubfieldNames)(nestedField.type);
            throw new Error(`Composite field "${nestedFieldName}" requires a subfield. Use "${nestedFieldName}.<subfield>" where subfield is one of: ${allowed.join(', ')}`);
        }
        return;
    }
    if (!(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedField.type)) {
        throw new Error(`Field "${nestedFieldName}" is not composite.`);
    }
    (0, _validatecompositesubfieldutil.validateCompositeSubfield)({
        field: nestedField,
        subFieldName: nestedSubFieldName,
        paramName: nestedFieldName
    });
};

//# sourceMappingURL=validate-relation-subfield.util.js.map