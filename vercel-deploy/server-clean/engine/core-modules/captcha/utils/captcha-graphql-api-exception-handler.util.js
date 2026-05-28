"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "captchaGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return captchaGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _captchaexception = require("../captcha.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const captchaGraphqlApiExceptionHandler = (exception)=>{
    switch(exception.code){
        case _captchaexception.CaptchaExceptionCode.INVALID_CAPTCHA:
            throw new _graphqlerrorsutil.UserInputError(exception);
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=captcha-graphql-api-exception-handler.util.js.map