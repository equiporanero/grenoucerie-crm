"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFlatFieldMetadataSupportedInGroupBy", {
    enumerable: true,
    get: function() {
        return isFlatFieldMetadataSupportedInGroupBy;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _shouldexcludefieldfromagenttoolschemautil = require("./should-exclude-field-from-agent-tool-schema.util");
const NON_GROUPABLE_FIELD_TYPES = new Set([
    _types.FieldMetadataType.TS_VECTOR,
    _types.FieldMetadataType.RAW_JSON,
    _types.FieldMetadataType.FILES,
    _types.FieldMetadataType.POSITION
]);
const ALWAYS_GROUPABLE_SYSTEM_DATE_FIELD_NAMES = new Set([
    'createdAt',
    'updatedAt'
]);
const isFlatFieldMetadataSupportedInGroupBy = (fieldMetadata)=>{
    const isAlwaysGroupableSystemDateField = ALWAYS_GROUPABLE_SYSTEM_DATE_FIELD_NAMES.has(fieldMetadata.name) && (0, _utils.isFieldMetadataDateKind)(fieldMetadata.type);
    if (!isAlwaysGroupableSystemDateField && (0, _shouldexcludefieldfromagenttoolschemautil.shouldExcludeFieldFromAgentToolSchema)(fieldMetadata)) {
        return false;
    }
    return !NON_GROUPABLE_FIELD_TYPES.has(fieldMetadata.type);
};

//# sourceMappingURL=is-supported-in-group-by.util.js.map