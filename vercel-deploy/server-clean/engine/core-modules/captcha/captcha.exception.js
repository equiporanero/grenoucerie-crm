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
    get CaptchaException () {
        return CaptchaException;
    },
    get CaptchaExceptionCode () {
        return CaptchaExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var CaptchaExceptionCode = /*#__PURE__*/ function(CaptchaExceptionCode) {
    CaptchaExceptionCode["INVALID_CAPTCHA"] = "INVALID_CAPTCHA";
    return CaptchaExceptionCode;
}({});
const getCaptchaExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_CAPTCHA":
            return /*i18n*/ {
                id: "guEsvP",
                message: "Invalid captcha. Please try again."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CaptchaException = class CaptchaException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCaptchaExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=captcha.exception.js.map