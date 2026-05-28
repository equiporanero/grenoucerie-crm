"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serializeDefaultValue", {
    enumerable: true,
    get: function() {
        return serializeDefaultValue;
    }
});
const _fieldmetadataexception = require("../field-metadata.exception");
const _isfunctiondefaultvalueutil = require("./is-function-default-value.util");
const _serializefunctiondefaultvalueutil = require("./serialize-function-default-value.util");
const serializeDefaultValue = (defaultValue)=>{
    if (defaultValue === undefined || defaultValue === null) {
        return null;
    }
    // Function default values
    if ((0, _isfunctiondefaultvalueutil.isFunctionDefaultValue)(defaultValue)) {
        const serializedTypeDefaultValue = (0, _serializefunctiondefaultvalueutil.serializeFunctionDefaultValue)(defaultValue);
        if (!serializedTypeDefaultValue) {
            throw new _fieldmetadataexception.FieldMetadataException('Invalid default value', _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
        }
        return serializedTypeDefaultValue;
    }
    // Static default values
    if (typeof defaultValue === 'string' && defaultValue.startsWith("'")) {
        return defaultValue;
    }
    if (typeof defaultValue === 'number') {
        return defaultValue;
    }
    if (typeof defaultValue === 'boolean') {
        return defaultValue;
    }
    if (defaultValue instanceof Date) {
        return `'${defaultValue.toISOString()}'`;
    }
    if (Array.isArray(defaultValue)) {
        return `'{${defaultValue.map((value)=>value.replace(/'/g, '')).join(',')}}'`;
    }
    if (typeof defaultValue === 'object') {
        return `'${JSON.stringify(defaultValue)}'`;
    }
    throw new _fieldmetadataexception.FieldMetadataException(`Invalid default value "${defaultValue}"`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
};

//# sourceMappingURL=serialize-default-value.js.map