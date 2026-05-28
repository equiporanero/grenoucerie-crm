"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CaptchaDriverType", {
    enumerable: true,
    get: function() {
        return CaptchaDriverType;
    }
});
const _graphql = require("@nestjs/graphql");
var CaptchaDriverType = /*#__PURE__*/ function(CaptchaDriverType) {
    CaptchaDriverType["GOOGLE_RECAPTCHA"] = "GOOGLE_RECAPTCHA";
    CaptchaDriverType["TURNSTILE"] = "TURNSTILE";
    return CaptchaDriverType;
}({});
(0, _graphql.registerEnumType)(CaptchaDriverType, {
    name: 'CaptchaDriverType'
});

//# sourceMappingURL=captcha.interface.js.map