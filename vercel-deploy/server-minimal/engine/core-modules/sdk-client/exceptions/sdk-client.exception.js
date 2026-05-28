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
    get SdkClientException () {
        return SdkClientException;
    },
    get SdkClientExceptionCode () {
        return SdkClientExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var SdkClientExceptionCode = /*#__PURE__*/ function(SdkClientExceptionCode) {
    SdkClientExceptionCode["ARCHIVE_NOT_FOUND"] = "ARCHIVE_NOT_FOUND";
    SdkClientExceptionCode["ARCHIVE_EXTRACTION_FAILED"] = "ARCHIVE_EXTRACTION_FAILED";
    SdkClientExceptionCode["FILE_NOT_FOUND_IN_ARCHIVE"] = "FILE_NOT_FOUND_IN_ARCHIVE";
    SdkClientExceptionCode["GENERATION_FAILED"] = "GENERATION_FAILED";
    return SdkClientExceptionCode;
}({});
const getSdkClientExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "ARCHIVE_NOT_FOUND":
            return /*i18n*/ {
                id: "eKi1df",
                message: "SDK client archive not found. The SDK client may not have been generated for this application."
            };
        case "ARCHIVE_EXTRACTION_FAILED":
            return /*i18n*/ {
                id: "MIto3A",
                message: "Failed to extract SDK client archive."
            };
        case "FILE_NOT_FOUND_IN_ARCHIVE":
            return /*i18n*/ {
                id: "OR7oBd",
                message: "File not found in SDK client archive."
            };
        case "GENERATION_FAILED":
            return /*i18n*/ {
                id: "CO40Hk",
                message: "Failed to generate SDK client."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let SdkClientException = class SdkClientException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getSdkClientExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=sdk-client.exception.js.map