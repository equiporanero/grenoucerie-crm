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
    get ThrottlerException () {
        return ThrottlerException;
    },
    get ThrottlerExceptionCode () {
        return ThrottlerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var ThrottlerExceptionCode = /*#__PURE__*/ function(ThrottlerExceptionCode) {
    ThrottlerExceptionCode["LIMIT_REACHED"] = "LIMIT_REACHED";
    return ThrottlerExceptionCode;
}({});
const getThrottlerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "LIMIT_REACHED":
            return /*i18n*/ {
                id: "xD2MTL",
                message: "Rate limit reached. Please try again later."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ThrottlerException = class ThrottlerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getThrottlerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=throttler.exception.js.map