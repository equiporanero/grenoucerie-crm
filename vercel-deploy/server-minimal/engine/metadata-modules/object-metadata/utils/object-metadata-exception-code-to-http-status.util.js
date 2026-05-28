"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "objectMetadataExceptionCodeToHttpStatus", {
    enumerable: true,
    get: function() {
        return objectMetadataExceptionCodeToHttpStatus;
    }
});
const _utils = require("twenty-shared/utils");
const _objectmetadataexception = require("../object-metadata.exception");
const objectMetadataExceptionCodeToHttpStatus = (code)=>{
    switch(code){
        case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND:
            return 404;
        case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_ALREADY_EXISTS:
            return 409;
        case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_MUTATION_NOT_ALLOWED:
        case _objectmetadataexception.ObjectMetadataExceptionCode.NAME_CONFLICT:
            return 403;
        case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT:
        case _objectmetadataexception.ObjectMetadataExceptionCode.MISSING_SYSTEM_FIELD:
        case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_SYSTEM_FIELD:
        case _objectmetadataexception.ObjectMetadataExceptionCode.MISSING_CUSTOM_OBJECT_DEFAULT_LABEL_IDENTIFIER_FIELD:
        case _objectmetadataexception.ObjectMetadataExceptionCode.APPLICATION_NOT_FOUND:
            return 400;
        case _objectmetadataexception.ObjectMetadataExceptionCode.INTERNAL_SERVER_ERROR:
        case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_ORM_OUTPUT:
            return 500;
        default:
            return (0, _utils.assertUnreachable)(code);
    }
};

//# sourceMappingURL=object-metadata-exception-code-to-http-status.util.js.map