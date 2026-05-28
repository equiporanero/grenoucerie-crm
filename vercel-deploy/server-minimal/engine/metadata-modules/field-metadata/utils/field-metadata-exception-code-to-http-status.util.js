"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fieldMetadataExceptionCodeToHttpStatus", {
    enumerable: true,
    get: function() {
        return fieldMetadataExceptionCodeToHttpStatus;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../field-metadata.exception");
const fieldMetadataExceptionCodeToHttpStatus = (code)=>{
    switch(code){
        case _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND:
            return 404;
        case _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_ALREADY_EXISTS:
            return 409;
        case _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED:
            return 403;
        case _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT:
        case _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND:
        case _fieldmetadataexception.FieldMetadataExceptionCode.APPLICATION_NOT_FOUND:
        case _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_NOT_ENABLED:
        case _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED:
        case _fieldmetadataexception.FieldMetadataExceptionCode.UNCOVERED_FIELD_METADATA_TYPE_VALIDATION:
        case _fieldmetadataexception.FieldMetadataExceptionCode.LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND:
        case _fieldmetadataexception.FieldMetadataExceptionCode.RESERVED_KEYWORD:
        case _fieldmetadataexception.FieldMetadataExceptionCode.NOT_AVAILABLE:
        case _fieldmetadataexception.FieldMetadataExceptionCode.NAME_NOT_SYNCED_WITH_LABEL:
            return 400;
        case _fieldmetadataexception.FieldMetadataExceptionCode.INTERNAL_SERVER_ERROR:
            return 500;
        default:
            return (0, _utils.assertUnreachable)(code);
    }
};

//# sourceMappingURL=field-metadata-exception-code-to-http-status.util.js.map