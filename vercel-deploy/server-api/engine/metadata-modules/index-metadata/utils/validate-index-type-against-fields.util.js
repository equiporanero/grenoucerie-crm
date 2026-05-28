"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIndexTypeAgainstFieldsOrThrow", {
    enumerable: true,
    get: function() {
        return validateIndexTypeAgainstFieldsOrThrow;
    }
});
const _constants = require("twenty-shared/constants");
const _indexfieldmetadataexception = require("../index-field-metadata.exception");
const _indexTypetypes = require("../types/indexType.types");
const validateIndexTypeAgainstFieldsOrThrow = ({ indexType, fields })=>{
    if (indexType !== _indexTypetypes.IndexType.GIN) {
        return;
    }
    for (const field of fields){
        if (field.subFieldName !== null) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`GIN index does not support composite sub-property ${field.name}.${field.subFieldName}`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_TYPE_NOT_SUPPORTED_FOR_FIELD_TYPE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "xaBJxq",
                    message: 'GIN indexes work on multi-select, array, JSON, and search-vector columns. "{0}" sub-properties don\'t qualify.',
                    values: {
                        0: field.label
                    }
                }
            });
        }
        if (!_constants.GIN_COMPATIBLE_FIELD_TYPES.has(field.type)) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`GIN index does not support field ${field.name} of type ${field.type}`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_TYPE_NOT_SUPPORTED_FOR_FIELD_TYPE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "V8DWC+",
                    message: 'GIN indexes work on multi-select, array, JSON, and search-vector columns. "{0}" doesn\'t qualify.',
                    values: {
                        0: field.label
                    }
                }
            });
        }
    }
};

//# sourceMappingURL=validate-index-type-against-fields.util.js.map