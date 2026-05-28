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
    get FileStorageException () {
        return FileStorageException;
    },
    get FileStorageExceptionCode () {
        return FileStorageExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var FileStorageExceptionCode = /*#__PURE__*/ function(FileStorageExceptionCode) {
    FileStorageExceptionCode["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
    FileStorageExceptionCode["ACCESS_DENIED"] = "ACCESS_DENIED";
    FileStorageExceptionCode["INVALID_EXTENSION"] = "INVALID_EXTENSION";
    return FileStorageExceptionCode;
}({});
const getFileStorageExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_EXTENSION":
            return /*i18n*/ {
                id: "VddeYt",
                message: "Wrong extension for file."
            };
        case "FILE_NOT_FOUND":
            return /*i18n*/ {
                id: "weWV3g",
                message: "File not found."
            };
        case "ACCESS_DENIED":
            return /*i18n*/ {
                id: "qjrxU8",
                message: "Access denied."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FileStorageException = class FileStorageException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFileStorageExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=file-storage-exception.js.map