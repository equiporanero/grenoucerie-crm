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
    get FileException () {
        return FileException;
    },
    get FileExceptionCode () {
        return FileExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
const FileExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    FILE_NOT_FOUND: 'FILE_NOT_FOUND',
    INVALID_FILE_FOLDER: 'INVALID_FILE_FOLDER',
    TEMPORARY_FILE_NOT_ALLOWED: 'TEMPORARY_FILE_NOT_ALLOWED'
});
const getFileExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case FileExceptionCode.UNAUTHENTICATED:
            return /*i18n*/ {
                id: "cgNV3G",
                message: "Authentication is required."
            };
        case FileExceptionCode.FILE_NOT_FOUND:
            return /*i18n*/ {
                id: "weWV3g",
                message: "File not found."
            };
        case FileExceptionCode.INVALID_FILE_FOLDER:
            return /*i18n*/ {
                id: "dqt3x1",
                message: "Invalid file folder."
            };
        case FileExceptionCode.TEMPORARY_FILE_NOT_ALLOWED:
            return /*i18n*/ {
                id: "2kFzQB",
                message: "Temporary file cannot be downloaded."
            };
        case FileExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FileException = class FileException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFileExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=file.exception.js.map