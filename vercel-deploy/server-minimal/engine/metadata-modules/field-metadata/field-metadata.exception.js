"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FieldMetadataException () {
        return FieldMetadataException;
    },
    get FieldMetadataExceptionCode () {
        return FieldMetadataExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
const FieldMetadataExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    FIELD_METADATA_NOT_FOUND: 'FIELD_METADATA_NOT_FOUND',
    INVALID_FIELD_INPUT: 'INVALID_FIELD_INPUT',
    FIELD_MUTATION_NOT_ALLOWED: 'FIELD_MUTATION_NOT_ALLOWED',
    FIELD_ALREADY_EXISTS: 'FIELD_ALREADY_EXISTS',
    OBJECT_METADATA_NOT_FOUND: 'OBJECT_METADATA_NOT_FOUND',
    APPLICATION_NOT_FOUND: 'APPLICATION_NOT_FOUND',
    FIELD_METADATA_RELATION_NOT_ENABLED: 'FIELD_METADATA_RELATION_NOT_ENABLED',
    FIELD_METADATA_RELATION_MALFORMED: 'FIELD_METADATA_RELATION_MALFORMED',
    LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND: 'LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND',
    UNCOVERED_FIELD_METADATA_TYPE_VALIDATION: 'UNCOVERED_FIELD_METADATA_TYPE_VALIDATION',
    RESERVED_KEYWORD: 'RESERVED_KEYWORD',
    NOT_AVAILABLE: 'NOT_AVAILABLE',
    NAME_NOT_SYNCED_WITH_LABEL: 'NAME_NOT_SYNCED_WITH_LABEL'
});
const getFieldMetadataExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND:
            return /*i18n*/ {
                id: "Ts+YbB",
                message: "Field not found."
            };
        case FieldMetadataExceptionCode.INVALID_FIELD_INPUT:
            return /*i18n*/ {
                id: "MaFFIW",
                message: "Invalid field input."
            };
        case FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED:
            return /*i18n*/ {
                id: "MKqbeR",
                message: "This field cannot be modified."
            };
        case FieldMetadataExceptionCode.FIELD_ALREADY_EXISTS:
            return /*i18n*/ {
                id: "othZF2",
                message: "A field with this name already exists."
            };
        case FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND:
            return /*i18n*/ {
                id: "AKqp4k",
                message: "Object not found."
            };
        case FieldMetadataExceptionCode.APPLICATION_NOT_FOUND:
            return /*i18n*/ {
                id: "ltvmAF",
                message: "Application not found."
            };
        case FieldMetadataExceptionCode.FIELD_METADATA_RELATION_NOT_ENABLED:
            return /*i18n*/ {
                id: "83atrc",
                message: "Relation is not enabled for this field."
            };
        case FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED:
            return /*i18n*/ {
                id: "2LXGtF",
                message: "Relation configuration is invalid."
            };
        case FieldMetadataExceptionCode.LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND:
            return /*i18n*/ {
                id: "Qx822J",
                message: "Label identifier field not found."
            };
        case FieldMetadataExceptionCode.UNCOVERED_FIELD_METADATA_TYPE_VALIDATION:
            return /*i18n*/ {
                id: "5Buorv",
                message: "Field type validation error."
            };
        case FieldMetadataExceptionCode.RESERVED_KEYWORD:
            return /*i18n*/ {
                id: "/XKGep",
                message: "This name is a reserved keyword."
            };
        case FieldMetadataExceptionCode.NOT_AVAILABLE:
            return /*i18n*/ {
                id: "AKIPVa",
                message: "This field name is not available."
            };
        case FieldMetadataExceptionCode.NAME_NOT_SYNCED_WITH_LABEL:
            return /*i18n*/ {
                id: "XJmtgE",
                message: "Field name is not synced with label."
            };
        case FieldMetadataExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FieldMetadataException = class FieldMetadataException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFieldMetadataExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=field-metadata.exception.js.map