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
    get InvalidMetadataException () {
        return InvalidMetadataException;
    },
    get InvalidMetadataExceptionCode () {
        return InvalidMetadataExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var InvalidMetadataExceptionCode = /*#__PURE__*/ function(InvalidMetadataExceptionCode) {
    InvalidMetadataExceptionCode["LABEL_REQUIRED"] = "Label required";
    InvalidMetadataExceptionCode["INPUT_TOO_SHORT"] = "Input too short";
    InvalidMetadataExceptionCode["EXCEEDS_MAX_LENGTH"] = "Exceeds max length";
    InvalidMetadataExceptionCode["RESERVED_KEYWORD"] = "Reserved keyword";
    InvalidMetadataExceptionCode["NOT_CAMEL_CASE"] = "Not camel case";
    InvalidMetadataExceptionCode["INVALID_LABEL"] = "Invalid label";
    InvalidMetadataExceptionCode["NAME_NOT_SYNCED_WITH_LABEL"] = "Name not synced with label";
    InvalidMetadataExceptionCode["INVALID_STRING"] = "Invalid string";
    InvalidMetadataExceptionCode["NOT_AVAILABLE"] = "Name not available";
    return InvalidMetadataExceptionCode;
}({});
const getInvalidMetadataExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "Label required":
            return /*i18n*/ {
                id: "6bWuI/",
                message: "Label is required."
            };
        case "Input too short":
            return /*i18n*/ {
                id: "nrH4HK",
                message: "Input is too short."
            };
        case "Exceeds max length":
            return /*i18n*/ {
                id: "9Lkkre",
                message: "Input exceeds maximum length."
            };
        case "Reserved keyword":
            return /*i18n*/ {
                id: "/XKGep",
                message: "This name is a reserved keyword."
            };
        case "Not camel case":
            return /*i18n*/ {
                id: "HKHHTk",
                message: "Name must be in camelCase format."
            };
        case "Invalid label":
            return /*i18n*/ {
                id: "tm//h9",
                message: "Invalid label format."
            };
        case "Name not synced with label":
            return /*i18n*/ {
                id: "Aam+mb",
                message: "Name is not synced with label."
            };
        case "Invalid string":
            return /*i18n*/ {
                id: "U3r7gv",
                message: "Invalid string format."
            };
        case "Name not available":
            return /*i18n*/ {
                id: "yIUmAs",
                message: "This name is not available."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let InvalidMetadataException = class InvalidMetadataException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getInvalidMetadataExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=invalid-metadata.exception.js.map