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
    get CustomException () {
        return CustomException;
    },
    get UnknownException () {
        return UnknownException;
    },
    get appendCommonExceptionCode () {
        return appendCommonExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const CommonExceptionCode = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
};
const appendCommonExceptionCode = (specificExceptionCode)=>{
    return {
        ...CommonExceptionCode,
        ...specificExceptionCode
    };
};
let CustomException = class CustomException extends _utils.CustomError {
    constructor(message, code, { userFriendlyMessage }){
        super(message);
        this.code = code;
        this.userFriendlyMessage = userFriendlyMessage;
    }
};
let UnknownException = class UnknownException extends CustomException {
};

//# sourceMappingURL=custom-exception.js.map