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
    get AdminPanelException () {
        return AdminPanelException;
    },
    get AdminPanelExceptionCode () {
        return AdminPanelExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
const AdminPanelExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    INVALID_MAINTENANCE_MODE_TIME_RANGE: 'INVALID_MAINTENANCE_MODE_TIME_RANGE'
});
const getAdminPanelExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case AdminPanelExceptionCode.INVALID_MAINTENANCE_MODE_TIME_RANGE:
            return /*i18n*/ {
                id: "PdKZim",
                message: "Please choose an end date and time after the start date and time."
            };
        case AdminPanelExceptionCode.INTERNAL_SERVER_ERROR:
            return /*i18n*/ {
                id: "fWsBTs",
                message: "Something went wrong. Please try again."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let AdminPanelException = class AdminPanelException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getAdminPanelExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=admin-panel.exception.js.map