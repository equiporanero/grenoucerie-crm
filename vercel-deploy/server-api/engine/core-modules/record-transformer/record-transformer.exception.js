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
    get RecordTransformerException () {
        return RecordTransformerException;
    },
    get RecordTransformerExceptionCode () {
        return RecordTransformerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var RecordTransformerExceptionCode = /*#__PURE__*/ function(RecordTransformerExceptionCode) {
    RecordTransformerExceptionCode["INVALID_URL"] = "INVALID_URL";
    RecordTransformerExceptionCode["INVALID_PHONE_NUMBER"] = "INVALID_PHONE_NUMBER";
    RecordTransformerExceptionCode["INVALID_PHONE_COUNTRY_CODE"] = "INVALID_PHONE_COUNTRY_CODE";
    RecordTransformerExceptionCode["INVALID_PHONE_CALLING_CODE"] = "INVALID_PHONE_CALLING_CODE";
    RecordTransformerExceptionCode["CONFLICTING_PHONE_COUNTRY_CODE"] = "CONFLICTING_PHONE_COUNTRY_CODE";
    RecordTransformerExceptionCode["CONFLICTING_PHONE_CALLING_CODE"] = "CONFLICTING_PHONE_CALLING_CODE";
    RecordTransformerExceptionCode["CONFLICTING_PHONE_CALLING_CODE_AND_COUNTRY_CODE"] = "CONFLICTING_PHONE_CALLING_CODE_AND_COUNTRY_CODE";
    return RecordTransformerExceptionCode;
}({});
const getRecordTransformerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_URL":
            return /*i18n*/ {
                id: "SzaGv7",
                message: "Invalid URL format."
            };
        case "INVALID_PHONE_NUMBER":
            return /*i18n*/ {
                id: "ZmVj5N",
                message: "Invalid phone number."
            };
        case "INVALID_PHONE_COUNTRY_CODE":
            return /*i18n*/ {
                id: "P/5moy",
                message: "Invalid phone country code."
            };
        case "INVALID_PHONE_CALLING_CODE":
            return /*i18n*/ {
                id: "0D0YwP",
                message: "Invalid phone calling code."
            };
        case "CONFLICTING_PHONE_COUNTRY_CODE":
            return /*i18n*/ {
                id: "CmQEdn",
                message: "Conflicting phone country code."
            };
        case "CONFLICTING_PHONE_CALLING_CODE":
            return /*i18n*/ {
                id: "gP+fzj",
                message: "Conflicting phone calling code."
            };
        case "CONFLICTING_PHONE_CALLING_CODE_AND_COUNTRY_CODE":
            return /*i18n*/ {
                id: "WtMHh6",
                message: "Conflicting phone calling code and country code."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RecordTransformerException = class RecordTransformerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRecordTransformerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=record-transformer.exception.js.map