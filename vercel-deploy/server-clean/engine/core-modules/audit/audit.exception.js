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
    get AuditException () {
        return AuditException;
    },
    get AuditExceptionCode () {
        return AuditExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var AuditExceptionCode = /*#__PURE__*/ function(AuditExceptionCode) {
    AuditExceptionCode["INVALID_TYPE"] = "INVALID_TYPE";
    AuditExceptionCode["INVALID_INPUT"] = "INVALID_INPUT";
    return AuditExceptionCode;
}({});
const getAuditExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_TYPE":
            return /*i18n*/ {
                id: "g/ne5t",
                message: "Invalid audit type."
            };
        case "INVALID_INPUT":
            return /*i18n*/ {
                id: "Z5WSzG",
                message: "Invalid audit input."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let AuditException = class AuditException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getAuditExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=audit.exception.js.map