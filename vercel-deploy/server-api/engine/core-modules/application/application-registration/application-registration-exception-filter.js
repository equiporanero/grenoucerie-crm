"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationExceptionFilter", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _applicationregistrationexception = require("./application-registration.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationRegistrationExceptionFilter = class ApplicationRegistrationExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.VARIABLE_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception);
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_SCOPE:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_REDIRECT_URI:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.SOURCE_CHANNEL_MISMATCH:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.UNIVERSAL_IDENTIFIER_ALREADY_CLAIMED:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.SERVER_VERSION_INCOMPATIBLE:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.VERSION_ALREADY_EXISTS:
            case _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_APP_ENGINE_REQUIREMENT:
                throw new _graphqlerrorsutil.UserInputError(exception);
            default:
                throw new _graphqlerrorsutil.InternalServerError(exception);
        }
    }
};
ApplicationRegistrationExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_applicationregistrationexception.ApplicationRegistrationException)
], ApplicationRegistrationExceptionFilter);

//# sourceMappingURL=application-registration-exception-filter.js.map