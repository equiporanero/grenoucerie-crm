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
    get ObjectMetadataException () {
        return ObjectMetadataException;
    },
    get ObjectMetadataExceptionCode () {
        return ObjectMetadataExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
var ObjectMetadataExceptionCode = /*#__PURE__*/ function(ObjectMetadataExceptionCode) {
    ObjectMetadataExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND";
    ObjectMetadataExceptionCode["INVALID_OBJECT_INPUT"] = "INVALID_OBJECT_INPUT";
    ObjectMetadataExceptionCode["OBJECT_MUTATION_NOT_ALLOWED"] = "OBJECT_MUTATION_NOT_ALLOWED";
    ObjectMetadataExceptionCode["OBJECT_ALREADY_EXISTS"] = "OBJECT_ALREADY_EXISTS";
    ObjectMetadataExceptionCode["APPLICATION_NOT_FOUND"] = "APPLICATION_NOT_FOUND";
    ObjectMetadataExceptionCode["MISSING_CUSTOM_OBJECT_DEFAULT_LABEL_IDENTIFIER_FIELD"] = "MISSING_CUSTOM_OBJECT_DEFAULT_LABEL_IDENTIFIER_FIELD";
    ObjectMetadataExceptionCode["INVALID_ORM_OUTPUT"] = "INVALID_ORM_OUTPUT";
    ObjectMetadataExceptionCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ObjectMetadataExceptionCode["NAME_CONFLICT"] = "NAME_CONFLICT";
    ObjectMetadataExceptionCode["MISSING_SYSTEM_FIELD"] = "MISSING_SYSTEM_FIELD";
    ObjectMetadataExceptionCode["INVALID_SYSTEM_FIELD"] = "INVALID_SYSTEM_FIELD";
    return ObjectMetadataExceptionCode;
}({});
const getObjectMetadataExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "OBJECT_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "AKqp4k",
                message: "Object not found."
            };
        case "INVALID_OBJECT_INPUT":
            return /*i18n*/ {
                id: "5ZHOkh",
                message: "Invalid object input."
            };
        case "OBJECT_MUTATION_NOT_ALLOWED":
            return /*i18n*/ {
                id: "R8zIJd",
                message: "This object cannot be modified."
            };
        case "OBJECT_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "CQ5DXU",
                message: "An object with this name already exists."
            };
        case "APPLICATION_NOT_FOUND":
            return /*i18n*/ {
                id: "ltvmAF",
                message: "Application not found."
            };
        case "MISSING_CUSTOM_OBJECT_DEFAULT_LABEL_IDENTIFIER_FIELD":
            return /*i18n*/ {
                id: "qHZppf",
                message: "Custom object is missing a label identifier field."
            };
        case "INVALID_ORM_OUTPUT":
            return /*i18n*/ {
                id: "egz9rA",
                message: "Invalid data format."
            };
        case "INTERNAL_SERVER_ERROR":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        case "NAME_CONFLICT":
            return /*i18n*/ {
                id: "Nh/ZZe",
                message: "A name conflict occurred."
            };
        case "MISSING_SYSTEM_FIELD":
            return /*i18n*/ {
                id: "WYnYE1",
                message: "A system field is missing."
            };
        case "INVALID_SYSTEM_FIELD":
            return /*i18n*/ {
                id: "73tqJw",
                message: "A system field has invalid properties."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ObjectMetadataException = class ObjectMetadataException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getObjectMetadataExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=object-metadata.exception.js.map