"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateTsVectorFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return validateTsVectorFlatFieldMetadata;
    }
});
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const validateTsVectorFlatFieldMetadata = ({ flatEntityToValidate })=>{
    const errors = [];
    if (flatEntityToValidate.name !== 'searchVector') {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `Field type TS_VECTOR must be named "searchVector", got "${flatEntityToValidate.name}"`,
            value: flatEntityToValidate.name,
            userFriendlyMessage: /*i18n*/ {
                id: "hoCDqQ",
                message: 'Field type TS_VECTOR must be named "searchVector"'
            }
        });
    }
    if (!flatEntityToValidate.isSystem) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Field type TS_VECTOR must be a system field',
            value: flatEntityToValidate.isSystem,
            userFriendlyMessage: /*i18n*/ {
                id: "7cWO6W",
                message: "Field type TS_VECTOR must be a system field"
            }
        });
    }
    if (!flatEntityToValidate.universalSettings?.asExpression) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Field type TS_VECTOR must have an expression. This may have failed to be built because record identifier field does not exist or is not of a searchable type.',
            userFriendlyMessage: /*i18n*/ {
                id: "NuL8km",
                message: "Field type TS_VECTOR must have an expression. This may have failed to be built because record identifier field does not exist or is not of a searchable type."
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-ts-vector-flat-field-metadata.util.js.map