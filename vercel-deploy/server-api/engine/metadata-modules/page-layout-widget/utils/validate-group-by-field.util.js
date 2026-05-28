"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateGroupByFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateGroupByFieldOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _pagelayoutwidgetfieldvalidationexception = require("../exceptions/page-layout-widget-field-validation.exception");
const _findactiveflatfieldmetadatabyidutil = require("./find-active-flat-field-metadata-by-id.util");
const _validatecompositesubfieldutil = require("./validate-composite-subfield.util");
const _validaterelationsubfieldutil = require("./validate-relation-subfield.util");
const toGroupByFieldValidationException = (error)=>{
    if (error instanceof _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException) {
        return error;
    }
    return new _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException(error instanceof Error ? error.message : String(error));
};
const validateGroupByFieldOrThrow = ({ fieldId, subFieldName, paramName, objectMetadataId, flatFieldMetadataMaps, allFields, fieldsByObjectId })=>{
    if (!(0, _utils.isDefined)(fieldId)) {
        throw new _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException(`${paramName} is required.`);
    }
    const field = (0, _findactiveflatfieldmetadatabyidutil.findActiveFlatFieldMetadataById)(fieldId, flatFieldMetadataMaps);
    if (!(0, _utils.isDefined)(field)) {
        throw new _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException(`${paramName} "${fieldId}" not found.`);
    }
    if (field.objectMetadataId !== objectMetadataId) {
        throw new _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException(`${paramName} must belong to objectMetadataId "${objectMetadataId}".`);
    }
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)) {
        try {
            (0, _validatecompositesubfieldutil.validateCompositeSubfield)({
                field,
                subFieldName,
                paramName: field.name
            });
        } catch (error) {
            throw toGroupByFieldValidationException(error);
        }
        return;
    }
    if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(field)) {
        try {
            (0, _validaterelationsubfieldutil.validateRelationSubfield)({
                field,
                subFieldName,
                paramName: field.name,
                allFields,
                fieldsByObjectId
            });
        } catch (error) {
            throw toGroupByFieldValidationException(error);
        }
        return;
    }
    if ((0, _utils.isDefined)(subFieldName)) {
        throw new _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException(`Field "${field.name}" does not support subfields.`);
    }
};

//# sourceMappingURL=validate-group-by-field.util.js.map