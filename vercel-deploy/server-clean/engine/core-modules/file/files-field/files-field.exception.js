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
    get FilesFieldException () {
        return FilesFieldException;
    },
    get FilesFieldExceptionCode () {
        return FilesFieldExceptionCode;
    }
});
const _customexception = require("../../../../utils/custom-exception");
var FilesFieldExceptionCode = /*#__PURE__*/ function(FilesFieldExceptionCode) {
    FilesFieldExceptionCode["FILE_DELETION_FAILED"] = "FILE_DELETION_FAILED";
    FilesFieldExceptionCode["BAD_REQUEST"] = "BAD_REQUEST";
    FilesFieldExceptionCode["TEMPORARY_FILE_NOT_ALLOWED"] = "TEMPORARY_FILE_NOT_ALLOWED";
    return FilesFieldExceptionCode;
}({});
let FilesFieldException = class FilesFieldException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage }){
        super(message, code, {
            userFriendlyMessage
        });
    }
};

//# sourceMappingURL=files-field.exception.js.map