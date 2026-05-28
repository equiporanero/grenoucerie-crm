"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePositionFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return validatePositionFlatFieldMetadata;
    }
});
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const validatePositionFlatFieldMetadata = ({ flatEntityToValidate })=>{
    const errors = [];
    if (flatEntityToValidate.name !== 'position') {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `Field type POSITION must be named "position", got "${flatEntityToValidate.name}"`,
            value: flatEntityToValidate.name,
            userFriendlyMessage: /*i18n*/ {
                id: "VDesPB",
                message: 'Field type POSITION must be named "position"'
            }
        });
    }
    if (!flatEntityToValidate.isSystem) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Field type POSITION must be a system field',
            value: flatEntityToValidate.isSystem,
            userFriendlyMessage: /*i18n*/ {
                id: "p6JTHU",
                message: "Field type POSITION must be a system field"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-position-flat-field-metadata.util.js.map