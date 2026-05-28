"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailVerificationExceptionFilter", {
    enumerable: true,
    get: function() {
        return EmailVerificationExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _emailverificationexception = require("./email-verification.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailVerificationExceptionFilter = class EmailVerificationExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _emailverificationexception.EmailVerificationExceptionCode.TOKEN_EXPIRED:
                throw new _graphqlerrorsutil.ForbiddenError(exception.message, {
                    subCode: exception.code,
                    userFriendlyMessage: /*i18n*/ {
                        id: "pCsIQQ",
                        message: "Request has expired, please try again."
                    }
                });
            case _emailverificationexception.EmailVerificationExceptionCode.INVALID_TOKEN:
            case _emailverificationexception.EmailVerificationExceptionCode.INVALID_APP_TOKEN_TYPE:
            case _emailverificationexception.EmailVerificationExceptionCode.RATE_LIMIT_EXCEEDED:
                throw new _graphqlerrorsutil.ForbiddenError(exception);
            case _emailverificationexception.EmailVerificationExceptionCode.EMAIL_MISSING:
                throw new _graphqlerrorsutil.UserInputError(exception);
            case _emailverificationexception.EmailVerificationExceptionCode.EMAIL_ALREADY_VERIFIED:
                throw new _graphqlerrorsutil.UserInputError(exception.message, {
                    subCode: exception.code,
                    userFriendlyMessage: /*i18n*/ {
                        id: "BBXuRb",
                        message: "Email already verified."
                    }
                });
            case _emailverificationexception.EmailVerificationExceptionCode.EMAIL_VERIFICATION_NOT_REQUIRED:
                throw new _graphqlerrorsutil.UserInputError(exception.message, {
                    subCode: exception.code,
                    userFriendlyMessage: /*i18n*/ {
                        id: "y8LSMh",
                        message: "Email verification not required."
                    }
                });
            case _emailverificationexception.EmailVerificationExceptionCode.INVALID_EMAIL:
                throw new _graphqlerrorsutil.UserInputError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
EmailVerificationExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_emailverificationexception.EmailVerificationException)
], EmailVerificationExceptionFilter);

//# sourceMappingURL=email-verification-exception-filter.util.js.map