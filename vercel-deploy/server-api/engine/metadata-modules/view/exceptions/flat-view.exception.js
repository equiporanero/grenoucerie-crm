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
    get FlatViewException () {
        return FlatViewException;
    },
    get FlatViewExceptionCode () {
        return FlatViewExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
const FlatViewExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    VIEW_NOT_FOUND: 'VIEW_NOT_FOUND',
    VIEW_ALREADY_EXISTS: 'VIEW_ALREADY_EXISTS'
});
const getFlatViewExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case FlatViewExceptionCode.VIEW_NOT_FOUND:
            return /*i18n*/ {
                id: "yheEin",
                message: "View not found."
            };
        case FlatViewExceptionCode.VIEW_ALREADY_EXISTS:
            return /*i18n*/ {
                id: "kB0dDD",
                message: "View already exists."
            };
        case FlatViewExceptionCode.INTERNAL_SERVER_ERROR:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FlatViewException = class FlatViewException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFlatViewExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=flat-view.exception.js.map